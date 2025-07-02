import React from "react";

const About = () => {
  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">About This App</h1>
      <p className="text-lg text-gray-700 mb-4">
        This is a simple Book Review web app built using React, Redux Toolkit,
        React Router, and Bootstrap. Users can browse books, view details, and
        add new books with their ratings and genres.
      </p>
      <p className="text-lg text-gray-700 mb-4">
        The project demonstrates the use of:
      </p>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>📚 React for UI components</li>
        <li>🗂 Redux Toolkit for state management</li>
        <li>🧭 React Router for page navigation</li>
        <li>🎨 Bootstrap & custom CSS for styling</li>
        <li>🌐 Fetch API for backend integration </li>
      </ul>
      <p className="text-lg text-gray-700 mt-6">
        This project is a great starting point for learning how to structure a
        full-fledged React application.
      </p>
    </div>
  );
};

export default About;
