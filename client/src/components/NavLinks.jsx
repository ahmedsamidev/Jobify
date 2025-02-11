import { NavLink } from "react-router-dom";
import { useDashboardContext } from "../pages/DashboardLayout";
import links from "../utils/links";

const NavLinks = ({ isBigSideBar }) => {
  const { toggleSidebar, user } = useDashboardContext();

  const isAdmin = user.role === "admin";

  const userAdaptiveLinks = isAdmin
    ? links
    : links.filter((link) => link.text !== "admin" && link.text !== "stats");

  return (
    <div className="nav-links">
      {userAdaptiveLinks.map((link) => {
        const { text, path, icon } = link;
        return (
          <NavLink
            onClick={!isBigSideBar && toggleSidebar}
            to={path}
            key={text}
            className="nav-link"
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
