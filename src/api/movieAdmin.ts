import axiosClient from '../utils/axiosClient';
import { LOCALHOST, PORT } from '../../port';
const MovieAdmin_URL = `http://${LOCALHOST}:${PORT}/movie`;

// see category
export const apiGetCategory = async () => {
    const url = `${MovieAdmin_URL}/category`
    const data = axiosClient.post(url).then((response) => {
        return response.data
    }).catch((eroor) => {
        console.log(eroor);
        
    })
    return data ?? {}
}

// add Movie
export const apiPostMovie = async (args: {
    movieId: string, 
    movieName: string,
    duration: number,
    censorship: number, 
    language: string, 
    release: string, 
    expiration: string,
    poster: string, 
    description: string
    categoryId: Array<any>[]
}) => {
    const url = `${MovieAdmin_URL}/add-movie`
    const form = JSON.stringify({
        Movie_Id : args.movieId,
        Movie_Name : args.movieName,
        Duration : args.duration,
        Censorship : args.censorship,
        Language : args.language,
        Release : args.release,
        Expiration : args.expiration,
        Description : args.description,
        Poster : args.poster,

        Category_Id: args.categoryId


    })
    const data = axiosClient.post(url, form).
    then((response) => {return response.data}).
    catch((error) => {
        console.log(error);
        
    })
    return data ?? {}
}
// edit Movie 
export const apiPutEditMovie = async (args: {
    movieId: string, 
    movieName: string,
    duration: number,
    censorship: number, 
    language: string, 
    release: string, 
    expiration: string,
    poster: string, 
    description: string
    categoryId: Array<any>[]
}) => {
    const url = `${MovieAdmin_URL}/put-movie`
    const form = JSON.stringify({
        Movie_Id : args.movieId,
        Movie_Name : args.movieName,
        Duration : args.duration,
        Censorship : args.censorship,
        Language : args.language,
        Release : args.release,
        Expiration : args.expiration,
        Description : args.description,
        Poster : args.poster,

        Category_Id: args.categoryId


    })
    const data = axiosClient.put(url, form).
    then((response) => {return response.data}).
    catch((error) => {
        console.log(error);
        
    })
    return data ?? {}
}


// create category
export const apiPostAddCategory = async(args: {
    categoryId : string,
    categoryName : string
}): Promise<{ status: string; data: any; msg: string }> => {
    const url = `${MovieAdmin_URL}/add-category`
    const form = JSON.stringify({
        Category_Id: args.categoryId,
        Category_Name: args.categoryName
    })
    const data = axiosClient.post(url, form).then((response) => {
        return response.data
    }).catch((error) => {
        console.log(error);
        
    })
    return data ?? {}

}