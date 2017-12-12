import {
  Component,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import {Sport} from '../../../shared/sports.model';
import {SportsService} from '../../sports.service';

@Component({
  selector: 'app-sports-edit',
  templateUrl: './sports-edit.component.html',
})
export class SportsEditComponent  {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedSport: Sport;

  constructor(private slService: SportsService) {
  }
}

//   ngOnInit() {
//     this.subscription = this.slService.startedEditing
//       .subscribe(
//         (index: number) => {
//           this.editedItemIndex = index;
//           this.editMode = true;
//           this.editedItem = this.slService.getIngredient(index);
//           this.slForm.setValue({
//             name: this.editedItem.name,
//             amount: this.editedItem.amount
//           })
//         }
//       );
//   }
//
//   onSubmit(form: NgForm) {
//     const value = form.value;
//     const newIngredient = new Ingredient(value.name, value.amount);
//     if (this.editMode) {
//       this.slService.updateIngredient(this.editedItemIndex, newIngredient);
//     } else {
//       this.slService.addIngredient(newIngredient);
//     }
//     this.editMode = false;
//     form.reset();
//   }
//
//   onClear() {
//     this.slForm.reset();
//     this.editMode = false;
//   }
//
//   onDelete() {
//     this.slService.deleteIngredient(this.editedItemIndex);
//     this.onClear();
//   }
//
//   ngOnDestroy() {
//     this.subscription.unsubscribe();
//   }
// }
