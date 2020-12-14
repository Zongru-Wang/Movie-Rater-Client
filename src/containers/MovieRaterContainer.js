import React from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import MovieSearchComponent from "../components/movies/MovieSearchComponent";
import MovieDetailsComponent from "../components/movies/MovieDetailsComponent";
import RegisterComponent from "../components/LoginAndRegister/RegisterComponent"
import LoginComponent from "../components/LoginAndRegister/LoginComponent";
import AdminComponent from "../components/users/AdminComponent";
import ViewerComponent from "../components/users/ViewerComponent";
import ProfileComponent from "../components/users/ProfileComponent";
import FriendsProfileComponent from "../components/users/FriendsProfileComponent";
import PrivacyComponent from "../components/LoginAndRegister/PrivacyComponent";



class MovieRaterContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount = async () => {
    };

    render() {
        return (
            <Router>
                <div className={`container`}>
                    <h1> <i className="fa fa-video"/> Movie Rater</h1>
                    <br/>

                    <Route
                        path={`/`}
                        exact={true}
                        component={LoginComponent}/>

                    <Route
                        path={`/register`}
                        exact={true}
                        component={RegisterComponent}/>

                    <Route
                        path={`/privacy`}
                        exact={true}
                        component={PrivacyComponent}/>

                    <Route
                        path={`/admins/:userId`}
                        exact={true}
                        component={AdminComponent}/>

                    <Route
                        path={`/viewers/:userId`}
                        exact={true}
                        component={ViewerComponent}/>

                    <Route
                        path={`/user/:userId/profile`}
                        exact={true}
                        component={ProfileComponent}/>

                    <Route
                        path={`/user/:userId/friendsProfile/:friendId`}
                        exact={true}
                        component={FriendsProfileComponent}/>

                    <Route
                        path={`/viewer/:userId/search`}
                        exact={true}
                        component={MovieSearchComponent}/>

                    <Route
                        path={`/viewer/:userId/search/:searchTitle`}
                        exact={true}
                        component={MovieSearchComponent}/>

                    <Route
                        path={`/search`}
                        exact={true}
                        component={MovieSearchComponent}/>

                    <Route
                        path={`/search/:searchTitle`}
                        exact={true}
                        component={MovieSearchComponent}/>

                    <Route
                        path={`/viewer/:userId/details/:imdbID`}
                        exact={true}
                        component={MovieDetailsComponent}/>

                    <Route
                        path={`/details/:imdbID`}
                        exact={true}
                        component={MovieDetailsComponent}/>
                </div>
            </Router>
        )
    }
}

export default MovieRaterContainer
