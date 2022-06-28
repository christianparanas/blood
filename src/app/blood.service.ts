import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BloodService {

  donations: any = []

  constructor() { }

  storeDonation(data: any) {
    if (localStorage.getItem('donations') === null) {
      this.donations.push(data);

      localStorage.setItem('donations', JSON.stringify(this.donations));
    } else {
      const res: any = localStorage.getItem('donations');
      let donations = JSON.parse(res);
      localStorage.removeItem('donations');

      donations.push(data);
      localStorage.setItem('donations', JSON.stringify(donations));
    }
  }

  modifyDonationData(data: any) {
    const target = this.donations.find(
      (res: any) => res.id === data.id
    );

    target.bloodType = data.bloodType
    target.qtyBagOfBlood = data.qtyBagOfBlood
    target.donor = data.donor

    localStorage.removeItem('donations');
    this.storeToLocal(this.donations)
  }

  storeToLocal(data: any) {
    localStorage.setItem('donations', JSON.stringify(data));
  }

  getDonations() {
    if (localStorage.getItem('donations') === null) {
      return false;
    }

    const res: any = localStorage.getItem('donations');
    this.donations = JSON.parse(res);
    return this.donations;
  }
}
