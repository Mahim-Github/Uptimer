import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignup from "../hooks/useSignup";
import toast from "react-hot-toast";
function Signup() {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [username, setUsername] = useState("");
  const { signup, isLoading } = useSignup();

  function handleSignUp(e) {
    if (!mail || !pass || !username)
      return toast.error("All fields are required");
    e.preventDefault();
    console.log(mail, pass, username);
    signup(
      { email: mail.toLowerCase(), password: pass, username },
      {
        onSuccess: (user) => {
          console.log(user);
          toast.success("Signup Successfull");
          navigate("/signin");
        },
        onError: () => {
          toast.error("Invalid email or password");
          console.log("ERROR!!");
        },
      },
    );
  }
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-zinc-900">
      <div className="flex h-[80%] w-[80%] overflow-hidden rounded-xl bg-gray-50">
        <div className="signin-img hidden h-full w-[100%] bg-cover lg:block" />
        {/*  */}
        <form className="relative flex h-full w-full flex-col items-center justify-center gap-4 bg-gray-50 p-4">
          <p className="schabo text-[75px] text-black">SIGN UP</p>
          <div className="field h-12 w-[80%]">
            <div className="input-wrapper">
              <input
                className="input"
                type="text"
                id="username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <label
                className="label"
                htmlFor="username"
                style={{
                  top: username ? "-5px" : "",
                  left: username ? "8px" : "",
                }}
              >
                Username
              </label>
            </div>
          </div>
          <div className="field h-12 w-[80%]">
            <div className="input-wrapper" onSubmit={handleSignUp}>
              <input
                className="input"
                type="text"
                id="email"
                name="email"
                onChange={(e) => setMail(e.target.value)}
              />
              <label
                className="label"
                htmlFor="email"
                style={{
                  top: mail ? "-5px" : "",
                  left: mail ? "8px" : "",
                }}
              >
                Email
              </label>
            </div>
          </div>

          <div className="field h-12 w-[80%]">
            <div className="input-wrapper">
              <input
                className="input"
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPass(e.target.value)}
              />
              <label
                className="label"
                htmlFor="password"
                style={{
                  top: pass ? "-5px" : "",
                  left: pass ? "8px" : "",
                }}
              >
                Password
              </label>
            </div>
          </div>

          <button
            className="h-12 w-[80%] rounded-md bg-zinc-900 font-semibold uppercase text-white transition-all duration-500 ease-out hover:bg-zinc-800"
            onClick={handleSignUp}
          >
            Sign up
          </button>

          <div
            className="field flex h-fit w-[80%] cursor-pointer justify-end text-blue-600"
            onClick={() => navigate("/signin")}
          >
            Existing User? Go to the Sign in
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
