import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Point} from "../type";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @Output() public changeREvent = new EventEmitter<number>();
  @Output() public submitEvent = new EventEmitter<Point>();
  @Output() public deletePoints = new EventEmitter();

  public form = new FormGroup({
    x: new FormControl(null, Validators.required),
    y: new FormControl(null, Validators.compose([
      Validators.required,
      Validators.max(3),
      Validators.min(-3)
    ])),
    r: new FormControl(null, Validators.required)
  })

  constructor(private dialog: MatDialog) {
  }

  xControl = () => this.form.controls.x;
  yControl = () => this.form.controls.y;
  rControl = () => this.form.controls.r;

  changeR() {
    this.changeREvent.emit(this.rControl().value as unknown as number);
  }

  submit() {
    this.submitEvent.emit(this.form.getRawValue() as unknown as Point);
  }

  delete() {
    this.dialog.open(DialogComponent).afterClosed().subscribe(result => {
      if (!result) return;

      this.deletePoints.emit();
    });
  }
}
