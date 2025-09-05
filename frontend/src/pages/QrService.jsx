import { useState } from "react";

export default function QrService() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/analyze-qr", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setResult(data.result);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">QR Code Analysis</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 w-full"
        />
        <button className="bg-purple-500 text-white px-4 py-2 rounded">Analyze</button>
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
