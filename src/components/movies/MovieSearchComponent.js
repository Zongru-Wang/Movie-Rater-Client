import React from "react";
import {Link} from "react-router-dom";
import "../../styles/MovieSearchComponent.style.client.css"
import {IMDB_URL} from "../../constant/common";
import MovieService from "../../services/MovieService";
import UserService from "../../services/UserService";


export default class MovieSearchComponent extends React.Component {

    constructor(props) {
        super(props);
        this.movieService = new MovieService();
        this.userService = new UserService()
        this.state = {
            currentUser: this.props.match.params.userId,
            movies: [],
            searchTitle: this.props.match.params.searchTitle,
            message: "Have fun~"
        }
    }

    componentDidMount = async () => {
        if(!this.state.searchTitle)
            this.state.searchTitle=''

        const results = await this.movieService.findMoviesByTitle(this.state.searchTitle)
        this.setState({
            movies: results.Search,
        })
    }



    searchMovies = async (title) => {
        if (this.state.currentUser) {
            await this.props.history.push(`/viewer/${this.props.match.params.userId}/search/${title}`)
        } else {
            await this.props.history.push(`/search/${title}`)
        }

        const results = await this.movieService.findMoviesByTitle(this.state.searchTitle)
        this.setState({
            movies: results.Search,
        })
    }



    render() {
        return(
            <div>

                {this.state.currentUser &&
                <div className={`row`}>
                    <div className="col-12">

                        <Link className="btn btn-outline-danger large floatRight"
                              to="/">
                            <i className="fa fa-times"></i>
                            Log out
                        </Link>

                    </div>
                </div>
                }

                {!this.state.currentUser &&
                <div className={`row`}>
                    <div className="col-12">

                        <Link className="btn btn-outline-danger large floatRight"
                              to="/">
                            <i className="fa fa-times"></i>
                            Go back to log in page
                        </Link>

                    </div>
                </div>
                }
                <h1 className="floatCenter"> Search Movies <i className="fa fa-search"/> </h1>
                <input
                    className={`form-control`}
                    onChange={e => this.setState({searchTitle: e.target.value})}
                    value={this.state.searchTitle}
                    id="searchText"/>
                <div className="col-12 floatCenter">
                    <button className={`btn btn-success btn-block btn-search `}
                            onClick={() => this.searchMovies(this.state.searchTitle)}
                            id="genBtn">
                        Search For Movie
                    </button>
                </div>


                {
                    this.state.currentUser &&
                    <div className="col-12 floatCenter">
                        <Link className={`btn btn-success btn-block btn-search`}
                              to={`/viewers/${this.props.match.params.userId}`}
                              id="genBtn">
                            Go back to liked list
                        </Link>
                    </div>

                }

                <br/>

                <div className={`movies`} id={`movies`}>
                    {
                        this.state.movies && this.state.movies.map((movie, i) =>
                            <div className="col-md-3 col-sm-6 col-6 movie-listing" key={i}>

                                <Link to={this.state.currentUser ? `/viewer/${this.props.match.params.userId}/details/${movie.imdbID}`:`/details/${movie.imdbID}`}
                                      id="goToMovie">

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

                    {
                        !this.state.movies &&
                        <div className="floatCenter extend">
                            <img className="IMDBlogo"
                                 src={`https://i.ya-webdesign.com/images/transparent-jeffrey-imdb-3.png`}>
                            </img>

                            <h3 className="seaching">
                                Find your movies by searching!
                            </h3>
                        </div>
                    }



                </div>
            </div>
        )
    }

}
