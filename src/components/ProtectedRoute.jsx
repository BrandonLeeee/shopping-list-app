import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import IsLoading from "./ui/IsLoading";

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.warning("You must be logged in to view this page.", {
        duration: 2000,
      });
      // Delay the navigation slightly so the toast has time to appear
      const timer = setTimeout(() => {
        navigate("/login");
      }, 100);

      // Cleanup the timer on unmount
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="min-h-[70vh] sm:min-h-90 flex justify-center items-center">
        <IsLoading />
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
