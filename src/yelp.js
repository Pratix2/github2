
const yelp = require('yelp-fusion');
const axios = require('axios')
const querystring = require('querystring')

const clientId = '5garGtD7HPohtZdGDzOxrw'
const clientSecret = 'IAFrhBucb0VGDMQCZp60GFVwlrBu95Rqyyky2jynqPED9cAJUhC4FlHdTViHQA7e'

module.exports.fusionQuery = function yelpSearch(query) {
    const accessTokenPromise = yelp.accessToken(clientId, clientSecret)
    return accessTokenPromise.then(response => {
        const client = yelp.client(response.jsonBody.access_token)
        const searchPromise = client.search(query)
        return searchPromise
    }).then(response => {
        const { jsonBody = {} } = response
        const { businesses = [] } = jsonBody
        return businesses
    })
}

module.exports.yelpAPI = function yelpAPI(query) {
    const accessTokenPromise = axios.post("https://api.yelp.com/oauth2/token", querystring.stringify({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
    }))
    return accessTokenPromise.then(response => {
        const { access_token, expires_in, token_type } = response.data
        const queryString = querystring.stringify(query)
        const searchPromise = axios.get(`https://api.yelp.com/v3/businesses/search?${queryString}`, { headers: { Authorization: `Bearer ${response.data.access_token}` }})
        return searchPromise
    }).then(response => response.data)
}