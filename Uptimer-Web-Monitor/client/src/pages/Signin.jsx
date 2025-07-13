import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignin from "../hooks/useSignin";
import toast from "react-hot-toast";
function Signin() {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const { signin, isLoading } = useSignin();

  function handleSignin(e) {
    if (!mail || !pass) return toast.error("All fields are required");
    e.preventDefault();
    console.log(mail, pass);
    signin(
      { email: mail.toLowerCase(), password: pass },
      {
        onSuccess: (user) => {
          console.log(user);
          toast.success("Login Successful");
          navigate("/dashboard");
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
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 bg-gray-50 p-4">
          <p className="schabo text-[75px] text-black">SIGN IN</p>
          <div className="field h-12 w-[80%]">
            <form className="input-wrapper" onSubmit={handleSignin}>
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
            </form>
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
            onClick={handleSignin}
          >
            Sign in
          </button>

          <div
            className="field flex h-fit w-[80%] cursor-pointer justify-end text-blue-600"
            onClick={() => navigate("/signup")}
          >
            New User? Go to the Signup
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
