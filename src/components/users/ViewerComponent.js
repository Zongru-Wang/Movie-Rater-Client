import React from "react";
import {Link} from "react-router-dom";
import "../../styles/UserComponents.style.client.css"
import MovieService from "../../services/MovieService";
import UserService from "../../services/UserService";

export default class ViewerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.movieService = new MovieService();
        this.userService = new UserService();

        this.state = {
            userId: this.props.match.params.userId,
            movie: {},
            haveMovie: false,
            likedMovies: [],
            currentUser: {
                type: '',
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                id: '',
                likedMovies: []
            },
            showMovie: false
        }
    }

    componentDidMount = async () => {
        let user = await this.userService.findUserById(this.state.userId)
        let likedMovieIdsCopy = await user.likedMovieIds
        let count = likedMovieIdsCopy.length

        for (let i = 0; i < count; i++) {
            let id = await likedMovieIdsCopy[i]
            let movie = await this.movieService.findMovieById(id)

            if (!this.state.currentUser.likedMovies.includes(movie)) {
                await user.likedMovies.push(movie)
            }
        }

        const update = await this.userService.updateUser(user)

        this.setState({
            currentUser: user
        })

    }


    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if(prevState.showMovie !== this.state.showMovie) {
            let user = await this.userService.findUserById(this.state.userId)
            this.setState({
                currentUser: user
            })
        }
    }



    render() {
        return(
            <div>

                <div className="row">

                    <div className="col-md-6">
                        <h1>
                            Welcome, {this.state.currentUser.firstName} {this.state.currentUser.lastName}
                        </h1>

                        {
                            this.state.currentUser.likedMovies.length > 0&&
                            <h3> Here is your liked movie list </h3>
                        }

                    </div>

                    <div className="col-md-6">

                        <Link className="btn btn-outline-danger large floatRight"
                              to="/">
                            <i className="fa fa-times"></i>
                            Log out
                        </Link>

                        <Link className="btn btn-outline-success large floatRight"
                              to={`/user/${this.state.userId}/profile`}>
                            <i className="fa fa-edit"></i>
                            Profile
                        </Link>

                    </div>
                </div>

                <br/>

                <div className={`movies`} id={`movies`}>
                    <div className={`row`}>
                        {
                            this.state.currentUser.likedMovies.length > 0 && this.state.currentUser.likedMovies.map((movie, i) =>
                                <div className="col-md-3 col-sm-6 col-6 movie-listing" key={i}>
                                    <Link to={`/viewer/${this.props.match.params.userId}/details/${movie.imdbID}`} id="goToMovie">
                                        <div className="well text-center">
                                            <img src={movie.Poster} alt={movie.Title}/>
                                            <div className="middle">
                                                <h6 className="search-title">{movie.Title}</h6>
                                                <p className="search-year">Released: {movie.Year}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        }
                    </div>


                    <div>
                        <Link to={`/viewer/${this.props.match.params.userId}/search`}>
                            <div className="floatCenter extend">

                                <img className="IMDBlogo"
                                     src={`https://i.ya-webdesign.com/images/transparent-jeffrey-imdb-3.png`}>
                                </img>

                                <h3 className="seaching">
                                    Find your movies by searching!
                                </h3>

                            </div>
                        </Link>
                    </div>

                </div>
            </div>
        )
    }
}
