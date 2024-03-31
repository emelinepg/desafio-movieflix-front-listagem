import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from 'utils/auth';

type Props = {
  children: React.ReactNode;
  path: string;
  exact?: boolean;
};

const PrivateRoute = ({ children, path, exact }: Props) => {

  return (
    <Route
      path={path}
      render={() =>
        isAuthenticated() ? <>{children}</> : <Redirect to="/" />
      }
      exact={exact}
    />
  );
};

export default PrivateRoute;