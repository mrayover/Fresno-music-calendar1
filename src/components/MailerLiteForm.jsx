import React from "react";

const MailerLiteForm = () => {
  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-2 text-center">Fresno Music Calendar</h2>
      <p className="text-gray-700 mb-4 text-center">Sign up for weekly updates and notices!</p>
      <form
        action="https://assets.mailerlite.com/jsonp/1613419/forms/157952342155593362/subscribe"
        method="post"
        target="_blank"
        className="space-y-4"
      >
        <input
          type="email"
          name="fields[email]"
          placeholder="Enter your email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input type="hidden" name="ml-submit" value="1" />
        <input type="hidden" name="anticsrf" value="true" />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default MailerLiteForm;
