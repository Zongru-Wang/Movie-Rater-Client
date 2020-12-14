import {IMDB_URL, SERVER_URL} from "../constant/common";

export default class MovieService {
    findMovieById = async (id) => {
        const response = await fetch(`${IMDB_URL}/?i=${id}&apikey=4a249f8d`)
        return await response.json()
    }

    findMoviesByTitle = async (title) => {
        const response = await fetch(`${IMDB_URL}/?s=${title}&apikey=4a249f8d`)
        return await response.json()
    }
}
