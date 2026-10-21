import { NextRequest, NextResponse } from 'next/server';
import { callGemini } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { resumeText, jobDescription } = await request.json();

    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { error: 'Resume text and job description are required' },
        { status: 400 }
      );
    }

    // Try AI analysis first
    try {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY || 'AIzaSyCq0PKLdwdR7E-2BWDmBjCV_Svfb2yZKhI';
      
      if (apiKey && apiKey !== 'your-api-key-here') {
        const prompt = `You are an ATS analyzer. Analyze this resume against the job description.

RESUME: ${resumeText.substring(0, 2000)}
JOB: ${jobDescription.substring(0, 2000)}

Return ONLY a valid JSON object in this exact format:
{
  "overall_score": 75,
  "matching_keywords": ["keyword1", "keyword2"],
  "missing_keywords": ["missing1", "missing2"],
  "suggestions": "Brief improvement suggestions"
}

No additional text, explanations, or markdown formatting. Just the JSON object.`;

        try {
          const text = await callGemini(prompt);
          let cleanText = text.trim()
            .replace(/```json\n?/, '').replace(/\n?```$/, '')
            .replace(/```\n?/, '').replace(/\n?```$/, '');

          const analysisResult = JSON.parse(cleanText);
          return NextResponse.json({
            success: true,
            atsResult: {
              ...analysisResult,
              analysis_data: { keyword_density: 70, readability_score: 85, format_score: 75, full_analysis: text }
            },
            saveToDatabase: true
          });
        } catch (parseOrAiError) {
          console.log('AI analysis failed, using fallback:', parseOrAiError);
        }
      }
    } catch (aiError) {
      console.log('AI analysis failed:', aiError);
    }

    // Fallback analysis
    console.log('Using fallback keyword analysis');
    const keywords = extractKeywords(resumeText, jobDescription);
    const score = Math.min(90, Math.max(40, (keywords.matching.length / Math.max(keywords.missing.length + keywords.matching.length, 1)) * 100));
    
    const fallbackResult = {
      overall_score: Math.round(score),
      matching_keywords: keywords.matching,
      missing_keywords: keywords.missing,
      suggestions: `Your resume matches ${keywords.matching.length} keywords from the job description. Consider adding these missing keywords: ${keywords.missing.slice(0, 5).join(', ')}. Focus on including relevant skills, technologies, and qualifications mentioned in the job posting.`,
      analysis_data: {
        keyword_density: Math.round((keywords.matching.length / (keywords.matching.length + keywords.missing.length)) * 100),
        readability_score: 80,
        format_score: 75,
        full_analysis: `Keyword Analysis:\n\nMatching Keywords (${keywords.matching.length}): ${keywords.matching.join(', ')}\n\nMissing Keywords (${keywords.missing.length}): ${keywords.missing.join(', ')}\n\nRecommendation: Include more relevant keywords from the job description to improve ATS compatibility.`
      }
    };

    return NextResponse.json({
      success: true,
      atsResult: fallbackResult,
      saveToDatabase: true // Flag to indicate this should be saved
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to extract keywords
function extractKeywords(resumeText: string, jobDescription: string) {
  const commonWords = new Set(['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'up', 'about', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between', 'among', 'within', 'without', 'under', 'over', 'this', 'that', 'these', 'those', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'have', 'has', 'had', 'been', 'being', 'are', 'was', 'were', 'is', 'am']);
  
  const resumeWords = resumeText.toLowerCase()
    .split(/\W+/)
    .filter(word => word.length > 2 && !commonWords.has(word));
  
  const jobWords = jobDescription.toLowerCase()
    .split(/\W+/)
    .filter(word => word.length > 2 && !commonWords.has(word));
  
  const jobKeywords = [...new Set(jobWords)];
  const matching = jobKeywords.filter(keyword => resumeWords.includes(keyword));
  const missing = jobKeywords.filter(keyword => !resumeWords.includes(keyword)).slice(0, 15);
  
  return { 
    matching: matching.slice(0, 20), 
    missing: missing 
  };
}