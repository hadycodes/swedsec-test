import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Navigate } from "react-router";

const Authenticate = (props: React.PropsWithChildren) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.token.isAuthenticated
  );

  if (isAuthenticated) {
    return <>{props.children}</>
  }

  return <Navigate to="/login" />;
};

export default Authenticate;
