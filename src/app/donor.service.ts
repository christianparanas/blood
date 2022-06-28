import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DonorService {

  donors: any = []

  constructor() { }

  storeDonor(data: any) {
    if (localStorage.getItem('donors') === null) {
      this.donors.push(data);

      localStorage.setItem('donors', JSON.stringify(this.donors));
    } else {
      const res: any = localStorage.getItem('donors');
      let donors = JSON.parse(res);
      localStorage.removeItem('donors');

      donors.push(data);
      localStorage.setItem('donors', JSON.stringify(donors));
    }
  }

  modifyDonorData(data: any) {
    const target = this.donors.find(
      (res: any) => res.id === data.id
    );

    target.name = data.name
    target.email = data.email

    localStorage.removeItem('donors');
    this.storeToLocal(this.donors)
  }

  storeToLocal(data: any) {
    localStorage.setItem('donors', JSON.stringify(data));
  }

  getDonors() {
    if (localStorage.getItem('donors') === null) {
      return false;
    }

    const res: any = localStorage.getItem('donors');
    this.donors = JSON.parse(res);
    return this.donors;
  }
}
