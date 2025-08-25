import { useState } from 'react';
import Fuse from 'fuse.js';
import manifest from '@/lib/semantic_manifest.yaml';

const fuse = new Fuse(manifest.entities.map(e => e.name), { threshold: 0.4 });

export default function QueryBar({ onAsk }: { onAsk: (q: string) => void }) {
  const [q, setQ] = useState('');
  const hints = fuse.search(q).map(r => r.item).slice(0, 3);

  return (
    <div className="flex space-x-2">
      <input
        className="border rounded px-2 py-1 flex-1"
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="e.g. EU accounts with churn this quarter"
      />
      <button
        className="bg-blue-600 text-white px-3 py-1 rounded"
        onClick={() => onAsk(q)}
      >
        Ask
      </button>
      {hints.map(h => (
        <button
          key={h}
          className="text-sm bg-gray-200 px-2 py-1 rounded"
          onClick={() => setQ(h)}
        >
          {h}
        </button>
      ))}
    </div>
  );
}