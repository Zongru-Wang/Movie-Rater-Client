import React from "react";
import {Link} from "react-router-dom";
import UserService from "../../services/UserService";
import "../../styles/UserComponents.style.client.css"
import MovieService from "../../services/MovieService";


export default class ProfileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.movieService = new MovieService();
        this.userService = new UserService()
        this.state = {
            users: [],
            userId: this.props.match.params.userId,
            currentUser: {
                likedMovies: []
            },
            followings: [],
            followers: [],
            update: false
        }
    }

    componentDidMount = async () => {
        let users = await this.userService.findALlUsers()
        let user = await this.userService.findUserById(this.state.userId)
        let email = await user.email
        let password = await user.password
        let phone = await user.phoneNum
        let firstName = await user.firstName
        let lastName = await user.lastName


        await this.setState({
            users: users,
            currentUser: user,
            email: email,
            password: password,
            phone: phone,
            firstName: firstName,
            lastName: lastName,
            showAlert: false,
            showErrorAlert: false
        })

        let likedMovieIdsCopy = await user.likedMovieIds
        let count = await likedMovieIdsCopy.length

        for (let i = 0; i < count; i++) {
            let id = await likedMovieIdsCopy[i]
            let movie = await this.movieService.findMovieById(id)
            if (!this.state.currentUser.likedMovies.includes(movie)) {
                await user.likedMovies.push(movie)
            }
        }

        let followingsIdsCopy = await user.followingIds
        let count2 = await followingsIdsCopy.length

        for (let i = 0; i < count2; i++) {
            let id = await followingsIdsCopy[i]
            let follow = await this.userService.findUserById(id)
            if (!this.state.currentUser.followings.includes(follow)) {
                await user.followings.push(follow)
            }
        }

        let followersIdsCopy = await user.followerIds
        let count3 = await followersIdsCopy.length

        for (let i = 0; i < count3; i++) {
            let id = await followersIdsCopy[i]
            let follow = await this.userService.findUserById(id)
            if (!this.state.currentUser.followers.includes(follow)) {
                await user.followers.push(follow)
            }
        }


        const updateFollowings = await this.userService.updateUser(user)

        this.setState({
            currentUser: user
        })

    }

    componentDidUpdate = async(prevProps, prevState, snapshot) => {
        if( this.state.update) {
            const user = await this.userService.findUserById(this.state.userId)

            let likedMovieIdsCopy = await user.likedMovieIds
            let count = await likedMovieIdsCopy.length

            for (let i = 0; i < count; i++) {
                let id = await likedMovieIdsCopy[i]
                let movie = await this.movieService.findMovieById(id)
                if (!this.state.currentUser.likedMovies.includes(movie)) {
                    await user.likedMovies.push(movie)
                }
            }

            let followingsIdsCopy = await user.followingIds
            let count2 = await followingsIdsCopy.length

            for (let i = 0; i < count2; i++) {
                let id = await followingsIdsCopy[i]
                let follow = await this.userService.findUserById(id)
                if (!this.state.currentUser.followings.includes(follow)) {
                    await user.followings.push(follow)
                }
            }

            let followersIdsCopy = await user.followerIds
            let count3 = await followersIdsCopy.length

            for (let i = 0; i < count3; i++) {
                let id = await followersIdsCopy[i]
                let follow = await this.userService.findUserById(id)
                if (!this.state.currentUser.followers.includes(follow)) {
                    await user.followers.push(follow)
                }
            }

            const updateFollowings = await this.userService.updateUser(user)

            await this.setState({
                currentUser: user,
                update: false
            })
        }
    }

    save = async () => {
        if (await (this.state.password === "" || this.state.firstName === "" ||this.state.lastName === "")) {
            this.setState({
                showErrorAlert: true,
                showAlert: false

            })
        } else {
            await this.setState(prevState => ({
                currentUser: {
                    ...prevState.currentUser,
                    password: this.state.password,
                    phoneNum: this.state.phone,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                }
            }))

            const update = await this.userService.updateUser(this.state.currentUser)

            this.setState({
                showAlert: true,
                showErrorAlert: false
            })

        }
    }

    follow = async (user) => {
        if (!this.state.currentUser.followingIds.includes(user.id)) {
            alert("Follow: " + user.firstName + " " + user.lastName)
            const follow = await this.userService.follow(this.state.currentUser, user)
            const cuser = await this.userService.findUserById(this.state.userId)
            await this.setState({
                currentUser: cuser,
                update: true,
            })
        }
    }

    unFollow = async (user) => {
        alert("Undo Follow: " + user.firstName + " " + user.lastName)
        const unFollow = await this.userService.unFollow(this.state.currentUser, user)
        const cuser = await this.userService.findUserById(this.state.userId)
        await this.setState({
            currentUser: cuser,
            update: true,
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
                              to={this.state.currentUser.type === "viewer" ? `/viewers/${this.state.userId}` : `/admin/${this.state.userId}` }>
                            <i className="fa fa-times"></i>
                            Go back to liked list
                        </Link>

                    </div>
                </div>

                <div className="user-box">
                    <div className="user-form-box">

                        {
                            this.state.showAlert &&
                            <div className={`alert alert-success alert-dismissable`}>
                                <button type="button" className="close" data-dismiss="alert" data-dismiss="alert"
                                        aria-hidden="true" id="alertFld">
                                    x
                                </button>
                                Profile successfully saved
                            </div>
                        }

                        {
                            this.state.showErrorAlert &&
                            <div className={`alert alert-danger alert-dismissable`}>
                                <button type="button" className="close" data-dismiss="alert" data-dismiss="alert"
                                        aria-hidden="true" id="alertFld">
                                    x
                                </button>
                                You cannot have empty filed
                            </div>
                        }



                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                className={`form-control`}
                                placeholder="First Name"
                                type="text"
                                name="firstName"
                                value={this.state.firstName}
                                onChange={e => this.setState({firstName: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                className={`form-control`}
                                placeholder="Last Name"
                                type="text"
                                name="lastName"
                                value={this.state.lastName}
                                onChange={e => this.setState({lastName: e.target.value})}

                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone"> Phone </label>
                            <input
                                className={`form-control`}
                                placeholder="Phone"
                                type="text"
                                name="phone"
                                value={this.state.phone}
                                onChange={e => this.setState({phone: e.target.value})}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email"> Email </label>
                            <input
                                disabled
                                className={`form-control`}
                                placeholder="Email"
                                type="text"
                                name="email"
                                value={this.state.email}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                className={`form-control`}
                                placeholder="New Password"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={e => this.setState({password: e.target.value})}

                            />
                        </div>

                        <ul className="list-group">
                            <li className="list-group-item"><b>Liked Movies:</b>
                                {
                                    this.state.currentUser.likedMovies && this.state.currentUser.likedMovies.map((movie) =>
                                    <div key={movie.imdbID}>
                                        <Link
                                            className={`btn btn-outline-info`}
                                            to={`/viewer/${this.props.match.params.userId}/details/${movie.imdbID}`} id="goToMovie">
                                            {movie.Title}
                                        </Link>
                                    </div>
                                    )
                                }
                            </li>

                            <li className="list-group-item"><b>Following:</b>
                                {
                                    this.state.currentUser.followings &&  this.state.currentUser.followings.map((user) =>
                                        <div className={`row`} key={user.id}>

                                            <div className={`col-6`}>
                                                {user.firstName} {user.lastName}
                                            </div>

                                            <div className={`col-6 row`}>
                                                <button
                                                    className={`col-6 btn btn-outline-danger float-right`}
                                                    onClick={e => this.unFollow(user)}>
                                                    Undo-follow
                                                </button>

                                                <Link
                                                    to={`/user/${this.state.userId}/friendsProfile/${user.id}`}
                                                    className={`col-6 btn btn-outline-info float-right`}>
                                                    profile
                                                </Link>
                                            </div>

                                        </div>
                                    )
                                }
                            </li>

                            <li className="list-group-item"><b>Followers:</b>
                                {
                                    this.state.currentUser.followers &&  this.state.currentUser.followers.map((user) =>
                                        <div className={`row`} key={user.id}>
                                            <div className={`col-6`}>
                                                {user.firstName} {user.lastName}
                                            </div>

                                            <div className={`col-6 row`}>
                                                <div className={`col-6`}>

                                                </div>

                                                <Link
                                                    to={`/user/${this.state.userId}/friendsProfile/${user.id}`}
                                                    className={`col-6 btn btn-outline-info float-right`}>
                                                    profile
                                                </Link>
                                            </div>
                                        </div>


                                    )
                                }
                            </li>

                        </ul>

                        <div className="createAccount">
                            <button type="button" onClick={e => this.save()}> <b> Save </b> </button>
                        </div>
                    </div>
                </div>


                <div className="user-box">
                    <div className="user-form-box">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Account type</th>
                                <th>&nbsp;</th>
                            </tr>
                            </thead>

                            <tbody>
                            {
                                this.state.users && this.state.users.map((user, i) =>

                                    this.state.currentUser.email !== user.email && user.type !== "admin" &&
                                    <tr key={i}>
                                        <td> {user.firstName} </td>
                                        <td> {user.lastName} </td>
                                        <td> {user.type} </td>
                                        {
                                            user.type === "viewer" &&
                                            <td>
                                                <span className="float-right">

                                                    <Link
                                                        to={`/user/${this.state.userId}/friendsProfile/${user.id}`}
                                                        className={`btn btn-outline-info float-right`}>
                                                         profile
                                                    </Link>


                                                    {
                                                        this.state.currentUser.followingIds &&
                                                        !this.state.currentUser.followingIds.includes(user.id) &&
                                                        <button className={`btn btn-outline-success float-right`}
                                                                onClick={e => this.follow(user)}>
                                                            follow
                                                        </button>
                                                    }

                                                    {
                                                        this.state.currentUser.followingIds &&
                                                        this.state.currentUser.followingIds.includes(user.id) &&
                                                        <button
                                                            className={`btn btn-outline-danger float-right`}
                                                            onClick={e => this.unFollow(user)}>
                                                            Undo-follow
                                                        </button>
                                                    }


                                                </span>
                                            </td>
                                        }

                                    </tr>

                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        )
    }
}
