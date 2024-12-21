import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import LoginContent from "./components/LoginContent";
import LoginWithOtp from "./components/LoginWithOtp";
import UpdatePass from "./components/UpdatePass";
import ForgetPass from "./components/ForgetPass";
import OtpModal from "./components/OtpModal";
import SignUp from "./components/SignUp";

function App() {
  const router = createBrowserRouter([
    {
      path: "/Login",
      element: (
        <Login>
          <LoginContent />
        </Login>
      ),
    },
    {
      path: "/UpdatePass",
      element: (
        <Login>
          <UpdatePass />
        </Login>
      ),
    },
    {
      path: "/LoginWithOtp",
      element: (
        <Login>
          <LoginWithOtp />
        </Login>
      ),
    },
    {
      path: "/ForgetPass",
      element: (
        <Login>
          <ForgetPass />
        </Login>
      ),
    },
    {
      path: "/SignUp",
      element: (
        <Login>
          <SignUp />
        </Login>
      ),
    },
   
  ]);

  return <RouterProvider router={router} />;
}

export default App;
