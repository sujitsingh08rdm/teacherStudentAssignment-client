import React from "react";
import { Link } from "react-router";

export default function UnAuthPage() {
  return (
    <div className="min-h-screen p-12 bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <h1 className="text-xl font-bold text-red-600">tailwebs.</h1>
      </header>
      <main className="p-6 flex flex-col items-center justify-center">
        <section className="bg-white shadow rounded-lg px-8 py-12 text-center">
          <h2 className="text-lg font-semibold mb-4">You are logged out</h2>
          <p className="text-gray-600 mb-6">
            Please click the button below to login again.
          </p>
          <Link
            to="/auth/login"
            className="px-6 py-2 text-white bg-black rounded hover:bg-gray-800"
          >
            Login
          </Link>
        </section>
      </main>
    </div>
  );
}
