export interface EventTime {
    start : number,
    end: number,
}

export interface Speaker {
    name : string,
    twitterId? : string,
    image? : string,
    website?: string,
}

export interface Agenda {
    description : string,
    timeSlot : EventTime,
    speaker : Speaker,
}

export interface Venue {
    location : string,
    eventTime : EventTime,
    registrationLink : string,
    agenda : Agenda,
}
