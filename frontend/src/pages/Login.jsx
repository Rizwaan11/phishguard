import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsLoggedIn, setEmail }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // important for session
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      setIsLoggedIn(true);
      setEmail(data.email);
      navigate("/"); // redirect to home after login
    } else {
      setMessage(data.error || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 p-6 rounded shadow w-80"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-3"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-3"
          onChange={handleChange}
        />
        <button className="bg-black text-white w-full p-2">Login</button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}
