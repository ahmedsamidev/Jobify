import { FaTimes } from "react-icons/fa";
import Wrapper from "../assets/wrappers/SmallSidebar";
import Logo from "./Logo";
import { useDashboardContext } from "../pages/DashboardLayout";
import NavLinks from "./NavLinks";

const SmallSideBar = () => {
  const { showSideBar, toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className={`sidebar-container ${showSideBar ? "show-sidebar" : ""}`}>
        <div className="content">
          <button type="button" onClick={toggleSidebar} className="close-btn">
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSideBar;
