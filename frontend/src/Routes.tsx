import PrivateRoute from "components/PrivateRoute";
import { Route, Router, Switch } from "react-router-dom";
import history from "utils/history";
import Home from "pages/Home";
import MovieDetails from "pages/MovieDetails";
import MovieList from "pages/MovieList";
import Navbar from "components/Navbar";

const Routes = () => {

    return (
        <Router history={history}>
            <Navbar />
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <PrivateRoute path="/movies" exact>
                    <MovieList />
                </PrivateRoute>
                <PrivateRoute path="/movies/:movieId">
                    <MovieDetails />
                </PrivateRoute>
            </Switch>
        </Router>
    );
}

export default Routes;