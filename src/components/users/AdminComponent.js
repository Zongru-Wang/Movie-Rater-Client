import React from "react";
import {Link} from "react-router-dom";
import "../../styles/UserComponents.style.client.css"
import {SERVER_URL} from "../../constant/common";
import MovieService from "../../services/MovieService";
import UserService from "../../services/UserService";

export default class AdminComponent extends React.Component {

    constructor(props) {
        super(props);
        this.movieService = new MovieService();
        this.userService = new UserService()
        this.state = {
            currentUser: {},
            users: [],
            userId: this.props.match.params.userId

        }
    }

    componentDidMount = async () => {
        let users = await this.userService.findALlUsers()
        let user = await this.userService.findUserById(this.state.userId)

        this.setState({
            users: users,
            currentUser: user
        })
    }




    deleteUser = async (id) => {
        alert("Delete successfully")
        let deleter = await this.userService.deleteUser(id)

        this.setState({
            users: [...this.state.users].filter(user => user.id !==id)
        })

    }

    render() {
        return(
            <div>
                <h1 className="header"> User Management </h1>
                <br/>

                <div className="row">

                    <div className="col-md-8">
                         <h1> Login as Admin: {this.state.currentUser.firstName} {this.state.currentUser.lastName}</h1>
                    </div>

                    <div className="col-md-4">

                        <Link className="btn btn-outline-danger large floatRight"
                              to="/">
                            <i className="fa fa-times"></i>
                            Log out
                        </Link>

                    </div>
                </div>

                <div className="user-box">
                <div className="user-form-box">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Password</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Account type</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>

                        <tbody>
                        {
                            this.state.users && this.state.users.map((user, i) =>
                                <tr key={i}>
                                    <td> {user.email} </td>
                                    <td> *** </td>
                                    <td> {user.firstName} </td>
                                    <td> {user.lastName} </td>
                                    <td> {user.type} </td>
                                    {
                                        user.type === "viewer" &&
                                        <td>
                                            <span className="float-right">
                                                <button className="btn btn-danger"
                                                        onClick={()=> this.deleteUser(user.id)}>
                                                    <i className="fa fa-times"></i>
                                                </button>
                                            </span>
                                        </td>
                                    }

                                    {
                                        user.type === "admin" &&
                                        <td>
                                            <span className="float-right">
                                                <button className="btn btn-dark"
                                                        onClick={()=>alert("You cannot delete an admin user")}>
                                                    <i className="fa fa-times"></i>
                                                </button>
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
