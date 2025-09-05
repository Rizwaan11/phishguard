import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Signup successful! You can now sign in.");
      res.json;
    } else {
      setMessage(data.error || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 p-6 rounded shadow w-80"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-3"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-3"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="bg-black text-white w-full p-2">Sign Up</button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
