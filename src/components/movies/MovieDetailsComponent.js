import React from "react";
import {Link} from "react-router-dom";
import "../../styles/MovieDetailsComponent.style.client.css"
import {IMDB_URL, SERVER_URL} from "../../constant/common";
import MovieService from "../../services/MovieService";
import UserService from "../../services/UserService";

export default class MovieDetailsComponent extends React.Component {

    constructor(props) {
        super(props);
        this.movieService = new MovieService();
        this.userService = new UserService()
        this.state = {
            movie: {},
            currentUser: {},
            liked: false,
            imdbID: this.props.match.params.imdbID,
            userId: this.props.match.params.userId
        }
    }

    componentDidMount = async () => {
        const movie = await this.movieService.findMovieById(this.state.imdbID)
        const user = await this.userService.findUserById(this.state.userId)


        this.setState({
            movie: movie,
            currentUser: user,
            liked: user.likedMovieIds && user.likedMovieIds.includes(this.state.imdbID)
        })
    }



    likes = async (title) => {
        alert("likes: " + title)
        const likes = await this.userService.likes(this.state.userId, this.state.imdbID)
        await this.setState({
            liked: true
        })
    }

    unlike = async (title) => {
        alert("unlikes: " + title)
        const unlikes = await this.userService.unlikes(this.state.userId, this.state.imdbID)
        await this.setState({
            liked: false
        })
    }


    render() {
        return(
            <div>

                <h1 className="header">{this.state.movie.Title}</h1>
                <br/>

                <div className="row">
                    <div className="col-md-4">
                        <br/>
                        <img src={this.state.movie.Poster}
                             alt={this.state.movie.Title}/>
                    </div>

                    <div className="row col-md-8">

                        {
                            this.props.match.params.userId &&
                            <div className="col-12">
                                {   !this.state.liked &&
                                <button className="btn btn-outline-success large floatRight"
                                        onClick={() => this.likes(this.state.movie.Title)}>
                                    <i className="fa fa-thumbs-up"></i>
                                    Like
                                </button>
                                }

                                {   this.state.liked &&
                                <button className="btn btn-outline-danger large floatRight"
                                        onClick={() => this.unlike(this.state.movie.Title)}>
                                    <i className="fa fa-thumbs-down"></i>
                                    Undo like
                                </button>
                                }
                            </div>
                        }


                        <ul className="list-group">
                            <li className="list-group-item"><b>Genre:</b> {this.state.movie.Genre}</li>
                            <li className="list-group-item"><b>Released:</b> {this.state.movie.Released}</li>
                            <li className="list-group-item"><b>Rated:</b> {this.state.movie.Rated}</li>
                            <li className="list-group-item"><b>IMDB Rating:</b> {this.state.movie.imdbRating}</li>
                            <li className="list-group-item"><b>Director:</b> {this.state.movie.Director}</li>
                            <li className="list-group-item"><b>Writer:</b> {this.state.movie.Writer}</li>
                            <li className="list-group-item"><b>Actors:</b> {this.state.movie.Actors}</li>
                            <li className="list-group-item"><b>Country:</b> {this.state.movie.Country}</li>
                            <li className="list-group-item"><b>Plot:</b> {this.state.movie.Plot}</li>
                        </ul>
                    </div>
                </div>

                <br/>

                <div className="row extend">
                    <a href={`http://imdb.com/title/${this.state.movie.imdbID}`}
                       target="_blank"
                       className="btn btn-primary"
                       id="genBtn">
                        View IMDB
                    </a>

                    <Link to={this.state.userId ? `/viewer/${this.state.userId}/search`:`/search`} className="btn btn-primary" id="genBtn">
                        Go back to search
                    </Link>
                </div>

            </div>
        )
    }
}
