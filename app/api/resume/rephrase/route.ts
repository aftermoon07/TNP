import { NextRequest, NextResponse } from 'next/server';
import { callGemini } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { text, section } = await req.json();

    if (!text || !section) {
      return NextResponse.json({ error: 'Text and section are required' }, { status: 400 });
    }

    const prompt = `You are a professional resume writer. Rephrase the following ${section} section text to make it more professional, impactful, and ATS-friendly. Provide 3 different variations. Keep the same meaning but improve clarity, use action verbs, and quantify achievements where possible.

Original text: "${text}"

Provide 3 rephrased versions, each on a new line, numbered 1-3.`;

    const generatedText = await callGemini(prompt);

    return NextResponse.json({ text: generatedText });
  } catch (error) {
    console.error('Rephrase error:', error);
    const message = error instanceof Error ? error.message : 'Failed to rephrase';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
