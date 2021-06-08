require('dotenv').config()
const { zappp } = require('./zap')
const Twitter = require('twitter')
const client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

async function main() {
  client.stream('statuses/filter', { track: process.env.botMention }, function(stream) {
    stream.on('data', onData)
    stream.on('error', onError)
    stream.on('end', onEnd)
  })
  return
}

async function onData(tweet) {
  if (tweet.in_reply_to_status_id) {
    await client.get('statuses/lookup', { id: tweet.in_reply_to_status_id_str, tweet_mode: 'extended' }, async (err,tweetOrig) => {
      if (err) {
        return console.error(err)
      }

      const originalText = (tweetOrig[0].full_text || tweetOrig[0].text).replace(new RegExp(/(?<=^|\s)(@[\w.]+)(?<!\.) /gi), '')
      await tweetar({
        status: `@${tweet.user.screen_name} ${zappp(originalText)}`.substring(0,279),
        in_reply_to_status_id: tweet.id_str
      })
    })
  } else {
    await tweetar({
      status: `@${tweet.user.screen_name} Me mencione 😎😘😏😎😻 em resposta 😉👉👌😎😻😋 a um tweet 🙊😎😏👉👌😎 e veja 😼😉 a mágica 😜😋 acontecer 😼😎`,
      in_reply_to_status_id: tweet.id_str
    })
  }
}

function onError(data) {
  console.error('[BOT] Algo de ruim aconteceu!')
  console.error(data)
}

function onEnd(data) {
  console.log('[BOT] Finalizado! Vamos iniciar novamente já já!')
  setTimeout(() => {
    console.log('[BOT] Tentando novamente...')
    main()
  }, 5*1000)
}

async function tweetar(params) {
  try {
    const replyRequest = await client.post(`statuses/update.json`, params)
    console.log('Acabei de tweetar algo! (' + replyRequest.text + ')')
  } catch (error) {
    console.error('[ERRO] Erro ao tentar tweetar!')
    console.error(error)
  }
}

console.log('[BOT] Iniciando...')
try {
  main()
} catch (err) {
  console.error('[ERRO] Erro geral', err)
}
//.then(() => console.log('[BOT] Finalizado'))
