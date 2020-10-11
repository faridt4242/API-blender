const apiIdxReference = ["words", "wikihow", "cat facts", "google translate", "quick easy sms", "sendgrid"]
const apis = [
    {
        name: 'Words',
        id: 0,
        by: 'webknox',
        shortDescription: 'Returns a synonym for a given word.',
        imgUrl: 'https://s3.amazonaws.com/mashape-production-logos/apis/53aa49e0e4b0a705fcc3135a_medium',
        inputs: ['word'],
        run: async (params) => {
            let response = fetch("https://webknox-words.p.rapidapi.com/words/"+ params[0] + "/synonyms", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "webknox-words.p.rapidapi.com",
                    "x-rapidapi-key": "5ada8e3c4fmsh5cf0d87fad9427bp16357bjsn1ec81123bb94"
                }
            })
            let data = await (await response).json()
            return data[getRndInteger(0, data.length)]
        }
    },
    {
        name: 'WikiHow',
        id: 1,
        by: 'hargrimm',
        shortDescription: 'Returns a random step from a range of wikiHow article.',
        imgUrl: 'https://s3.amazonaws.com/mashape-production-logos/apis/556c85bce4b030865222b550_medium',
        inputs: ['count'],
        run: async (params) => {
            let response = fetch("https://hargrimm-wikihow-v1.p.rapidapi.com/steps?count="+ params[0], {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "hargrimm-wikihow-v1.p.rapidapi.com",
                    "x-rapidapi-key": "5ada8e3c4fmsh5cf0d87fad9427bp16357bjsn1ec81123bb94"
                }
            })
            let data = await (await response).json()
            console.log(data)
            return data[1]
        }
    },
    {
        name: "Cat Facts",
        id: 2,
        by: 'brianiswu',
        shortDescription: 'Returns a random fact about our beloved cats.',
        imgUrl: 'https://s3.amazonaws.com/mashape-production-logos/apis/5c4b9ac8e4b062e1a150d711_medium',
        inputs: [],
        run: async (params) => {
            let response = fetch("https://brianiswu-cat-facts-v1.p.rapidapi.com/facts", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "brianiswu-cat-facts-v1.p.rapidapi.com",
                    "x-rapidapi-key": "5ada8e3c4fmsh5cf0d87fad9427bp16357bjsn1ec81123bb94"
                }
            })
            let data = await (await response).json()
            console.log(data)
            return data.all[getRndInteger(0, data.all.length)].text
        }

    },
    {
        name: "Google Translate",
        id: 3,
        by: 'google',
        shortDescription: 'Translates a sentence using google cutting edge technologies.',
        imgUrl: 'https://rapidapi-prod-apis.s3.amazonaws.com/2d83b1a3-9260-48fb-9c98-47584f158a60.png',
        inputs: ['from', 'to', 'text'],
        run: async (params) => {
            let response = fetch("https://google-translate20.p.rapidapi.com/translate?sl=" + params[0] + "&text=" + encodeURI(params[2]) + "&tl=" + params[1], {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "google-translate20.p.rapidapi.com",
                    "x-rapidapi-key": "5ada8e3c4fmsh5cf0d87fad9427bp16357bjsn1ec81123bb94"
                }
            })
            let data = await (await response).json()
            console.log(data)
            return data.data.pairs[0].t
        }

    },
    {
        name: "Quick Easy SMS",
        id: 4,
        by: 'JayemithLLC',
        shortDescription: 'Send SMS over API quickly and easily.',
        imgUrl: 'https://rapidapi-prod-collections.s3.amazonaws.com/7373cb23-491d-475e-a087-e2522a1a338a.png',
        inputs: ['message', 'toNumber'],
        run: async (params) => {
            return ("Attempted to send")
            let response = fetch("https://quick-easy-sms.p.rapidapi.com/send", {
                "method": "POST",
                "headers": {
                    "mode": "no-cors",
                    "x-rapidapi-host": "quick-easy-sms.p.rapidapi.com",
                    "x-rapidapi-key": "5ada8e3c4fmsh5cf0d87fad9427bp16357bjsn1ec81123bb94",
                    "content-type": "application/x-www-form-urlencoded"
                },
                "body": {
                    "message": params[0],
                    "toNumber": params[1]
                }
            })
            let data = await (await response).json()
            console.log(data)
            
        }
    },
    {
        name: "SendGrid",
        id: 5,
        by: 'sendgrid',
        shortDescription: 'Send emails over API quickly and easily.',
        imgUrl: 'https://rapidapi-prod-apis.s3.amazonaws.com/0f/6e4a73e9ca4402a2857f850097d8b1/b1041e5e7273d024c2b4e50ee1f8bad2.png',
        inputs: ['to', 'subject', 'from', 'value'],
        run: async (params) => {
            let response = fetch("https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send", {
                "method": "POST",
                "headers": {
                    "x-rapidapi-host": "rapidprod-sendgrid-v1.p.rapidapi.com",
                    "x-rapidapi-key": "5ada8e3c4fmsh5cf0d87fad9427bp16357bjsn1ec81123bb94",
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                "body": {
                    "personalizations": [
                        {
                            "to": [
                                {
                                    "email": params[0]
                                }
                            ],
                            "subject": params[1]
                        }
                    ],
                    "from": {
                        "email": params[2]
                    },
                    "content": [
                        {
                            "type": "text/plain",
                            "value": params[3]
                        }
                    ]
                }
            })
            let data = await (await response).json()
            console.log(data)
            return ("Attempted to send")
        }
    }
]


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

//todo make a database with stars with comments