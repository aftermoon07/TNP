// Re-export callGemini as callOpenAI for backward compatibility
// with any components that still import from this file
export { callGemini as callOpenAI } from '@/lib/gemini';
