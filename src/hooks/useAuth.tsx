import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const isAuth = useSelector((state:any) => state.login.isAuth);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (isAuth) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [ isAuth])

  return { authenticated };
};