import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import {SportcomplexService} from '../sportcomplex.service';


@Component({
  selector: 'app-sportcomplex-edit',
  templateUrl: './sportcomplex-edit.component.html',
  // styleUrls: ['./recsportcomplexipe-edit.component.css']
})
export class SportcomplexEditComponent implements OnInit {
  id: number;
  editMode = false;
  sportcomplexForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private sportcomplexService: SportcomplexService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    if (this.editMode) {
      this.sportcomplexService.updateSportComplex(this.id, this.sportcomplexForm.value);
    } else {
      this.sportcomplexService.addSportComplex(this.sportcomplexForm.value);
    }
    this.onCancel();
  }

  onAddHall() {
    (<FormArray>this.sportcomplexForm.get('halls')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'capacity': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteHall(index: number) {
    (<FormArray>this.sportcomplexForm.get('halls')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let sportcomplexName = '';
    let sportcomplexAddress = '';
    let sportcomplexHousenumber: number;
    let sportcomplexPostalCode = '';
    let sportcomplexEmail = '';
    let sportcomplexPhoneNumber = '';
    let sportcomplexHalls = new FormArray([]);

    if (this.editMode) {
      const sportcomplex = this.sportcomplexService.getSportcomplex(this.id);
      sportcomplexName = sportcomplex.name;
      sportcomplexAddress = sportcomplex.address;
      sportcomplexHousenumber = sportcomplex.houseNumber;
      sportcomplexPostalCode = sportcomplex.postalCode;
      sportcomplexEmail = sportcomplex.email;
      sportcomplexPhoneNumber = sportcomplex.phoneNumber;
      if (sportcomplex['halls']) {
        for (let hall of sportcomplex.halls) {
          sportcomplexHalls.push(
            new FormGroup({
              'name': new FormControl(hall.name, Validators.required),
              'capacity': new FormControl(hall.capacity, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.sportcomplexForm = new FormGroup({
      'name': new FormControl(sportcomplexName, Validators.required),
      'address': new FormControl(sportcomplexAddress, Validators.required),
      'houseNumber': new FormControl(sportcomplexHousenumber, Validators.required),
      'postalCode': new FormControl(sportcomplexPostalCode, Validators.required),
      'email': new FormControl(sportcomplexEmail, Validators.required),
      'phoneNumber': new FormControl(sportcomplexPhoneNumber, Validators.required),
      'halls': sportcomplexHalls
    });
  }

}
