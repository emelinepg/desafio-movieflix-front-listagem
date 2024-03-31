import { Link } from 'react-router-dom';
import './styles.css';
import { useContext, useEffect } from 'react';
import history from 'utils/history';
import { AuthContext } from 'AuthContext';
import { removeAuthData } from 'utils/storage';
import { isAuthenticated, getTokenData } from 'utils/auth';


const Navbar = () => {
  const {authContextData, setAuthContextData} = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event : React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    })
    history.replace('/');
  };

  return (
    <nav className="navbar main-nav">
      <Link to="/" className="nav-logo-text">
        <h4>MovieFlix</h4>
      </Link>
      <div>
        {authContextData.authenticated && (
          <a href="#logout" onClick={handleLogoutClick} className="logout-container">
            SAIR
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
