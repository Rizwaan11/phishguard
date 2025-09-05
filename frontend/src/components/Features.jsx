import { Link } from "react-router-dom";

export default function Features() {
  const features = [
    {
      title: "Text Analysis",
      desc: "Upload or paste text for AI analysis.",
      link: "/text-upload", // will send to /api/submit-text
    },
    {
      title: "URL Analysis",
      desc: "Analyze any URL for content or security risks.",
      link: "/url-upload", // will send to /api/submit-url
    },
    {
      title: "QR Code Analysis",
      desc: "Upload a QR code image to extract its data.",
      link: "/qrcode-upload", // will send to /api/submit-qrcode (protected)
    },
    {
      title: "Audio Scanning",
      desc: "Upload audio files for content extraction and analysis.",
      link: "/audio-upload", // will send to /api/submit-audio (protected)
    },
  ];

  return (
    <section className="bg-gray-100 py-10 grid md:grid-cols-2 gap-6 px-6">
      {features.map((f, idx) => (
        <div key={idx} className="bg-black text-white p-6 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-2">{f.title}</h3>
          <p className="mb-4">{f.desc}</p>
          <Link
            to={f.link}
            className="border border-gray-400 px-4 py-1 rounded hover:bg-white hover:text-black transition"
          >
            Go to Service
          </Link>
        </div>
      ))}
    </section>
  );
}
