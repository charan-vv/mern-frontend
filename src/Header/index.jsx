import { useLocation, useNavigate } from "react-router-dom";
import { VscSettingsGear } from "react-icons/vsc";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Avatar } from "../components";
import "./style.scss";

const Header = ({ header_ref }) => {
  const location = useLocation();
  const navigate = useNavigate();
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
      <div className="flex gap-5 ">
        <div
          ref={header_ref("settings")}
          className="inline-flex items-center justify-center min-w-[40px] min-h-[40px]"
        >
          <VscSettingsGear
            className="budget_icons "
            onClick={() => navigate("settings")}
          />
        </div>

        <div
          className="inline-flex items-center justify-center min-w-[40px] min-h-[40px]"
          ref={header_ref("notification")}
        >
          <IoIosNotificationsOutline className="budget_icons" />
        </div>

        <div
          className="inline-flex items-center justify-center min-w-[40px] min-h-[40px]"
          ref={header_ref("user")}
        >
          <Avatar //  color="#191c36"
            name={"C"}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
