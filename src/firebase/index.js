import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import moment from 'moment'
import config from './firebaseConfig'

class Firebase {

    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }
        this.auth = firebase.auth()
        this.storage = firebase.storage()
        this.db = firebase.firestore()
        const settings = { timestampsInSnapshots: true }
        this.db.settings(settings)
    }

    login = (username, password) => {
        return this.auth.signInWithEmailAndPassword(username, password)
    }

    uploadPicture = (folderName, file) => {
        const { type: mime } = file
        const type = mime.split('/')[1]
        const path = `${folderName}/${moment().valueOf()}.${type}`
        const ref = this.storage.ref()
        return ref.child(path).put(file).then(snapshot => snapshot.ref.getDownloadURL())
    }

    createEvent = (event) => this.db.collection('events').add(event)

    signOut = () => {
        return this.auth.signOut()
    }
}
const instance = new Firebase()

export default instance