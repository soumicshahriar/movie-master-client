import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { Bounce, toast, ToastContainer } from "react-toastify";
import useAxios from "../hooks/useAxios";

const Login = () => {
  const axiosInstance = useAxios();
  const { signInUser, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location?.state || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setError("");
    try {
      await signInUser(email, password);
      toast("Login Successful", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      const user = result.user;

      // Create or update user in your backend
      await axiosInstance.post("/users", {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      });

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError("Google login failed!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen relative text-xs md:text-lg">
      <div className="bg-black border-b-2 border-primary p-8 rounded-2xl shadow-md shadow-primary w-full max-w-md ">
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
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-0"
            />
          </div>

          {/* Password Field with Eye Icon 👁️ */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-0"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-secondary transition cursor-pointer"
          >
            Login
          </button>
        </form>

        <div className="text-center my-4 text-gray-500">or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center border py-2 rounded-md hover:border-2 hover:border-primary transition cursor-pointer"
        >
          <FaGoogle className="mr-2 text-primary" />
          Google Login
        </button>

        <div className="text-center mt-4 text-sm text-gray-600">
          <p>
            Don't have an account ?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
          <p className="mt-1 cursor-pointer hover:text-primary">
            Forgot Password?
          </p>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Login;
