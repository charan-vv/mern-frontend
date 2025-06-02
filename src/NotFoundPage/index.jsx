import { useNavigate } from "react-router-dom";
import { PageNotFoundImg } from "../config";
import { Button } from "../components";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  const handleRedirect = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };
  const buttonLabel=isAuthenticated ? "Go to Dashboard" : "Go to Login"

  return (
    <div className="flex flex-col items-center  ">
    <PageNotFoundImg className={`${isAuthenticated ? 'h-[450px]' : 'h-[488px]'} `} />
      <Button textContent={buttonLabel} onClick ={handleRedirect} />
    </div>
  );
};

export default NotFoundPage;
