import OpenAI from 'openai';

// Groq's latest free models
const MODEL_FALLBACK_CHAIN = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant'];

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Calls OpenAI with automatic retry + model fallback.
 * Retries up to 3 times with exponential backoff on rate limit errors.
 */
export async function callGemini(prompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is missing from .env.local');
  }

  // Initialize OpenAI SDK to point to Groq's API
  const openai = new OpenAI({ 
    apiKey,
    baseURL: 'https://api.groq.com/openai/v1' 
  });
  let lastError: Error | null = null;

  for (const model of MODEL_FALLBACK_CHAIN) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`[OpenAI] Trying model: ${model}, attempt ${attempt}`);

        const completion = await openai.chat.completions.create({
          model,
          messages: [{ role: 'user', content: prompt }],
        });

        const text = completion.choices[0]?.message?.content || '';
        if (!text) throw new Error('Empty response from OpenAI');

        console.log(`[OpenAI] Success with model: ${model}`);
        return text;

      } catch (error) {
        const errMsg = error instanceof Error ? error.message : String(error);
        lastError = error instanceof Error ? error : new Error(errMsg);

        const isRateLimit = errMsg.includes('429') || errMsg.includes('rate limit') || errMsg.includes('Rate limit');

        console.warn(`[OpenAI] model=${model} attempt=${attempt} error: ${errMsg.substring(0, 120)}`);

        if (isRateLimit) {
          const waitMs = attempt * 2000;
          console.log(`[OpenAI] Waiting ${waitMs}ms before retry...`);
          await sleep(waitMs);
          continue;
        }

        // Non-retriable error → try next model
        break;
      }
    }
  }

  throw new Error(`All OpenAI models failed. Last error: ${lastError?.message}`);
}
