import * as functions from 'firebase-functions'
import * as express from 'express'
import * as admin from 'firebase-admin'
import * as cors from 'cors'
import * as lodash from 'lodash'

admin.initializeApp(functions.config())
admin.firestore().settings({ timestampsInSnapshots: true })

const app = express()
app.use(cors())

app.get('/', async (req: express.Request, res: express.Response) => {
    const snapshot = await admin.firestore().collection('events').get()
    const result = []
    snapshot.forEach(doc => {
        const data = doc.data()
        data.agenda = lodash.values(data.agenda)
        result.push(data)
    })
    res.send(result)
})

export const event = functions.https.onRequest(app)
