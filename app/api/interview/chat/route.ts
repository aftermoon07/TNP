import { NextRequest, NextResponse } from 'next/server';
import { callGemini } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, config } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an expert technical interviewer conducting a video interview for a ${config?.role || 'Software Engineer'} position.
    The candidate is at a ${config?.difficulty || 'Intermediate'} level.
    Your goal is to assess their technical skills and cultural fit.
    Ask distinct questions, one by one. Wait for the candidate's response after each question.
    Keep your responses concise (under 2-3 sentences) and professional.
    Do not repeat the same question.
    If the candidate answers, acknowledge it briefly and move to the next question or a follow-up.
    
    Current conversation history:
    ${messages.map((m: any) => `${m.role}: ${m.content}`).join('\n')}
    
    Respond as the interviewer (assistant):`;

    const aiResponse = await callGemini(systemPrompt);

    return NextResponse.json({ 
      response: aiResponse,
      timestamp: Date.now() 
    });

  } catch (error) {
    console.error('Interview chat error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
