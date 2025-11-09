import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { signInUser, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setError("");
    try {
      await signInUser(email, password);
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Google login failed!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-transparent border-b-2 border-primary  p-8 rounded-2xl shadow-md shadow-primary w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-6 text-primary">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
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
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-0"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition"
          >
            Login
          </button>
        </form>

        <div className="text-center my-4 text-gray-500">or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center border py-2 rounded-md hover:border-2 hover:border-primary transition"
        >
          <FaGoogle className="mr-2 text-pink-500 " />
          Google Login
        </button>

        <div className="text-center mt-4 text-sm text-gray-600">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-pink-500 hover:underline">
              Register
            </Link>
          </p>
          <p className="mt-1">Forgot Password?</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
