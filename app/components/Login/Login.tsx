import React, { useState, ChangeEvent, MouseEvent } from "react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

// Define types for LoginData structure
interface LoginDataType {
  email: string;
  password: string;
}

// Login data array
const LoginData: LoginDataType[] = [
  {
    email: "info@nals.com",
    password: "123",
  },
];

const Login: React.FC = () => {
  // Type annotations for state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Hooks
  const toast = useToast();
  const router = useRouter()

  // Event handlers with type annotations
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate user credentials
    const valid = LoginData.find(
      (data) => data.email === email && data.password === password
    );

    if (valid) {
      // Save user credentials in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: "test123",
          avatar: "/cat.png",
          email: valid.email,
          name: "Test",
        })
      );

      toast({
        title: "Login success",
        description: "You have successfully logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/home");
    } else {
      toast({
        title: "Invalid credentials",
        description: "The email or password you entered is incorrect.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <section className="bg-gray-50 darka:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 darka:text-white"
        >
          <img className="" src="/nals-logo.png" alt="logo" />
        </a>
        <div className="w-full bg-white rounded-lg shadow darka:border md:mt-0 sm:max-w-md xl:p-0 darka:bg-gray-800 darka:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl darka:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 darka:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleEmail}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 darka:bg-gray-700 darka:border-gray-600 darka:placeholder-gray-400 darka:text-white darka:focus:ring-blue-500 darka:focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 darka:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handlePassword}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 darka:bg-gray-700 darka:border-gray-600 darka:placeholder-gray-400 darka:text-white darka:focus:ring-blue-500 darka:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 darka:bg-gray-700 darka:border-gray-600 darka:focus:ring-primary-600 darka:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 darka:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline darka:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                onClick={handleClick}
                className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center darka:bg-primary-600 darka:hover:bg-primary-700 darka:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 darka:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  className="font-medium text-primary hover:underline darka:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
