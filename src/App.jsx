import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-3xl shadow-2xl p-10 sm:p-12 max-w-3xl w-full text-center border border-orange-200 animate-fade-in">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-orange-500 mb-6 leading-tight">
          🚧 Site Under Construction 🚧
        </h1>
        <p className="text-gray-700 text-lg sm:text-xl mb-3">
          We're currently crafting something amazing for you.
        </p>
        <p className="text-gray-600 text-base sm:text-lg mb-6">
          Please bear with us while we improve the experience. The site will be back online shortly.
        </p>
        <p className="mb-10">
          &mdash; <a
            href="mailto:[Email]"
            className="text-orange-600 font-semibold hover:underline hover:text-orange-800 transition-colors duration-200"
          >
            [Check Back Soon]
          </a>
        </p>
        <div className="text-sm text-gray-500">
          Maintained by <span className="font-semibold text-orange-500">UrFirstStep</span>
        </div>
      </div>
    </div>
  );
}

export default App;
