import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSideBar, NavBar, SmallSideBar } from "../components";
import { createContext, useContext, useState } from "react";
import { checkDefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

const DashBoardContext = createContext();

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    toast.error(error?.response.data.message);
    console.log(error);

    return redirect("/");
  }
};
const DashboardLayout = () => {
  const { data } = useLoaderData();
  const naviagte = useNavigate();

  const user = data.user;

  const [showSideBar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  function toggleDarkTheme() {
    setIsDarkTheme(() => {
      const newDarkTheme = !isDarkTheme;
      localStorage.setItem("darkTheme", newDarkTheme);
      document.body.classList.toggle("dark-theme", newDarkTheme);
      return !isDarkTheme;
    });
  }

  function toggleSidebar() {
    setShowSidebar(!showSideBar);
  }

  const logOutUser = async () => {
    try {
      const res = await customFetch.get("/auth/logout");
      toast.success(res?.data?.message);
      naviagte("/");
    } catch (error) {
      toast.error(error.request.data.message);
    }
  };

  return (
    <DashBoardContext.Provider
      value={{
        user,
        showSideBar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logOutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSideBar />
          <BigSideBar />
          <div>
            <NavBar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashBoardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashBoardContext);
export default DashboardLayout;
