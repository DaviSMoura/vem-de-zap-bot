require('dotenv').config()
const axios = require('axios')
const { zappp } = require('./zap')

async function main() {
  const { data } = await axios.get('https://api.twitter.com/2/users/2244994945/mentions', {
    headers: {
      'Authorization': 'Bearer ' + process.env.TWITTER_BEARER_TOKEN
    }
  })
  for (const tweet of data.data) {
    console.log(zappp(tweet.text) + "\n")
  }
}

main()