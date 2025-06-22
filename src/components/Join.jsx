
import { useState } from "react";
import "./Join.css";

export default function Join() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setSubscribed(true);
    setEmail("");
  };

  return (
    <div className="join-page">
      <h1>Stay in the Loop</h1>
      {subscribed ? (
        <p className="confirmation">✅ Thanks! You’ll get weekly updates.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      )}
      <p className="blurb">We’ll send you a weekly update of Fresno's music events — no spam, just jams.</p>
    </div>
  );
}
