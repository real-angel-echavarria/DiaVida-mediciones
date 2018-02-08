import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampistService } from '../../../core/services/campist.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-campista-food',
  templateUrl: './add-campista-food.component.html',
  styleUrls: ['./add-campista-food.component.scss']
})
export class AddCampistaFoodComponent implements OnInit {
  title: string;
  subtitle: string;
  url = '/';
  nextUrl = 'listado';
  public foodForm: FormGroup;
  camper: any;

  constructor(
    private campistService: CampistService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) {
    this.title = 'Agregar Campista';
    this.subtitle = 'Porción De Alimentos';

    this.createForm();
  }

  createForm() {
    this.foodForm = this.fb.group({
      foodTable: this.fb.group({
        carb: this.fb.group({
          Breakfast: [''],
          Lunch: [''],
          Diner: [''],
          MorningSnack: [''],
          AfternoonSnack: [''],
          BeforeSleep: ['']
        }),
        frut: this.fb.group({
          Breakfast: [''],
          Lunch: [''],
          Diner: [''],
          MorningSnack: [''],
          AfternoonSnack: [''],
          BeforeSleep: ['']
        }),
        prot: this.fb.group({
          Breakfast: [''],
          Lunch: [''],
          Diner: [''],
          MorningSnack: [''],
          AfternoonSnack: [''],
          BeforeSleep: ['']
        }),
        lact: this.fb.group({
          Breakfast: [''],
          Lunch: [''],
          Diner: [''],
          MorningSnack: [''],
          AfternoonSnack: [''],
          BeforeSleep: ['']
        })
      })
    });
  }

  save(event) {
    event.preventDefault();

    const foodTable = JSON.stringify({
      fruta: {
        Breakfast: this.foodForm.value.foodTable.frut.Breakfast,
        MorningSnack: this.foodForm.value.foodTable.frut.MorningSnack,
        Lunch: this.foodForm.value.foodTable.frut.Lunch,
        AfternoonSnack: this.foodForm.value.foodTable.frut.AfternoonSnack,
        Diner: this.foodForm.value.foodTable.frut.Diner,
        BeforeSleep: this.foodForm.value.foodTable.frut.BeforeSleep
      },
      prot: {
        Breakfast: this.foodForm.value.foodTable.prot.Breakfast,
        MorningSnack: this.foodForm.value.foodTable.prot.MorningSnack,
        Lunch: this.foodForm.value.foodTable.prot.Lunch,
        AfternoonSnack: this.foodForm.value.foodTable.prot.AfternoonSnack,
        Diner: this.foodForm.value.foodTable.prot.Diner,
        BeforeSleep: this.foodForm.value.foodTable.prot.BeforeSleep
      },
      carb: {
        Breakfast: this.foodForm.value.foodTable.carb.Breakfast,
        MorningSnack: this.foodForm.value.foodTable.carb.MorningSnack,
        Lunch: this.foodForm.value.foodTable.carb.Lunch,
        AfternoonSnack: this.foodForm.value.foodTable.carb.AfternoonSnack,
        Diner: this.foodForm.value.foodTable.carb.Diner,
        BeforeSleep: this.foodForm.value.foodTable.carb.BeforeSleep
      },
      lact: {
        Breakfast: this.foodForm.value.foodTable.lact.Breakfast,
        MorningSnack: this.foodForm.value.foodTable.lact.MorningSnack,
        Lunch: this.foodForm.value.foodTable.lact.Lunch,
        AfternoonSnack: this.foodForm.value.foodTable.lact.AfternoonSnack,
        Diner: this.foodForm.value.foodTable.lact.Diner,
        BeforeSleep: this.foodForm.value.foodTable.lact.BeforeSleep
      }
    });

    this.camper = {
      ...this.camper,
      foodTable
    };
    this.camper = { ...this.camper };

    // Save the data to database
    const newCamper = this.camper;
    Object.keys(newCamper).forEach(item => {
      if (newCamper[item].includes('{')) {
        newCamper[item] = JSON.parse(newCamper[item]);
      }
    });

    this.campistService.addCampist(newCamper);
    // Navigate to the next view
    this.router.navigate([this.url + this.nextUrl]);
  }

  goBack(event) {
    event.preventDefault();
    this._location.back();
  }

  getCampistToEdit(id) {
    return this.campistService.getSingleCampist(id).subscribe(camper => {
      console.log('CAMPER', camper);
      this.foodForm.patchValue(camper);
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.camper = params;
    });

    if (this.camper.id) {
      this.getCampistToEdit(this.camper.id);
    }
  }
}
