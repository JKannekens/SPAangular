import {Hall} from '../shared/hall.model';

export interface Sportcomplex {
  _id: string;
  name: string;
  address: string;
  houseNumber: number;
  postalCode: string;
  email: string;
  phoneNumber: string;
  halls: Hall[];

  // constructor(name: string, address: string, houseNumber: number, postalCode: string, email: string, phoneNumber: string, halls: Hall[]) {
  //   this.name = name;
  //   this.address = address;
  //   this.houseNumber = houseNumber;
  //   this.postalCode = postalCode;
  //   this.email = email;
  //   this.phoneNumber = phoneNumber;
  //   this.halls = halls;
  // }
}

