import axios from 'axios'

const instance = axios.create({
    baseURL:'https://us-central1-clone-816a9.cloudfunctions.net/api', //the API (cloud function ) URL
    //mode: 'cors'
})

export default instance

//http://127.0.0.1:5001/clone-816a9/us-central1/api
//localhost endpoint ^^^^
//https://clone-816a9.web.app/ 
//FRONTEND HOSTING WORKING WEBSITE!!! ^^^^^^