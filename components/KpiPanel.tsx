export default function KpiPanel({ stats }: { stats: { parseSuccess: number; confidence: number } }) {
  return (
    <aside className="border rounded p-4 space-y-2 text-sm">
      <h3 className="font-semibold">Live KPIs</h3>
      <ul>
        <li>Parse success: {(stats.parseSuccess * 100).toFixed(0)} %</li>
        <li>Entity confidence: {(stats.confidence * 100).toFixed(0)} %</li>
      </ul>
    </aside>
  );
}