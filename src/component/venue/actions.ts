import { Venue } from './types'
const venueTable = "venues"

function submitVenue(venue : Venue, db : firebase.firestore.Firestore) {
    return db.collection(venueTable)
    .add(venue)
}

export { submitVenue }