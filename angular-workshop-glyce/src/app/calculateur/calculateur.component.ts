import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {AlimentService} from '../aliment.service';

@Component({
  selector: 'app-calculateur',
  templateUrl: './calculateur.component.html',
  styleUrls: ['./calculateur.component.css']
})
export class CalculateurComponent implements OnInit {
  portionForm;
  chargeTotale =0;
  alimentListCalc = this.alimentService.alimentListsCalcul  ;
  alimentList = this.alimentService.alimentLists ;
  constructor(private alimentService : AlimentService,private formBuilder: FormBuilder) {
    this.portionForm = this.formBuilder.group({
      alimentPortion: '',
      portion: ''
    });
   }
  

  ngOnInit() {
  }
  onSubmit(portionData) {
    // Process checkout data here
    console.warn('Your order has been submitted', portionData);
    this.alimentService.calculAliment(portionData);
    this.chargeTotale =this.chargeTotale+this.alimentService.cgAliment;
    //this.portionForm.reset();
  }
  supprimer(alimentCalcId) {
    this.alimentService.supprimerAlimentCalc(alimentCalcId)
     this.chargeTotale =this.chargeTotale-this.alimentService.cgAliment;
  }

}
