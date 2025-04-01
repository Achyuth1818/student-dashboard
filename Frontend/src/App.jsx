import React from "react";
import Home from "./components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import MyProfile from "./components/Myprofile";
import Login from "./components/Login";
import RegisterPage from "./components/RegisterPage";
import FitnessTracker from "./components/FitnessTracker";
import AddFitness from "./components/AddFitness";
import ViewProfile from "./components/ViewProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/navbar",
    element: <Navbar />,
  },
  {
    path: "/myprofile",
    element: <MyProfile />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/fitness-tracker",
    element: <FitnessTracker />,
  },
  {
    path: "/add-fitness",
    element: <AddFitness />,
  },
  {
    path: "/view-profile",
    element: <ViewProfile />,
  },
]);

const App = () => {
  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
};

export default App;
