import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DonorService } from '../donor.service';
import { BloodService } from '../blood.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  donorForm: FormGroup;
  donationForm: FormGroup

  donorModal: boolean = false
  donorIndicator: boolean = false

  donationModal: boolean = false
  donationIndicator: boolean = false

  donors: any = []
  donations: any = []

  constructor(private authService: AuthService, private donorService: DonorService, private bloodService: BloodService) {
    this.donorForm = new FormGroup({
      id: new FormControl(Math.random().toString(36).slice(2, 8), Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });

    this.donationForm = new FormGroup({
      id: new FormControl(Math.random().toString(36).slice(2, 8), Validators.required),
      bloodType: new FormControl('', Validators.required),
      qtyBagOfBlood: new FormControl(null, Validators.required),
      donor: new FormControl('', Validators.required),
      date: new FormControl(new Date().toLocaleString('en-US', { timeZone: 'UTC' }), Validators.required),
    });

    this.getDonors()
    this.getDonations()
   }

   getDonors() {
    this.donors = this.donorService.getDonors()
   }

   getDonations() {
    this.donations = this.bloodService.getDonations()
   }

   openCloseDonorModal() {
    this.donorModal = !this.donorModal
   }

   openCloseDonationModal() {
    this.donationModal = !this.donationModal
   }

   onDonorEditSubmit() {
    if (this.donorForm.status == 'INVALID') {
      return;
    }

    this.donorService.storeDonor(this.donorForm.value);

    this.getDonors()
    this.donorModal = false;
   }

   editDonorData(data: any) {
    const { id, name, email } = data;

    this.donorIndicator = true
    this.donorModal = true;

    this.donorForm.setValue({
      id,
      name, 
      email
    });
  }

  editDonationData(data: any) {
    const { id, bloodType, qtyBagOfBlood, donor, date } = data;

    this.donationIndicator = true

    this.donationForm.setValue({
      id,
      bloodType, 
      qtyBagOfBlood,
      donor, 
      date
    });

    this.donationModal = true;
  }

  deleteDonation(data: any) {
    const donations = this.donations.filter((res: any) => {
      return res.id !== data.id;
    });

    this.bloodService.storeToLocal(donations)
    this.getDonations();
  }

  deleteDonor(data: any) {
    const donors = this.donors.filter((res: any) => {
      return res.id !== data.id;
    });

    this.donorService.storeToLocal(donors)
    this.getDonors();
  }

   onDonorSubmit() {
    if (this.donorForm.status == 'INVALID') {
      return;
    }

    if(this.donorIndicator == true) {
      this.donorService.modifyDonorData(this.donorForm.value);
    }
    else {
      this.donorService.storeDonor(this.donorForm.value);
    }

    this.getDonors()
    this.donorModal = false;
    this.donorIndicator = false
    this.donorForm.reset()
   }

   onDonationSubmit() {
    if (this.donationForm.status == 'INVALID') {
      return;
    }

    if(this.donationIndicator == true) {
      this.bloodService.modifyDonationData(this.donationForm.value);
    }
    else {
      this.bloodService.storeDonation(this.donationForm.value);
    }

    this.getDonations()
    this.donationModal = false;
    this.donationIndicator = false
    this.donationForm.reset()
   }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
  }

}
