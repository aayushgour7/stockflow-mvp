import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", form);

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/dashboard");
    } catch (error) {
  console.log(error);
  console.log(error.response?.data);

  alert(error.response?.data?.message || "Login failed");
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-96 p-6 border rounded"
      >
        <h1 className="text-2xl mb-4">
          Login
        </h1>



        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          className="border p-2 w-full mb-3"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <button
          className="bg-black text-white px-4 py-2 w-full"
        >
          Login
        </button>

        <p className="mt-4 text-center">
  Don't have an account?{" "}
  <Link
    to="/signup"
    className="text-blue-600"
  >
    Signup
  </Link>
</p>
      </form>
    </div>
  );
}

export default Login;