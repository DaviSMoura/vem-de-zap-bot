require('dotenv').config()
const { zappp } = require('./zap')
const Twitter = require('twitter')
const axios = require('axios')
const client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

//Bearer headers
const headers = {
  'Authorization': 'Bearer ' + process.env.TWITTER_BEARER_TOKEN
}

async function main() {
  const { data } = await axios.get(`https://api.twitter.com/2/users/${process.env.ACCOUNT_ID}/mentions`, { headers })

  if (data.meta.result_count > 0) {
    for (const tweet of data.data) {
      const tweetOrig = await axios.get(`https://api.twitter.com/2/tweets/${tweet.id}?expansions=referenced_tweets.id,author_id`, { headers })
      const authorInfo = await axios.get(`https://api.twitter.com/2/users/${tweetOrig.data.data.author_id}`, { headers })
      const authorUsername = authorInfo.data.data.username
      if (tweetOrig.data.data.referenced_tweets) {
        const referencedTweets = tweetOrig.data.data.referenced_tweets
        const lastTweetObj = referencedTweets[referencedTweets.length - 1]
        const lastTweet = await axios.get(`https://api.twitter.com/2/tweets/${lastTweetObj.id}`, { headers })
        const lastTweetData = lastTweet.data.data
        
        await tweetar({
          status: '@' + authorUsername + ' ' + zappp(lastTweetData.text),
          in_reply_to_status_id: tweet.id
        })
      } else {
        await tweetar({
          status: '@' + authorUsername + ' ' + 'Me mencione respondendo algum tweet para funcionar!',
          in_reply_to_status_id: tweet.id
        })
      }
    }
  } else {
    console.log('Não tem nenhuma menção.')
  }
}

async function tweetar(params) {
  const replyRequest = await client.post(`statuses/update.json`, params)
  console.log('Acabei de tweetar algo! (' + replyRequest.text + ')')
}

console.log('[BOT] Iniciando...')
main().catch(err => {
  console.log(err.response ? err.response.data : err || err)
}).then(() => console.log('[BOT] Finalizado'))
