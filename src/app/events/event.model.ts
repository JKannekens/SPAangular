import {Participant} from '../shared/participant.model';

export class Event {
  public _id: string;
  public organizerName: string;
  public eventName: string;
  public date: string;
  public sport: string;
  public sportcomplexName: string;
  public sportcomplexHall: string;
  public participants: Participant[];


  constructor(organizerName: string, eventName: string, date: string, sport: string, sportcomplexName: string, sportcomplexHall: string, participants: Participant[]) {
    this.organizerName = organizerName;
    this.eventName = eventName;
    this.date = date;
    this.sport = sport;
    this.sportcomplexName = sportcomplexName;
    this.sportcomplexHall = sportcomplexHall;
    this.participants = participants;
  }
}

