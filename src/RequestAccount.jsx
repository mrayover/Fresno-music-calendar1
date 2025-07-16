import { useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

const badWords = ["fuck", "shit", "bitch", "cunt", "asshole", "dick", "bastard"]; // light filter

export default function RequestAccount() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    message: "",
    avatar: null
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setFormData({ ...formData, avatar: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const isProfane = (text) =>
    badWords.some((word) => text.toLowerCase().includes(word));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const { name, email, username, message, avatar } = formData;

    if (!name || !email || !username) {
      setError("All fields except 'message' and 'avatar' are required.");
      return;
    }

    if (isProfane(username)) {
      setError("Please choose a different username.");
      return;
    }

    setSubmitting(true);

    // 1. Check if username already exists
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

    // 2. Upload avatar if provided
    let avatarUrl = null;
    if (avatar) {
const fileName = `${Date.now()}-${avatar.name}`;
const { data, error: uploadError } = await supabase.storage
  .from("profile-pics")
  .upload(fileName, avatar, {
    cacheControl: "3600",
    upsert: false
  });


      if (uploadError) {
        setError("Image upload failed.");
        setSubmitting(false);
        return;
      }

      const { data: publicData } = supabase.storage
        .from("profile-pics")
        .getPublicUrl(fileName);
      avatarUrl = publicData.publicUrl;
    }

    // 3. Submit to account_requests table
    const { error: submitError } = await supabase.from("account_requests").insert([
      {
        name,
        email,
        username,
        message,
        avatar_url: avatarUrl,
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
    <div className="max-w-xl mx-auto p-6 bg-black/40 rounded-xl text-white mt-8">
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
        <div className="text-sm">
          <label className="block mb-1">Upload Profile Picture (optional):</label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
            className="text-white"
          />
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
