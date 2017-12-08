import {Hall} from '../shared/hall.model';

export class Sportcomplex {
  public name: string;
  public address: string;
  public houseNumber: number;
  public postalCode: string;
  public email: string;
  public phoneNumber: string;
  public halls: Hall[];

  constructor(name: string, address: string, houseNumber: number, postalCode: string, email: string, phoneNumber: string, halls: Hall[]) {
    this.name = name;
    this.address = address;
    this.houseNumber = houseNumber;
    this.postalCode = postalCode;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.halls = halls;
  }
}

