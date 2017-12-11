import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import {EventService} from '../event.service';
import {SportcomplexService} from '../../sportcomplexes/sportcomplex.service';
import {Sportcomplex} from '../../sportcomplexes/sportcomplex.model';


@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
})
export class EventEditComponent implements OnInit {
  private subscription: Subscription;
  id: number;
  editMode = false;
  eventForm: FormGroup;
  sportcomplexes: Sportcomplex[];

  constructor(private route: ActivatedRoute,
              private eventService: EventService,
              private router: Router,
              private sportcomplexSerivce: SportcomplexService) {
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

    this.sportcomplexSerivce.getSportcomplexes()
      .then(sportcomplexes => this.sportcomplexes = sportcomplexes)
      .catch(error => console.log(error));
    this.subscription = this.sportcomplexSerivce.sportcomplexesChanged
      .subscribe(
        (sportcomplexes: Sportcomplex[]) => {
          this.sportcomplexes = sportcomplexes;
        }
      );
  }

  onSubmit() {
    if (this.editMode) {
      this.eventService.updateEvent(this.id, this.eventForm.value);
    } else {
      this.eventService.addEvent(this.eventForm.value);
    }
    this.onCancel();
  }

  onAddParticipant() {
    (<FormArray>this.eventForm.get('participants')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'email': new FormControl(null, Validators.required),
        'phoneNumber': new FormControl(null)
      })
    );
  }

  onDeleteParticipant(index: number) {
    (<FormArray>this.eventForm.get('participants')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let organizerName = '';
    let eventName = '';
    let date: Date;
    let sportcomplexName = '';
    let sportcomplexHall = '';
    let participants = new FormArray([]);

    if (this.editMode) {
      const event = this.eventService.getEvent(this.id);
      organizerName = event.organizerName;
      eventName = event.eventName;
      date = event.date;
      sportcomplexName = event.sportcomplexName;
      sportcomplexHall = event.sportcomplexHall;
      if (event['participants']) {
        for (let participant of event.participants) {
          participants.push(
            new FormGroup({
              'name': new FormControl(participant.name, Validators.required),
              'email': new FormControl(participant.email, Validators.required),
              'phoneNumber': new FormControl(participant.phoneNumber)
            })
          );
        }
      }
    }

    this.eventForm = new FormGroup({
      'organizerName': new FormControl(organizerName, Validators.required),
      'eventName': new FormControl(eventName, Validators.required),
      'date': new FormControl(date, Validators.required),
      'sportcomplexName': new FormControl(sportcomplexName, Validators.required),
      'sportcomplexHall': new FormControl(sportcomplexHall, Validators.required),
      'participants': participants
    });
  }

}
