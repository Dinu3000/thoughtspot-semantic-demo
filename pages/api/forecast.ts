import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // quick stub: linear forecast for 3 periods
  const { metric, periods = 3 } = req.query;
  const historical = [100000, 110000, 105000, 120000];
  const slope = 5000;
  const forecast = Array.from({ length: Number(periods) }, (_, i) =>
    historical.at(-1)! + slope * (i + 1)
  );
  res.json({ metric, forecast });
}