import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm  } from "@angular/forms";
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-warrants',
  templateUrl: './warrants.component.html',
  styleUrls: ['./warrants.component.sass']
})
export class WarrantsComponent implements OnInit {

  isLinear = false;
  firstBuyWarrantForm: FormGroup;
  secondBuyWarrantForm: FormGroup;
  thirdBuyWarrantForm: FormGroup;
  firstReflationRightForm: FormGroup;
  secondReflationRightForm: FormGroup;
  thirdReflationRightForm: FormGroup;

  // Slide toggle
  color: ThemePalette = 'primary';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstBuyWarrantForm = this.formBuilder.group({
      buyPar: ['']
    });
    this.secondBuyWarrantForm = this.formBuilder.group({
      debitCard: [''],
      bankApp: ['']
    });
    this.thirdBuyWarrantForm = this.formBuilder.group({
      selCard: [''],
      cvv: [''],
      amount: ['']
    });
    this.firstReflationRightForm = this.formBuilder.group({
      reflationProfile: [''],
      refBalance: [''],
      muchBuy: [''],
      cashRequired: ['']
    });
    this.secondReflationRightForm = this.formBuilder.group({
      debitCard: [''],
      bankApp: ['']
    });
    this.thirdReflationRightForm = this.formBuilder.group({
      selCard: [''],
      cvv: [''],
      amount: ['']
    });
  }

}
