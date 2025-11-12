import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Bounce, toast, ToastContainer } from "react-toastify";
import useAxios from "../hooks/useAxios";

const Register = () => {
  const axiosInstance = useAxios();
  const { createUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();

  const from = location?.state || "/";

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

    try {
      // Create user in Firebase/Auth
      await createUser(email, password);

      // Add user to your backend
      await axiosInstance.post("/users", {
        name,
        email,
        photo: photoURL,
      });

      setSuccess("User created successfully!");
      form.reset();
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Registration successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/"); // Redirect after successful registration
    } catch (err) {
      toast("Registration failed! Email may already exist.", {
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
      console.error(err);
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
    <div className="flex justify-center items-center min-h-screen text-base md:text-lg">
      <div className="p-8 rounded-2xl shadow-md shadow-primary w-full max-w-md border-b-2 border-primary bg-black">
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
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-0"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-0"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Photo URL</label>
            <input
              type="text"
              name="photo"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-0"
            />
          </div>

          {/* Password field with eye icon 👁️ */}
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

          {success && (
            <p className="text-green-500 text-sm text-center">{success}</p>
          )}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-pink-600 transition cursor-pointer"
          >
            Register
          </button>
        </form>
        <div className="mt-5 text-start text-primary">
          <ul className="list-disc list-inside space-y-1 text-sm text-secondary">
            <li>Password must contain at least one uppercase letter.</li>
            <li>At least one lowercase letter.</li>
            <li>Password must be at least 6 characters long.</li>
          </ul>
        </div>

        <div className="text-center my-4 text-gray-500">or</div>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center border py-2 rounded-md hover:border-2 hover:border-primary transition cursor-pointer"
        >
          <FaGoogle className="mr-2 text-primary" />
          Google Login
        </button>
        <p className="text-center text-sm mt-4">
          Already have an account ?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
