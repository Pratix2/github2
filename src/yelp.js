const yelp = require('yelp-fusion');

const clientId = '5garGtD7HPohtZdGDzOxrw'
const clientSecret = 'IAFrhBucb0VGDMQCZp60GFVwlrBu95Rqyyky2jynqPED9cAJUhC4FlHdTViHQA7e'

module.exports = function yelpSearch(query) {
    const accessTokenPromise = yelp.accessToken(clientId, clientSecret)
    return accessTokenPromise.then(response => {
        const client = yelp.client(response.jsonBody.access_token);
        const searchPromise = client.search(query)
        return searchPromise
    }).then(response => {
        const { jsonBody = {} } = response
        const { businesses = [] } = jsonBody
        return businesses
    })
}