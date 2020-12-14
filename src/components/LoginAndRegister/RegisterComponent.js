import React from "react";
import {Link} from "react-router-dom";
import "../../styles/RegisterLoginComponent.style.client.css"
import {SERVER_URL} from "../../constant/common";
import UserService from "../../services/UserService";

export default class RegisterComponent extends React.Component {

    constructor(props) {
        super(props);

        this.userService = new UserService()
        this.state = {
            emails:[],
            users: [],
            user1: {},
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            adminCode:'',
            checked: false,
            showErrorAlert: false,
            showAlert: false
        };
    }

    componentDidMount = async () => {

        let users = await this.userService.findALlUsers()
        let emails = await this.userService.findALlEmails()

        await this.setState({
            users: users,
            emails: emails
        })

    }

    checkEmail = (email) => {
        let count = this.state.emails.length
        this.setState({
            checked: false
        })
        for (let i = 0; i < count; i++) {
            if (this.state.emails[i] === email) {
                this.setState({
                    checked: true
                })
            }
        }
    }

    createUser = async () => {
        if (await (this.state.email !== '' && this.state.password !== '' && this.state.firstName !=='' && this.state.lastName !== '')) {
            const create = await this.userService.creatUser(this.state.firstName,
                this.state.lastName, this.state.email, this.state.password, this.state.adminCode)

            alert("Account successfully created")

            this.setState({
                showAlert: true,
                showErrorAlert: false
            })
            this.props.history.push(`/register`)
        } else {
            alert("You cannot have empty filed")
        }
    }


    render() {

        return (
            <div className="box">
                <div className="form-box">
                    <h1 className="boxHeader">Create Account</h1>

                    {
                        this.state.showAlert &&
                        <div className={`alert alert-success alert-dismissable`}>
                            <button type="button" className="close" data-dismiss="alert" data-dismiss="alert"
                                    aria-hidden="true" id="alertFld">
                                x
                            </button>
                            Account successfully created
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

                    <form >
                        <div className="firstName">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                placeholder="First Name"
                                type="text"
                                name="firstName"
                                onChange={e => this.setState({firstName: e.target.value})}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="lastName">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                placeholder="Last Name"
                                type="text"
                                name="lastName"
                                onChange={e => this.setState({lastName: e.target.value})}
                                value={this.state.lastName}
                            />

                        </div>
                        <div className="email">
                            <label htmlFor="email">Email</label>
                            <input
                                placeholder="Email"
                                type="email"
                                name="email"
                                onChange={e => {this.setState({email: e.target.value}); this.checkEmail(e.target.value)}}
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
                        <div className="adminCode">
                            <label htmlFor="adminCode">Administrator Code</label>
                            <input
                                placeholder="Administrator Code"
                                type="adminCode"
                                name="adminCode"
                                onChange={e => this.setState({adminCode: e.target.value})}
                                value={this.state.adminCode}
                            />
                        </div>

                        {
                            this.state.checked&&
                            <div className="createAccount">
                                <button onClick={() => alert("This email has been registered, please use another one")}>
                                    <b>Create Account</b>
                                </button>

                                <h6> By signing up, you agree to the
                                    <a href="/privacy" target="_blank"> Privacy Policy </a>
                                </h6>

                                <a href="/"> Already Have an Account?</a>
                            </div>
                        }

                        {
                            !this.state.checked &&
                            <div className="createAccount">
                                <button
                                    onClick={() => this.createUser()}>
                                    <b>Create Account</b>
                                </button>

                                <h6> By signing up, you agree to the
                                    <a href="/privacy" target="_blank"> Privacy Policy </a>
                                </h6>

                                <a href="/"> Already Have an Account?</a>
                            </div>
                        }
                    </form>
                </div>
            </div>
        )
    }

}
