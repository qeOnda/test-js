const axios = require('axios').default;

const url = "http://ambush-api.inyourarea.co.uk/ambush/intercept";
 
const body = {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
};
    
export function apiGetter() {    
    return axios.post(url, body)
}



