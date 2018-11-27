import {submitVenue} from './actions'
import {Venue} from './types'
import firebase from 'firebase'
import {adminUsername, adminPassword, nonAdminUserName, nonAdminPassword} from './sensitivecreds'
import config from '../../firebase/firebaseConfig'

const v : Venue = {
    location: "home",
    eventTime : {start: 2, end: 3},
    registrationLink: "http://www.google.com",
    agenda : {
        description: "Mock description",
        timeSlot: {start: 2, end: 3},
        speaker: {
            name: "Hari",
            twitterId: "hhariri",
            website: "https://hadihariri.com/",
            image: "https://pbs.twimg.com/profile_images/983417164131635200/6ToRcNzM_400x400.jpg"
        }
    }
}

function getDb() {
    let db = firebase.firestore()
    db.settings({ timestampsInSnapshots: true })
    return db;
}

/**
 * Enable this to test ACTUALLY WRITING to PRDOUCTION.
 */
describe.skip("PRODUCTION data altering tests", () => {
    beforeAll(() => firebase.initializeApp(config))

    it('PRODUCTION writes to venue work with authorized users', async () =>{
        expect.assertions(1);
        await firebase.auth().signInWithEmailAndPassword(adminUsername, adminPassword)

        await expect(submitVenue(v, getDb())).not.toBe(null)

        firebase.auth().signOut() // Unless you signout, the connection to firebase will be maintained and the test won't fully exit.
    })

    it('PRODUCTION writes to venue FAIL with non admin users', async () =>{
        expect.assertions(1);
        await firebase.auth().signInWithEmailAndPassword(nonAdminUserName, nonAdminPassword)

        await submitVenue(v, getDb()).catch( e => expect(e.code).toMatch("permission-denied"))


        firebase.auth().signOut() // Unless you signout, the connection to firebase will be maintained and the test won't fully exit.
    })

    it('PRODUCTION writes to venue FAIL with un-authenticated users', async () =>{
        expect.assertions(1);

        await submitVenue(v, getDb()).catch( e => expect(e.code).toMatch("permission-denied"))
    })
})
