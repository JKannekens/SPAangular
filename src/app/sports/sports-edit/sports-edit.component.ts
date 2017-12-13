import {
  Component,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import {Sport} from '../../shared/sports.model';
import {SportsService} from '../sports.service';

@Component({
  selector: 'app-sports-edit',
  templateUrl: './sports-edit.component.html',
})
export class SportsEditComponent {
  @ViewChild('f') sportForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedSport: Sport;

  constructor(private sportService: SportsService) {
  }


  ngOnInit() {
    this.subscription = this.sportService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedSport = this.sportService.getSport(index);
          this.sportForm.setValue({
            name: this.editedSport.name,
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newSport = new Sport(value.name);
    if (this.editMode) {
      this.sportService.updateSport(this.editedItemIndex, newSport);
    } else {
      this.sportService.addSport(newSport);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.sportForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.sportService.deleteSport(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
