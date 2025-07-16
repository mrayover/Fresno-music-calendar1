import { useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

const avatarOptions = [
  ...Array.from({ length: 10 }, (_, i) => `/avatars/Bottts-${i + 1}.png`),
  ...Array.from({ length: 10 }, (_, i) => `/avatars/funemoji-${i + 1}.png`),
  ...Array.from({ length: 10 }, (_, i) => `/avatars/notionists-${i + 1}.png`),
  ...Array.from({ length: 10 }, (_, i) => `/avatars/open-peeps-${i + 1}.png`),
];

const badWords = ["fuck", "shit", "bitch", "cunt", "asshole", "dick", "bastard"]; // basic filter

export default function RequestAccount() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    message: "",
    avatar_url: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isProfane = (text) =>
    badWords.some((word) => text.toLowerCase().includes(word));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const { name, email, username, message, avatar_url } = formData;

    if (!name || !email || !username || !avatar_url) {
      setError("All fields except 'message' are required.");
      return;
    }

    if (isProfane(username)) {
      setError("Please choose a different username.");
      return;
    }

    setSubmitting(true);

    const { data: existing, error: usernameCheckError } = await supabase
      .from("account_requests")
      .select("id")
      .eq("username", username);

    if (usernameCheckError) {
      setError("Unable to check username. Try again later.");
      setSubmitting(false);
      return;
    }

    if (existing.length > 0) {
      setError("Username is already in use. Please choose another.");
      setSubmitting(false);
      return;
    }

    const { error: submitError } = await supabase.from("account_requests").insert([
      {
        name,
        email,
        username,
        message,
        avatar_url,
        status: "pending"
      }
    ]);

    if (submitError) {
      setError("Submission failed. Try again later.");
    } else {
      alert("Account request submitted. You’ll be contacted once reviewed.");
      navigate("/");
    }

    setSubmitting(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-black/40 rounded-xl text-white mt-8">
      <h2 className="text-2xl font-bold text-tower-yellow mb-4">Request an Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-2 rounded text-black"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 rounded text-black"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Preferred Username"
          className="w-full p-2 rounded text-black"
          value={formData.username}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Tell us why you're requesting an account (optional)"
          rows={3}
          className="w-full p-2 rounded text-black"
          value={formData.message}
          onChange={handleChange}
        />

        <div>
          <p className="mb-1 font-semibold">Choose an avatar:</p>
          <div className="grid grid-cols-5 gap-2">
            {avatarOptions.map((url) => (
              <img
                key={url}
                src={url}
                alt="avatar"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, avatar_url: url }))
                }
                className={`w-16 h-16 rounded-full cursor-pointer border-4 transition-all duration-150 ${
                  formData.avatar_url === url
                    ? "border-tower-yellow scale-105"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              />
            ))}
          </div>
        </div>

        {error && <p className="text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-tower-yellow text-black font-bold p-2 rounded hover:bg-yellow-300"
        >
          {submitting ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}
