(function() {
    Vue.component('my-form', {
        data() {
            return {
                input: ``,
                oxrApiKey: 'ba1d5af91cd14973b707b940f060113f',
                error: null,
                rates: {},
                dollars: 0,
                converted: {},
            }
        },
        template: `
            <div class="container">
                <div class="row">
                    <div class="py-3 col">
                        <form @submit.prevent="onConvert">
                            <div class="input-group">
                                <div class="input-group-addon">
                                    $
                                </div>
                                <input type="number" v-model.number="dollars" class="form-control">
                                <div class="input-group-btn">
                                    <button type="submit" class="btn btn-secondary">
                                        Convert
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th
                                Currency Code
                            </th>
                            <th>
                                Rate
                            </th>
                            <th>
                                Converted
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <<tr v-for="(value, key) in rates" :key="key">
                            <td>{{ key }}</td>
                            <td>{{ value }}</td>
                            <td>{{ converted[key] }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `,
        mounted() {
            this.fetchRates()
        },
        methods: {
            onConvert() {
                const dollars = this.dollars
                const converted = {}
                Object.keys(this.rates).forEach(key => {
                    converted[key] = (this.rates[key] * dollars).toFixed(2)
                })
                this.converted = converted
            },
            fetchRates() {
                axios.get(`https://openexchangerates.org/api/latest.json?app_id=${this.oxrApiKey}`)
                    .then(res => {
                        const { data = {} } = res
                        const { rates = {} } = data
                        this.rates = rates
                        this.onConvert()
                    })
                    .catch(err => {
                        this.error = err
                    })
            }
        },
    })
    var app = new Vue({
        el: '#app',
    })
})()