import { Component, OnInit } from '@angular/core';
import { AlimentService } from '../aliment.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-aliment-list',
  templateUrl: './aliment-list.component.html',
  styleUrls: ['./aliment-list.component.css']
})
export class AlimentListComponent implements OnInit {
  alimentList = this.alimentService.alimentLists.sort(this.tri);
  alimentForm;
  trierForm;
  ChargeTotale = this.alimentService.chargeTotale;


  constructor(private alimentService: AlimentService, private formBuilder: FormBuilder) {
    this.alimentForm = this.formBuilder.group({
      name: '',
      ig: '',
      carbs: ''
    });
    // this.trierForm = this.formBuilder.group({
    //   tritype: '',
    // });

  }
  ngOnInit() {

  }

  onSubmit(alimentData) {
    console.log(alimentData.ig);
    if ((alimentData.ig > -1) && (alimentData.ig < 201)) {
      if ((alimentData.carbs > -1) && (alimentData.carbs < 101)) {
        console.warn('Your order has been submitted', alimentData);
        this.alimentService.addAliment(alimentData);
        this.alimentForm.reset();
        return true;
      } else {
        alert("proportion de glucides doit etre saisi entre 0 et 100");
        // et on indique de ne pas envoyer le formulaire
        return false;
      }
    }
    else {
      // sinon on affiche un message
      alert("IG doit etre saisi entre 0 et 200");
      // et on indique de ne pas envoyer le formulaire
      return false;
    }

  }
  onSelect(tritype){
    console.log(tritype)
    if (tritype == "nom") {
      this.alimentList = this.alimentService.alimentLists.sort(this.tri);
    } else if (tritype == "index") {
      this.alimentList = this.alimentService.alimentLists.sort(this.triindex);

    } else if (tritype == "proportion") {
      this.alimentList = this.alimentService.alimentLists.sort(this.tripropor);
    }
  }
  supprimer(alimentId) {
    this.alimentService.supprimerAliment(alimentId);
  }
  tri(a, b) {
    if (a.name < b.name) return -1;
    else if (a.name == b.name) return 0;
    else return 1;
  }
  triindex(a, b) {
    if (a.ig < b.ig) return -1;
    else if (a.ig == b.ig) return 0;
    else return 1;
  }
  tripropor(a, b) {
    if (a.carbs < b.carbs) return -1;
    else if (a.carbs == b.carbs) return 0;
    else return 1;
  }




}
