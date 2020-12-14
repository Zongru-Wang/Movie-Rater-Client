import React from "react";
import {Link} from "react-router-dom";
import "../../styles/RegisterLoginComponent.style.client.css"
import UserService from "../../services/UserService";

export default class LoginComponent extends React.Component {



    constructor(props) {
        super(props);
        this.userService = new UserService()

        this.state = {
            user:{},
            firstName: '',
            lastName: '',
            email:'',
            password:'',
            id:'',
            showErrorAlert: false
        };
    }

    findUserByCredentials = async () => {

        if (await (this.state.email === '' || this.state.password === '')) {
            this.setState({showErrorAlert: true})
        } else {
            const a = await this.userService.findUserByCredentials(this.state.email, this.state.password).catch(err => {return false;})
            if (!a) {
                this.setState({showErrorAlert: true})
            } else {
                let user = await this.userService.findUserByCredentials(this.state.email, this.state.password)
                this.setState({user: user})

                if (user.type === "viewer") {
                    this.props.history.push(`/viewers/${user.id}`)
                } else if (user.type === "admin") {
                    this.props.history.push(`/admins/${user.id}`)
                } else {
                    this.props.history.push(`/search`)
                }
            }
        }

    }



    render() {

        return (
            <div className="box">
                <div className="form-box">
                    <h1 className="boxHeader">Log In</h1>
                    {
                        this.state.showErrorAlert &&
                        <div className={`alert alert-danger alert-dismissable`}>
                            <button type="button" className="close" data-dismiss="alert" data-dismiss="alert"
                                    aria-hidden="true" id="alertFld">
                                x
                            </button>
                            Incorrect email/password
                        </div>
                    }
                    <form >
                        <div className="email">
                            <label htmlFor="email">Email</label>
                            <input
                                placeholder="Email"
                                type="email"
                                name="email"
                                onChange={e => this.setState({email: e.target.value})}
                                value={this.state.email}
                            />

                        </div>
                        <div className="password">
                            <label htmlFor="password">Password</label>
                            <input
                                placeholder="Password"
                                type="password"
                                name="password"
                                onChange={e => this.setState({password: e.target.value})}
                                value={this.state.password}
                            />
                        </div>
                        <div className="createAccount">
                            <button type="button" onClick={() => this.findUserByCredentials()}> <b> Log In </b> </button>
                            <Link to="/search" > Continue as a guest </Link>

                            <h6> By logging in, you agree to the
                                <a href="/privacy" target="_blank"> Privacy Policy </a>
                            </h6>


                            <div className="col-12">
                                <a href="/" id="floatLeft" title="Not available" onClick={()=> alert("Not available")}> Forgot Password </a>
                                <Link to="/register" id="floatRight"> Sign up </Link>
                            </div>


                        </div>

                    </form>
                </div>
            </div>
        )
    }

}
