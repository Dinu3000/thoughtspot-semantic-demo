import { useState } from 'react';
import QueryBar from '@/components/QueryBar';
import KpiPanel from '@/components/KpiPanel';
import ExplainModal from '@/components/ExplainModal';
import DbtDag from '@/components/DbtDag';

export default function Home() {
  const [result, setResult] = useState<any>({});
  const [open, setOpen] = useState(false);

  const ask = async (q: string) => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: q }),
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">ThoughtSpot Semantic Demo</h1>
      <QueryBar onAsk={ask} />
      <KpiPanel stats={{ parseSuccess: 1, confidence: result.confidence || 0 }} />
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(result, null, 2)}</pre>
      <button onClick={() => setOpen(true)} className="text-blue-600 underline">
        Explain
      </button>
      <DbtDag />
      {open && <ExplainModal result={result} onClose={() => setOpen(false)} />}
    </div>
  );
}