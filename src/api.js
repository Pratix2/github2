const axios = require('axios')
const { oxrApiKey } = require("./config")

module.exports = async function getCurrencies() {
    const res = await axios.get(`https://openexchangerates.org/api/latest.json?app_id=${oxrApiKey}`)
    const { data = {} } = res
    const { rates = {} } = data
    return rates
}

// const p = new Promise((resolve, reject) => {
//     const result = 14
//     if (result < 12) {
//         resolve(result)
//     } else {
//         reject(new Error(`Result is greater than 12`))
//     }
// }).then(response => {
//     console.log(response)
//     return new Promise((resolve, reject) => {
//         resolve(10)
//     })
// }).then(response => {
//     console.log(response)
// }).catch(err => {
//     console.error(err)
// })