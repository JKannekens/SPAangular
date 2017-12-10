import {Participant} from '../shared/participant.model';

export class Event {
  public _id: string;
  public organizerName: string;
  public eventName: string;
  public date: Date;
  public sportcomplexName: string;
  public sportcomplexHall: string;
  public participants: Participant[];


  constructor(organizerName: string, eventName: string, date: Date, sportcomplexName: string, sportcomplexHall: string, participants: Participant[]) {
    this.organizerName = organizerName;
    this.eventName = eventName;
    this.date = date;
    this.sportcomplexName = sportcomplexName;
    this.sportcomplexHall = sportcomplexHall;
    this.participants = participants;
  }
}

