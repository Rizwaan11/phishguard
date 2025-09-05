import { useState } from "react";

export default function LinkService() {
  const [link, setLink] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/analyze-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ link }),
    });
    const data = await res.json();
    setResult(data.result);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Link Analysis</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enter URL..."
          className="border p-2 w-full"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded">Analyze</button>
      </form>
      {result && (
        <div className="mt-4 p-4 bg-gray-200 rounded">
          <h2 className="font-bold">Result:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
