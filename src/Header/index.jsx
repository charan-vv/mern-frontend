import { useLocation } from "react-router-dom";
import { VscSettingsGear } from "react-icons/vsc";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Avatar } from "../components";
import "./style.scss";

const Header = () => {
  const location = useLocation();

  const formattedName = location.pathname.split("/")[1];
  const page_name = formattedName
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (char) => char.toUpperCase());

  return (
    <div className="budget_header">
      {/* page name  */}
      <div>
        <h2> {page_name}</h2>
      </div>

      {/* header icons */}
      <div className="flex gap-5">
        <VscSettingsGear className="budget_icons" />
        <IoIosNotificationsOutline className="budget_icons" />
        <Avatar
        //  color="#191c36"
          name={"C"} />
      </div>
    </div>
  );
};

export default Header;
