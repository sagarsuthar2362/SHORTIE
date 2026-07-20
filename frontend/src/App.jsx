import React from "react";

const App = () => {
  return (
    <div className="bg-zinc-900 min-h-screen text-white">
      <nav className="flex align-center justify-between">
        <h1 className="font-semibold text-xl">SHORTIE</h1>
        <div></div>
      </nav>

      <main className="flex flex-col items-center justify-center mt-16">
        <div className="flex flex-col items-center space-y-3 text-center">
          <h1 className="bg-gradient-to-r from-blue-600 to-pink-500 text-clip text-transparent bg-clip-text md:text-5xl text-2xl font-medium capitalize">
            shorten your loooong links :)
          </h1>

          <p className="text-gray-300">
            Turn messy long url URLs into clean, sharable links with{" "}
            <strong>Shortie.</strong>
          </p>
        </div>

        {/* long url input box */}
        <div className="border-2 rounded-full p-2 md:w-xl flex mt-3">
          <input
            type="text"
            placeholder="Enter your text here"
            className="outline-none w-full flex-1 pl-2"
          />
          <button className="w-fit md:px-5 px-2 py-2 bg-blue-700 cursor-pointer rounded-full">
            Shorten Now!
          </button>
        </div>
      </main>
    </div>
  );
};

export default App;
