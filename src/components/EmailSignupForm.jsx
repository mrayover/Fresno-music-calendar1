
import React from "react";

const EmailSignupForm = () => {
  return (
    <div className="email-signup-container">
      <h4>Fresno Music Calendar</h4>
      <p>Sign up for weekly updates and notices!</p>
      <form
        action="https://assets.mailerlite.com/jsonp/1613419/forms/157952342155593362/subscribe"
        method="post"
        target="_blank"
      >
        <input
          type="email"
          name="fields[email]"
          placeholder="Email"
          aria-label="Email"
          aria-required="true"
          required
          className="form-control"
        />
        <input type="hidden" name="ml-submit" value="1" />
        <input type="hidden" name="anticsrf" value="true" />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
};

export default EmailSignupForm;
