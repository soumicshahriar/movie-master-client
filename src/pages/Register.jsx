import React, { useContext, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { createUser } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photo.value;
    const password = form.password.value;

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    setError("");
    setSuccess("");
    createUser(email, password)
      .then(() => {
        // console.log(result.user);
        setSuccess("User created successful");
        form.reset();
      })
      .catch(() => {
        setError("Email is already exist ? Please Try with different Email");
      });

    setError("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="p-8 rounded-2xl shadow-md shadow-primary w-full max-w-md border-b-2 border-primary">
        <h2 className="text-3xl font-semibold text-center mb-6 text-primary">
          Register
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-0"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-0"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Photo URL</label>
            <input
              type="text"
              name="photo"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-0"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-0"
            />
          </div>
          {success && (
            <p className="text-green-500 text-sm text-center">{success}</p>
          )}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition"
          >
            Register
          </button>
        </form>

        <div className="text-center my-4 text-gray-500">or</div>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
