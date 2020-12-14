import React from "react";
import {Link} from "react-router-dom";
import UserService from "../../services/UserService";
import "../../styles/UserComponents.style.client.css"
import MovieService from "../../services/MovieService";


export default class FriendsProfileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.movieService = new MovieService();
        this.userService = new UserService()
        this.state = {
            users: [],
            userId: this.props.match.params.userId,
            revieweeId : this.props.match.params.friendId,
            currentUser: {},
            currentReviewee: {
                likedMovies: []
            }
        }
    }

    componentDidMount  = async () => {
        let users = await this.userService.findALlUsers()
        let currentUser = await this.userService.findUserById(this.state.userId)

        let user = await this.userService.findUserById(this.state.revieweeId)

        await this.setState({
            users: users,
            currentReviewee: user,
            currentUser: currentUser
        })

        let likedMovieIdsCopy = await user.likedMovieIds
        let count = await likedMovieIdsCopy.length

        for (let i = 0; i < count; i++) {
            let id = await likedMovieIdsCopy[i]
            let movie = await this.movieService.findMovieById(id)
            if (!this.state.currentReviewee.likedMovies.includes(movie)) {
                await user.likedMovies.push(movie)
            }
        }

        let followingsIdsCopy = await user.followingIds
        let count2 = await followingsIdsCopy.length

        for (let i = 0; i < count2; i++) {
            let id = await followingsIdsCopy[i]
            let follow = await this.userService.findUserById(id)
            if (!this.state.currentReviewee.followings.includes(follow)) {
                await user.followings.push(follow)
            }
        }

        let followersIdsCopy = await user.followerIds
        let count3 = await followersIdsCopy.length

        for (let i = 0; i < count3; i++) {
            let id = await followersIdsCopy[i]
            let follow = await this.userService.findUserById(id)
            if (!this.state.currentReviewee.followers.includes(follow)) {
                await user.followers.push(follow)
            }
        }


        const updateFollowings = await this.userService.updateUser(user)

        this.setState({
            currentReviewee: user,
            currentUser: currentUser
        })

    }




    render() {
        return(
            <div>
                <div className="row">

                    <div className="col-md-6">
                        <h1> Profile Management </h1>
                    </div>

                    <div className="col-md-6">

                        <Link className="btn btn-outline-danger large floatRight"
                              to={`/user/${this.state.userId}/profile`}>
                            <i className="fa fa-times"></i>
                            Go back to my profile
                        </Link>

                    </div>
                </div>

                <div className="user-box">
                    <div className="user-form-box">

                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                disabled
                                className={`form-control`}
                                placeholder="First Name"
                                type="text"
                                name="firstName"
                                value={this.state.currentReviewee.firstName}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                disabled
                                className={`form-control`}
                                placeholder="Last Name"
                                type="text"
                                name="lastName"
                                value={this.state.currentReviewee.lastName}
                            />
                        </div>


                        <ul className="list-group">
                            <li className="list-group-item"><b>Liked Movies:</b>
                                {
                                    this.state.currentReviewee.likedMovies && this.state.currentReviewee.likedMovies.map((movie) =>
                                        <div key={movie.imdbID}>
                                            <Link
                                                className={`btn btn-outline-info`}
                                                to={`/viewer/${this.props.match.params.userId}/movie/${movie.imdbID}`} id="goToMovie">
                                                {movie.Title}
                                            </Link>
                                        </div>
                                    )
                                }
                            </li>

                            <li className="list-group-item"><b>Following:</b>
                                {
                                    this.state.currentReviewee.followings &&  this.state.currentReviewee.followings.map((user) =>
                                        <div className={`row`} key={user.id}>

                                            <div className={`col-4`}>
                                                {user.firstName} {user.lastName}
                                            </div>

                                            <div className={`col-8 row`}>

                                                <div className={`col-6`}>
                                                </div>

                                                {
                                                    user.email !== this.state.currentUser.email &&

                                                    <Link
                                                        to={`/user/${this.state.userId}/friendsProfile/${user.id}`}
                                                        className={`col-6 btn btn-outline-info float-right`}>
                                                        profile
                                                    </Link>
                                                }

                                                {
                                                    user.email === this.state.currentUser.email &&

                                                    <Link
                                                        to={`/user/${this.state.userId}/profile`}
                                                        className={`col-6 btn btn-outline-danger float-right`}>
                                                        Go back to your own profile
                                                    </Link>
                                                }

                                            </div>

                                        </div>
                                    )
                                }
                            </li>

                            <li className="list-group-item"><b>Followers:</b>
                                {
                                    this.state.currentReviewee.followers &&  this.state.currentReviewee.followers.map((user) =>
                                        <div className={`row`} key={user.id}>
                                            <div className={`col-4`}>
                                                {user.firstName} {user.lastName}
                                            </div>

                                            <div className={`col-8 row`}>
                                                <div className={`col-6`}>

                                                </div>

                                                {
                                                    user.email !== this.state.currentUser.email &&
                                                    <Link
                                                        to={`/user/${this.state.userId}/friendsProfile/${user.id}`}
                                                        className={`col-6 btn btn-outline-info float-right`}>
                                                        profile
                                                    </Link>
                                                }

                                                {
                                                    user.email === this.state.currentUser.email &&

                                                    <Link
                                                        to={`/user/${this.state.userId}/profile`}
                                                        className={`col-6 btn btn-outline-danger float-right`}>
                                                        Go back to your own profile
                                                    </Link>
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            </li>
                            <li/>

                        </ul>
                    </div>
                </div>


            </div>
        )
    }
}
