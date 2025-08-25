import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { SYSTEM_PROMPT } from '@/lib/prompts';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: 'No question' });

  const gpt = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: question },
    ],
    max_tokens: 300,
  });

  try {
    const parsed = JSON.parse(gpt.choices[0]?.message?.content || '{}');
    res.json({ ...parsed, raw: gpt.choices[0]?.message?.content });
  } catch {
    res.status(500).json({ error: 'Parse failed' });
  }
}