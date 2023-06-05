import axios from "axios";
import { encode } from 'js-base64';

const username = 'rest_maptrak_7283@1142277.com';
const password = 'Yn1jG9Xx';
const FIM_endpoint = 'https://fim.api.us.fleetmatics.com/token';

export async function get_token() {
   try {
        const headers = {
            Authorization: make_authorization_header(username, password),
            Accept: 'text/plain'
        };
        return axios({
            method: 'get',
            url: FIM_endpoint,
            headers
        })
    } catch (error) {
        console.log(error);
    }
}

function make_authorization_header(username, password) {
    //Base64 encode username:password; note: the ':' must be present between them
    const encodedString = encode(`${username}:${password}`);

    //Return concatenated Authorization string
    return `Basic ${encodedString}`;
}