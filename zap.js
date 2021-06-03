const removeAccent = str => {
	let accentMap 	= {
		a: /[\xE0-\xE6]/g,
		e: /[\xE8-\xEB]/g,
		i: /[\xEC-\xEF]/g,
		o: /[\xF2-\xF6]/g,
		u: /[\xF9-\xFC]/g,
		c: /\xE7/g,
		n: /\xF1/g
	}

	for (let letter in accentMap) {
		str = str.replace(accentMap[letter], letter)
	}

  return str
}

const hasAccent = str => {
	let accentMap 	= {
		a: /[\xE0-\xE6]/g,
		e: /[\xE8-\xEB]/g,
		i: /[\xEC-\xEF]/g,
		o: /[\xF2-\xF6]/g,
		u: /[\xF9-\xFC]/g,
		c: /\xE7/g,
		n: /\xF1/g
	}

	for (let letter in accentMap) {
		if (str.match(accentMap[letter])) {
			return true
		}
	}

	return false
}

const cleanToken = text => text.replace(/[[\]{}()*+!%@?.,"'\\^$|#\s]/g, "")

const choices = (arr, n) => {
  let choices = []

  n = Math.min(n, arr.length+1)
  for (let i = 0; i < n; i++) {
    choices.push(arr[Math.floor(Math.random() * arr.length)])
  }

  return choices
}

const emojiParseRegEx = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g

const emojiParseRegEx_NotGlobal = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/


const discardTokens = [ 
  "ainda",
  "antes",
  "apenas",
  "apesar",
  "assim",
  "ate",
  "cada",
  "como",
  "conforme",
  "consoante",
  "contudo",
  "depois",
  "desde",
  "ele",
  "ela",
  "embora",
  "enquanto",
  "entanto",
  "entao",
  "entretanto",
  "essa",
  "esse",
  "isso",
  "logo",
  "mal",
  "mas",
  "mesmo",
  "modo",
  "nem",
  "obstante",
  "ora",
  "para",
  "pois",
  "por",
  "porem",
  "porque",
  "portanto",
  "posto",
  "qual",
  "quando",
  "quanto",
  "que",
  "salvo",
  "sem",
  "também",
  "todavia",
]

const matchTokens = {
  accentMatch: {
    "abençoado": ["🙏"],
    "bebê": ["👶", "😍", "😂", "😜", "💘"],
    "benção": ["🙏"],
    "calça": ["👖"],
    "calças": ["👖"],
    "força": ["💪"],
    "louça": ["🍽"],
  },
  fullMatch: {
    "100": ["💯"],
    "alface": ["🥗"],
    "alo": ["📱", "📞"],
    "alou": ["📱", "📞"],
    "alvo": ["🎯"],
    "amo": ["😍", "😻", "😘", "😗", "😙", "😚", "💘", "❤", "💓", "💕", "💖", "💖"],
    "amor": ["😍", "😻", "😘", "😗", "😙", "😚", "💘", "❤", "💓", "💕", "💖", "💖"],
    "anel": ["💍"],
    "ap": ["🏢"],
    "ape": ["🏢"],
    "apice": ["🔝", "🏔", "⛰", "🗻"],
    "arma": ["🔫", "🔪", "💣💥"],
    "avalanche": ["🏔", "❄", "☃"],
    "banda": ["🎷", "🎸", "🎹", "🎺", "🎻", "🥁", "🎼", "🎵", "🎶", "🎤"],
    "bandas": ["🎷", "🎸", "🎹", "🎺", "🎻", "🥁", "🎼", "🎵", "🎶", "🎤"],
    "banheira": ["🛁"],
    "banheiro": ["🚽"],
    "banho": ["🚿", "🛁", "🧖‍♂️", "🧖‍♀️"],
    "bar": ["🍺", "🍻", "🥃", "🍾", "🤮"],
    "beber": ["🍺", "🍻", "🥃", "🍾", "🤮"],
    "bebida": ["🍺", "🍻", "🥃", "🍾", "🤮"],
    "bem": ["☺"],
    "bj": ["💋"],
    "bjs": ["💋💋"],
    "boa": ["🤙"],
    "bolsa": ["👜", "👝"],
    "bone": ["🧢"],
    "bravo": ["😤", "😤💦", "😖", "🙁", "😩", "😦", "😡", "🤬", "💣", "💢", "✋🛑", "☠"],
    "bumbum": ["😮", "😏"],
    "carro": ["🚐", "🚗"],
    "casa": ["😋", "🏘", "🏠"],
    "casal": ["💑"],
    "casar": ["🤵👰"],
    "caso": ["💑"],
    "celular": ["📱"],
    "cerebro": ["🧠", "💭"],
    "cima": ["🆙"],
    "chama": ["📞", "☎"],
    "chef": ["👨‍🍳", "👩‍🍳"],
    "ciencia": ["👩‍🔬", "👨‍🔬", "⚗", "🔬", "🔭", "📡"],
    "classe": ["📚", "📘"],
    "come":["🍴"],
    "comer":["🍴"],
    "consciencia": ["🧠", "💭"],
    "copa": ["🏆"],
    "coracao": ["💘	", "❤", "💓", "💕", "💖", "💖"],
    "corra": ["🏃"],
    "corre": ["🏃"],
    "dado": ["🎲"],
    "data": ["📅", "🗓"],
    "demais": ["💯"],
    "dificil": ["😖", "😞"],
    "dinheiro": ["💳", "💵", "💰", "💲"],
    "duro": ["⛰"],
    "embuste": ["😭", "🤢", "💥", "😘", "😜"],
    "escola": ["👨‍🎓", "👩‍🎓", "📚", "📘", "🏫"],
    "et": ["👽", "🛸"],
    "ets": ["👽", "🛸"],
    "faculdade": ["👨‍🎓", "👩‍🎓", "📚", "📘"],
    "feio": ["😛"],
    "feia": ["😛"],
    "feriado": ["📅"],
    "foguete": ["🚀"],
    "fora": ["👉"],
    "fim": ["🙅‍♂️", "🙅‍♀️"],
    "frase": ["✏", "✒", "🖋", "📝"],
    "hoje": ["📅"],
    "já": ["⏰"],
    "internet": ["🌐", "📶"],
    "ksa": ["🏘", "🏠"],
    "linda": ["👩"],
    "lua": ["🌕", "🌙", "🌚"],
    "madame": ["🌹"],
    "mais": ["➕"],
    "mapa": ["🗺"],
    "marcial": ["💪"],
    "marciais": ["💪"],
    "mensagem": ["✍", "💬"],
    "mente": ["🧠", "💭"],
    "mil": ["💯💯"],
    "misseis": ["🚀"],
    "missil": ["🚀"],
    "moca": ["🌹"],
    "monst": ["💪"],
    "mundo": ["🌍"],
    "nada": ["😮"],
    "nao": ["⛔", "🚫", "🛑", "✋", "✋🛑", "⚠", "❌", "✖"],
    "oculos": ["👓", "🕶"],
    "oi": ["😏", "😉"],
    "ok": ["👌", "🆗"],
    "papo": ["💬"],
    "parabens": ["🎈", "🎉", "🎊", "👏", "🎂", "🎁"],
    "parem":["🤚"],
    "paz": ["🧘", "🙏"],
    "pc": ["💻", "🖥", "🖱⌨", "💾", "👨‍💻", "👩‍💻"],
    "planeta": ["🌍"],
    "preco": ["💳", "💵", "💰", "💲"],
    "presente": ["🎁"],
    "quer": ["😏"],
    "raio": ["⚡"],
    "ri": ["😅", "😂", "🤣"],
    "rir": ["😅", "😂", "🤣"],
    "risada": ["😅", "😂", "🤣"],
    "riso": ["😅", "😂", "🤣"],
    "rola": ["😒", "😝", "👉👌"],
    "sai": ["🚫", "⛔"],
    "saliente": ["😋"],
    "secreto": ["🕵️‍"],
    "sera": ["🤨", "🤔", "🧐"],
    "sexo": ["😆", "👉👌"],
    "sideral": ["🚀", "🛰", "🛸"],
    "soco": ["🥊"],
    "sol": ["🌅", "☀", "🌞"],
    "sono": ["💤"],
    "sos": ["🆘"],
    "susto": ["😱", "🎃"],
    "terra": ["🌍"],
    "tesao": ["🌚"],
    "tirar": ["🙅‍♂️", "🙅‍♀️"],
    "tiro": ["🔫"],
    "topo": ["🔝", "🏔", "⛰", "🗻"],
    "vai": ["🏃", "🏃‍♀️"],
    "ve": ["👀", "👁"],
    "vem": ["🚐", "🏎"],
    "ver": ["👀👀", "👀"],
    "voce": ["👉"],
    "whats": ["📞", "♣", "📱"],
    "whatsapp": ["📞", "♣", "📱"],
    "zip": ["📞", "♣", "📱"],
    "zop": ["📞", "♣", "📱"],
    "zumbi": ["🧟‍♂️", "🧟‍♀️"],
    /* Abreviações/Girias */
    "aff": ["🙄"],
    "bb": ["👶", "😍", "😂", "😜", "💘"],
    "broder": ["👊"],
    "brother": ["👊"],
    "carai": ["😜", "😩", "😖", "☹", "😛", "😏", "😞"],
    "caraio": ["😜", "😩", "😖", "☹", "😛", "😏", "😞"],
    "caralho": ["😜", "😩", "😖", "☹", "😛", "😏", "😞"],
    "crush": ["😍", "😻", "😘", "😗", "😙", "😚", "💘", "❤", "💓", "💕", "💖", "💖"],
    "cu":["👌", "💩"],
    "cuzao":["💩", "🖕"],
    "cuzinho":["👌", "💩"],
    "escroto": ["👺", "👹", "👿"],
    "hj": ["📅"],
    "lol": ["😅", "😂", "🤣"],
    "mano": ["👊"],
    "mlk": ["👊"],
    "mozao": ["💘", "❤", "💓", "💕", "💖", "💖"],
    "msg": ["✍", "💬"],
    "nene": ["👶", "😍", "😂", "😜", "💘"],
    "oloco ":["😛","😮","😱"],
    "parça":["😀"],
    "pau": ["🍆💦"],
    "pinto": ["🍆💦"],
    "pintudo": ["🍆💦"],
    "top": ["😂👌", "👌", "🔝", "🤩"],
    "topper": ["😂👌", "👌", "🔝", "🤩"],
    "topperson": ["😂👌", "👌", "🔝", "😛", "🤩"],
    "tv": ["📺"],
    "uau": ["😋"],
    "wow": ["😋"],
    "zica ":["😎"],
    "zika ":["😎"],
    /* Comidas */
    "abacate": ["🥑"],
    "amendoim": ["🥜"],
    "bacon": ["🥓"],
    "batata": ["🍟", "🥔"],
    "berinjela": ["🍆"],
    "biscoito": ["🍪"],
    "bolacha": ["🍪"],
    "brocolis": ["🥦"],
    "carne": ["🍖", "🍗", "🥩"],
    "castanha": ["🌰"],
    "cenoura": ["🥕"],
    "cogumelo": ["🍄"],
    "croissant": ["🥐"],
    "doce": ["🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🥧", "🍫", "🍬", "🍭", "🍮", "🍯"],
    "ovo": ["🥚", "🍳"],
    "peixe": ["🐟", "🐠"],
    "pepino": ["🥒"],
    "pizza": ["🍕"],
    "pretzel": ["🥨"],
    "salada": ["🥗"],
    "sanduiche": ["🥪"],
    "sushi": ["🍣", "🍙", "🍱", "🍘"],
    "trato": ["🤝"],
    /* Empresas */
    "aliexpress": ["🇨🇳"],
    "donalds": ["🍔🍟"],
    "mcdonalds": ["🍔🍟"],
    "nasa": ["🚀", "🛰"],
    "sedex": ["📦", "📬"],
    /* Esportes */
    "basquete": ["🏀"],
    "boliche": ["🎳"],
    "fut": ["⚽", "🏟"],
    "futebol": ["⚽", "🏟"],
    "nfl": ["🏉"],
    "volei": ["🏐"],
    /* Feriados */
    "pascoa": ["🐰", "🐇🥚"],
    /* Signos */
    "aries": ["♈"],
    "touro": ["♉"],
    "gemeos": ["♊"],
    "cancer": ["♋"],
    "leao": ["♌"],
    "virgem": ["♍"],
    "libra": ["♎"],
    "escorpiao": ["♏"],
    "sagitario": ["♐"],
    "capricornio": ["♑"],
    "aquario": ["♒"],
    "peixes": ["♓"],
    /* Personagens */
    "bolsonaro": ["🚫🏳️‍🌈", "🔫"],
    "doria":["💩"],
    "cristo": ["✝", "👼", "😇", "🙏", "🙏🙏"],
    "jesus": ["✝", "👼", "😇", "🙏", "🙏🙏"],
    "lula": ["💰", "🏢", "🦑"],
    "mario": ["🍄"],
    "neymar": ["😍"],
    "noel": ["🎅"],
    "pablo": ["👩", "🏳️‍🌈👩"],
    "pabblo": ["👩", "🏳️‍🌈👩"],
    "pabbllo": ["👩", "🏳️‍🌈👩"],
    "pabllo": ["👩", "🏳️‍🌈👩"],
    "temer": ["🧛‍♂️", "🚫"],
    "vittar": ["👩", "🏳️‍🌈👩"],
    /* Tempo */
    "dia": ["🌄", "🌅"],
    "neve": ["❄", "☃"],
    /* Times */
    "corinthians": ["⚽", "🏟"],
    "palmeiras": ["⚽", "🏟"],
    /* Videogames */
    "lolzinho": ["🕹"],
    "game": ["🎮"],
    "gamer": ["🎮"],
    "games": ["🎮"],
  },
  partialMatch: {
    any: {
      "brasil": ["🇧🇷"],
      "cabel": ["💇‍♂️", "💇‍♀️"],
      "chocolat": ["🍫"],
      "deus": ["✝", "👼", "😇", "🙏", "🙏🙏"],
      "doid": ["🤪"],
      "fome":["🍴"],
      "fuma": ["🚬", "🚭"],
      "kk": ["😅", "😂", "🤣", "👅"],
      "paix": ["💘	", "❤", "💓", "💕", "💖", "💖"],
      "piment": ["🌶"],
      "mort": ["☠", "💀", "⚰", "👻"],
      "zap": ["📞", "♣", "📱"],
      /* Tempo */
      "frio": ["❄", "☃"],
      "gelo": ["❄", "☃"],
      "inferno": ["🔥", "🌡"],
      "quent": ["🔥", "🌡"],
    },
    prefix: {
      "abrac": ["🤗"],
      "alema": ["🇩🇪"],
      "alun": ["👨‍🎓", "👩‍🎓"],
      "anjo": ["😇"],
      "armad": ["🔫", "🔪", "💣💥"],
      "arte": ["🖌"],
      "assust": ["😱", "🎃"],
      "ataq": ["💣", "🔫"],
      "atenc": ["👀", "📢"],
      "avia": ["✈", "🛩", "🛫", "🚁", "🚀"],
      "beij": ["💋"],
      "bombom": ["🍬"],
      "bunda": ["😮", "😏"],
      "calad": ["🤐"],
      "camisa": ["👕", "👔"],
      "camiseta": ["👕"],
      "casad": ["💏", "👩‍❤️‍💋‍👨", "👨‍❤️‍💋‍👨"],
      "chave": ["🔑", "🗝"],
      "cheir": ["👃"],
      "combat": ["💣", "🔫", "🎖", "💪"],
      "comid":["🍴"],
      "comil":["🍴"],
      "compra": ["💳", "💵", "💰", "💲"],
      "computa": ["💻", "🖥", "🖱⌨", "💾", "👨‍💻", "👩‍💻"],
      "comunis": ["🇷🇺"],
      "combin": ["🤝"],
      "condec": ["🎖"],
      "conhec": ["🧠", "💭"],
      "content": ["😀", "😁", "😃", "😄", "😊", "🙂", "☺"],
      "coroa": ["👑"],
      "correr": ["🏃"],
      "corrid": ["🏃"],
      "danca": ["💃", "🕺"],
      "dance": ["💃", "🕺"],
      "delici": ["😋"],
      "desculpa": ["😅"],
      "docei": ["🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🥧", "🍫", "🍬", "🍭", "🍮", "🍯"],
      "doen": ["😷", "🤒", "🤕", "🤢", "🤮", "🤧"],
      "enjo": ["🤢", "🤮"],
      "espant": ["😱"],
      "espia": ["🕵️‍"],
      "espio": ["🕵️‍"],
      "estud": ["📚", "📘", "🖋", "📝"],
      "europ": ["🇪🇺"],
      "exercito": ["🎖"],
      "fala": ["🗣"],
      "familia": ["👨‍👩‍👧‍👦"],
      "fantasm": ["👻"],
      "fascis": ["🗡"],
      "feli": ["😀", "😁", "😃", "😄", "😊", "🙂", "☺"],
      "fest": ["🎆", "🎇", "✨", "🎈", "🎉", "🎊"],
      "flor":["🌹"],
      "foga": ["🔥"],
      "fogo": ["🔥"],
      "fogu": ["🔥"],
      "gat": ["😏", "👌", "😽","😻"],
      "gay": ["🏳️‍🌈"],
      "globo": ["🔮", "🌍"],
      "goz": ["💦"],
      "gostos": ["😈", "😜"],
      "govern": ["⚖"],
      "grand": ["😮"],
      "guerr": ["💣", "🔫", "🎖"],
      "hora": ["⌚", "⏲", "🕛"],
      "hospita": ["👨‍⚕️", "⚕", "🚑"],
      "imediat": ["⌚", "⏳", "🕛"],
      "investig": ["🕵️‍"],
      "investim": ["💳", "💵", "💰", "💲"],
      "justic": ["⚖", "👨‍⚖️"],
      "lok": ["🤪", "😩", "😢", "😰"],
      "louc": ["🤪", "😩"],
      "louv": ["👼", "😇", "🙏", "🙏🙏"],
      "luva": ["🧤"],
      "mao": ["🖐", "🖐"],
      "maneir": ["🔝"],
      "mentir": ["🤥", "🤫"],
      "militar": ["🎖"],
      "miste": ["🕵️‍"],
      "monitor": ["🖥"],
      "morre": ["☠", "💀", "⚰", "👻"],
      "morri": ["☠", "💀", "⚰", "👻"],
      "musica": ["🎷", "🎸", "🎹", "🎺", "🎻", "🥁", "🎼", "🎵", "🎶", "🎤"],
      "nacao": ["🇧🇷"],
      "nacional": ["🇧🇷"],
      "olh": ["👀"],
      "ouv": ["👂"],
      "palavr": ["✏", "✒", "🖋", "📝", "💬"],
      "palhac": ["🤡"],
      "palma": ["👏"],
      "paulista": ["🏳", "🌈"],
      "patet": ["😣"],
      "patriot": ["🇧🇷"],
      "pens": ["🧠", "💭"],
      "pesa": ["🏋"],
      "pipo": ["🍿"],
      "pistol": ["🔫"],
      "princesa": ["👸"],
      "principe": ["🤴"],
      "pula": ["🏃"],
      "pule": ["🏃"],
      "querid": ["☺", "🤗"],
      "quiet": ["🤐"],
      "rainha": ["👸"],
      "raiv": ["⚡", "😤","😤💦","😖","🙁","😩","😦","😡","🤬","💣","💢","✋🛑","☠"],
      "rock": ["🤟"],
      "safad":["😉"],
      "sapato": ["👞", "👟"],
      "saudade":["😢"],
      "segred": ["🕵️‍"],
      "site": ["🌐"],
      "sumid": ["😍"],
      "surpre": ["😮"],
      "tecno": ["💻", "🖥", "🖱⌨", "💾", "👨‍💻", "👩‍💻"],
      "telefo": ["📱", "📞", "☎"],
      "telev": ["📺"],
      "tenis": ["👟"],
      "text": ["✏", "✒", "🖋", "📝", "💬"],
      "toma": ["🍺", "🍻"],
      "transa": ["👉👌"],
      "transe": ["👉👌"],
      "trist": ["☹", "🙁", "😖", "😞", "😟", "😢", "😭", "😭", "😭", "😩", "😿"],
      "vergonh": ["😳"],
      "vist": ["👀"],
      "voa": ["✈", "🛩", "🛫", "🚁", "🚀"],
      "whisk": ["🥃"],
      /* Abreviações/Girias */
      "bost": ["💩"],
      "bucet": ["😜", "😘"],
      "fod": ["👉👌", "🔞"],
      "fud": ["👉👌", "🔞"],
      "haha": ["😅", "😂", "🤣", "👅"],
      "hehe": ["😉","😎","😋", "😏","😜","😈", "🙊","😼"],
      "mackenz": ["🐴"],
      "merd": ["💩"],
      "nude": ["🙊", "😼", "😏"],
      "print": ["📱"],
      "put": ["😤", "😤💦", "😖", "🙁", "😩", "😦", "😡", "🤬", "💣", "💢", "✋🛑", "☠"],
      "vampir": ["🦇"],
      "xavos": ["😼", "😏"],
      /* Animais */
      "bambi": ["🏳️‍🌈"],
      "cachorr": ["🐶", "🐕", "🐩"],
      "caval": ["🐴", "🐎"],
      "morceg":["🦇"],
      /* Comidas */
      "cervej": ["🍺", "🍻"],
      "churras": ["🍖", "🍗", "🥩"],
      "hamburger": ["🍔"],
      "hamburguer": ["🍔"],
      "pao": ["🍞", "🥖"],
      "panqueca": ["🥞"],
      "milh": ["🌽"],
      /* Personagens */
      "bolsol": ["🚫🏳️‍🌈", "🔫"],
      "bolsom": ["🚫🏳️‍🌈", "🔫"],
      "bolson": ["🚫🏳️‍🌈", "🔫"],
      /* Profissões */
      "advo": ["👨‍⚖️", "👩‍⚖️", "⚖"],
      "astronaut": ["👨‍🚀", "👩‍🚀"],
      "bombeir": ["👩‍🚒", "👨‍🚒"],
      "cienti": ["👩‍🔬", "👨‍🔬", "⚗", "🔬", "🔭", "📡"],
      "cozinh": ["👨‍🍳", "👩‍🍳"],
      "juiz": ["👨‍⚖️", "👩‍⚖️", "⚖"],
      "medic": ["👨‍⚕️", "👩‍⚕️", "⚕"],
      "pilot": ["👨‍✈️", "👩‍✈️"], 
      "policia": ["🚨", "🚔", "🚓", "👮‍♂️", "👮‍♀️", "🔫"],
      "professor": ["👨‍🏫", "👩‍🏫"],
      /* Signos */
      "arian": ["♈"],
      "taurin": ["♉"],
      "geminian": ["♊"],
      "cancerian": ["♋"],
      "leonin": ["♌"],
      "virginian": ["♍"],
      "librian": ["♎"],
      "escorpian": ["♏"],
      "sagitario": ["♐"],
      "capricornian": ["♑"],
      "aquarian": ["♒"],
      "piscian": ["♓"],
      /* Tempo */
      "chov": ["⛈", "🌦", "🌧", "☔", "☂"],
      "chuv": ["⛈", "🌦", "🌧", "☔", "☂"],
      "estrel": ["⭐", "🌠", "🌟"],
      "neva": ["❄"],
      "noit": ["🌃", "🌉"],
      "temperatura": ["🌡"],
      "trov": ["🌩"],
    },
  },
}

const moodEmojis = {
  "angry": ["😤","😤💦","😖","🙁","😩","😦","😡","🤬","💣","💢","✋🛑","☠"],
  "happy": ["😀","😁","😂","😃","😄","😅","😆","😉","😊","😋","😎","☺","😛","😜","😝","👌"],
  "sad": ["☹","🙁","😖","😞","😟","😢","😭","😭","😭","😩","😿"],
  "sassy": ["😉","😎","😋","😘","😏","😜","😈","😻","🙊","👉👌","😼"],
  "sick": ["😷","🤒","🤕","🤢","🤮","🤧"],
}



const isInvalidToken = token => {
  return discardTokens.join(" ").match(token) || token.match(emojiParseRegEx)
}

const fullMatchToken = token => Object.keys(matchTokens.fullMatch).includes(token)

const fullAccentMatchToken = token => hasAccent(token) && Object.keys(matchTokens.accentMatch).includes(token)

const getTokenMatch = (isFullMatch, isFullAccentMatch, token) => {
  if (isFullAccentMatch) {
    return matchaccentMatch[token]
  } else {
    token = removeAccent(token)
  }

  if (isFullMatch) {
    return matchTokens.fullMatch[token]
  }

  let match

  const any = matchTokens.partialMatch.any
  const matchesAny = Object.keys(any).some(t => {
    if (new RegExp(`\\w*${t}\\w*`, "iu").test(token)) {
      match = t
      return true
    }
  })

  if (matchesAny) {
    return any[match]
  } 

  const prefix = matchTokens.partialMatch.prefix
  const matchesPrefix = Object.keys(prefix).some(t => {
    if (new RegExp(`^${t}\\w*`, "iu").test(token)) {
      match = t
      return true
    }
  })

  if (matchesPrefix) {
    return prefix[match]
  }

  return false
}

const zapinate = ({ zap, mood = "sassy", rate = 0.5, strength = 5, toUpper = false }) => {
  if (Number.isInteger(strength)) {
    strength = strength > 5 ? 5 : strength
    strength = [Math.floor(strength/2), strength]
  } else {
    strength = [1, 3]
  }

  let zapinated = ""

  zap.split("\n").forEach(line => {
    line.replace(/\s+/g, " ").split(" ").forEach(token => {
      const originalToken = token
      token = cleanToken(token.toLowerCase())

      const isFullAccentMatch = fullAccentMatchToken(token)
      const isFullMatch = !isFullAccentMatch && fullMatchToken(removeAccent(token))

      if (!isFullMatch && !isFullAccentMatch && (token.length <= 2 || isInvalidToken(token))) {
        zapinated += `${originalToken} `
        return
      }

      /* if (Math.random() < rate) { */
        let zapStrength = strength[Math.round(Math.random())]
        let possibleEmojis = getTokenMatch(isFullMatch, isFullAccentMatch, token) || moodEmojis[mood]
        let chosenEmojis = choices(possibleEmojis, zapStrength)
        zapinated += `${originalToken} ${chosenEmojis.join("")} `
      /* } else {
        zapinated += `${originalToken} `
      } */
    })
    zapinated += "\n"
  })

  if (toUpper) {
    zapinated = zapinated.toUpperCase()
  }

  return zapinated.trim()
}

function zappp(oq) {
let params = {};
Object.assign(params, { zap: oq })
return zapinate(params);
}
//console.log(zappp("alo alo marcianos"));

module.exports = {
	zappp
}
