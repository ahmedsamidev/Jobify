import { Outlet, redirect, useNavigate, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSideBar, Loading, NavBar, SmallSideBar } from "../components";
import { createContext, useContext, useEffect, useState } from "react";
import { checkDefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const DashBoardContext = createContext();

const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    toast.error(error?.response.data.message);

    return redirect("/");
  }
};
const DashboardLayout = () => {
  const {
    data: {
      data: { user },
    },
  } = useQuery(userQuery);

  const naviagte = useNavigate();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const [isAuthError, setIsAuthError] = useState(false);
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

  customFetch.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) setIsAuthError(true);

      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (isAuthError) logOutUser();
  }, [isAuthError]);

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
              {isLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashBoardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashBoardContext);
export default DashboardLayout;
