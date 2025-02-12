import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../components/Axios";
import { Loader } from "lucide-react";

const updateApiToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const AuthProvider = ({ children }) => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);

        // if(token) {

        // }
      } catch (error) {
        updateApiToken(null);
        console.log("Error in auth provider", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [getToken]);

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#121212]">
        <Loader className="size-20 text-emerald-500 animate-spin" />
      </div>
    );
  return <>{children}</>;
};

export default AuthProvider;
