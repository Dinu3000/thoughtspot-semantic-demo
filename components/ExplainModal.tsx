export default function ExplainModal({
  result,
  onClose,
}: {
  result: any;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h3 className="font-bold mb-2">How we understood you</h3>
        <pre className="text-xs bg-gray-100 p-2 rounded">
{JSON.stringify(result, null, 2)}
        </pre>
        <button
          className="mt-4 bg-blue-600 text-white px-3 py-1 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}