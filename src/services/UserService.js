import {IMDB_URL, SERVER_URL} from "../constant/common";

export default class UserService {
    findUserById = async (id) => {
        const response = await fetch(`${SERVER_URL}/users/${id}`)
        return await response.json()
    }

    updateUser = async (user) => {
        const response = await fetch(`${SERVER_URL}/users/${user.id}`, {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        })
        return await response.json()
    }

    creatUser = async  (firstName, lastName, email, password, adminCode) => {
        const response = await fetch(`${SERVER_URL}/create`, {
            method: 'POST',
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                type: adminCode==="CS4550"? "admin": "viewer"
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
        return await response.json()

    }


    findALlUsers = async () => {
        const response = await fetch(`${SERVER_URL}/users`)
        return await response.json()
    }

    findALlEmails = async () => {
        const response = await fetch(`${SERVER_URL}/emails`)
        return await response.json()
    }

    follow = async (currentUser, user) => {
        const response = await fetch(`${SERVER_URL}/users/${currentUser.id}/follow/${user.id}`, {
            method: 'POST'
        })
        return await response.json()
    }

    unFollow = async (currentUser, user) => {
        const response = await fetch(`${SERVER_URL}/users/${currentUser.id}/unFollow/${user.id}`, {
            method: 'DELETE'
        })
        return await response.json()
    }

    findUserByCredentials = async (email, password) => {
        const response = await fetch(`${SERVER_URL}/credentials/${email}/${password}`)
        return await response.json()
    }

    likes = async (userId, imdbID) => {
        const response = await fetch(`${SERVER_URL}/users/${userId}/likes/${imdbID}`, {
            method: 'POST'
        })
        return await response.json()
    }

    unlikes = async (userId, imdbID) => {
        const response = await fetch(`${SERVER_URL}/users/${userId}/unlikes/${imdbID}`, {
            method: 'DELETE'
        })
        return await response.json()
    }

    deleteUser = async (userId) => {
        const response = await fetch(`${SERVER_URL}/delete/${userId}`, {
            method: 'DELETE'
        })
        return await response.json()
    }

}
