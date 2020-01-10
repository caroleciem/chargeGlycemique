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
  chargeTotale =this.alimentService.chargeTotale;

  alimentListCalc = this.alimentService.alimentListsCalcul;
  alimentList = this.alimentService.alimentLists;
  constructor(private alimentService: AlimentService, private formBuilder: FormBuilder) {
    this.portionForm = this.formBuilder.group({
      alimentPortion: '',
      portion: ''
    });
  }


  ngOnInit() {
    this.calculChargeTotale();
  }
  onSubmit(portionData) {
    // Process checkout data here
    console.warn('Your order has been submitted', portionData);
    if (portionData.alimentPortion != "-----"&&portionData.alimentPortion != "") {
      if (portionData.portion > -1) {
        this.alimentService.calculAliment(portionData);
        this.calculChargeTotale();
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
    this.calculChargeTotale();
  }
  calculChargeTotale(){
    this.chargeTotale=0;  
    for(let i = 0; i< this.alimentService.alimentListsCalcul.length; i++){
      this.chargeTotale= this.chargeTotale+ this.alimentListCalc[i].cg

    }
  }

}
