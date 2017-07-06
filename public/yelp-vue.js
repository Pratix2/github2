(function() {
    Vue.component('yelpAPI', {
        data() {
            return {
                clientId: '5garGtD7HPohtZdGDzOxrw',
                clientSecret: 'IAFrhBucb0VGDMQCZp60GFVwlrBu95Rqyyky2jynqPED9cAJUhC4FlHdTViHQA7e',
                clientAccessToken: '',
            }
        },
        template: `
        <div class="container">
            <div class="row">
                <div class="col">
                </div>
            </div>
        </div>
        `,
        mounted() {
            this.fetchYelp()
        },
        methods: {
            fetchYelp() {
                const accessTokenPromise = axios.post("https://api.yelp.com/oauth2/token", querystring.stringify({
                    grant_type: "client_credentials",
                    client_id: this.clientId,
                    client_secret: this.clientSecret,
                }))
                return accessTokenPromise.then(response => {
                    const { access_token, expires_in, token_type } = response.data
                    const queryString = querystring.stringify(query)
                    const searchPromise = axios.get(`https://api.yelp.com/v3/businesses/search?${queryString}`, { headers: { Authorization: `Bearer ${response.data.access_token}` }})
                    return searchPromise 
                }).then(response => response.data)
            }
        }
    })
    var app = new Vue({
        el: "#app",
    })
})