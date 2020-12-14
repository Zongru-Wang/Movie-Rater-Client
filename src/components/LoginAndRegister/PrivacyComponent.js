import React from "react";
import {Link} from "react-router-dom";
import "../../styles/RegisterLoginComponent.style.client.css"

export default class PrivacyComponent extends React.Component {

    render() {

        return (
            <div >
                <div className="row">

                    <div className="row ">
                        <ul className="list-group">
                            <li className="list-group-item"><h3>Privacy Policy:</h3>
                                <p>
                                    Our Website is a movie rater website, once users register and log in using their email and password,
                                    they can search movies that they are interested in and click the movies to view the details of the movie,
                                    including the rating, rated, genre, released date … If users log in and think they are interested in the
                                    movie and want to save it to their like list, they can click the like button and their movie will be saved to their like list.
                                    Users can check their profiles to access all the movies they liked.
                                </p>

                                <p>
                                    Users can also follow other users, and once they follow them, they can access others’ profile page which
                                    will show other users' first names, last names, and the movies they liked.
                                </p>

                                <p>
                                    As the description of our website above, we don’t ask for users’ sensitive information at all for now.
                                    When other people follow you, they only access your following/follower list, liked movies, and first and last name.
                                    Besides users’ email and passwords, the potential closest offline also includes their cell-phone numbers, even though
                                    our website doesn’t require users to provide their cell-phone number for login purposes, we still need to keep users’
                                    private information safe from others.
                                </p>

                                <p>
                                    The value of our website is that everyone can use our website as a resource to search the movies they are interested in,
                                    they don’t have to register accounts if they don’t need to save the movies they like or follow other raters to check the
                                    movies from them. We provide a place for raters to communicate with each other and share movies they liked.
                                    Users don’t need to provide any sensitive/private information to use our website. We are responsible to keep user’s
                                    information safe, for now, we are taking care of their email, password, and phone numbers.
                                </p>

                                <p>
                                    As you can see, there is very little data that I absolutely must collect in order for my website function,
                                    but there is a variety of data it would be helpful to have. For example, if I can know the age, gender, location
                                    and/or where they heard of my website from all my users, then I can figure out who my current targeted users are,
                                    and get new ideas on how to attract other kinds of users to use our website. I could allow users to use Facebook,
                                    Instagram or Google accounts to register and log in. Then we can automatically get the info we need to improve our
                                    website. Also, can help users save their time by skipping the process to register.
                                    Also, we can provide suitable ADs to them if we know more information about them so that we can have money to maintain
                                    my website.
                                </p>

                                <p>
                                    If we ask users to provide their age, gender, cell-phone number or link their Facebook, Instagram or Google account
                                    to use our website, then we will be responsible to keep their information safe even if we can sell them to three parties
                                    to make more money. However, we need to import AD services to get money to maintain our website, then it is unavoidable
                                    to expose my users to tracking mechanisms. Especially when they use third party accounts like Facebook to use our website,
                                    then tracking mechanisms will find them fast.
                                </p>

                                <p>
                                    There is no way to avoid that, but we will keep their private information safe, and also before registering,
                                    I will inform all users what information will be exposed to the public if they want to use our services.
                                    When they use their third party account to login, we will let them know which information from the third party
                                    account we will use on our website. Also, we will try to make as much information as optional if users don’t want
                                    to provide. Maybe we will need them all or more in the future to improve and maintain our website, but we will try
                                    our best to keep and respect users’ benefits.
                                </p>
                            </li>

                        </ul>

                    </div>
                </div>

                <br/>

            </div>
        )
    }

}
