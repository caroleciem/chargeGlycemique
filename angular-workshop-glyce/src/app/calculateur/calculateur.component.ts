import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlimentService } from '../aliment.service';

@Component({
  selector: 'app-calculateur',
  templateUrl: './calculateur.component.html',
  styleUrls: ['./calculateur.component.css']
})
export class CalculateurComponent implements OnInit {
  portionForm;
  chargeTotale = 0;
  alimentListCalc = this.alimentService.alimentListsCalcul;
  alimentList = this.alimentService.alimentLists;
  constructor(private alimentService: AlimentService, private formBuilder: FormBuilder) {
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
    if (portionData.alimentPortion != "-----"&&portionData.alimentPortion != "") {
      if (portionData.portion > -1) {
        this.alimentService.calculAliment(portionData);
        this.chargeTotale = this.chargeTotale + this.alimentService.cgAliment;
        return true;
      }
      else {
        alert("la portion doit être supérieure à 0");
        // et on indique de ne pas envoyer le formulaire
        return false;
      }
    } else {
      alert("un aliment doit être sélectionné");
      // et on indique de ne pas envoyer le formulaire
      return false;

    }
  }
  supprimer(alimentCalcId) {
    this.alimentService.supprimerAlimentCalc(alimentCalcId)
    this.chargeTotale = this.chargeTotale - this.alimentService.cgAlimentSup;
  }

}
