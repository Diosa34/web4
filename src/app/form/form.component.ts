import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Point} from "../type";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @Output() public changeREvent = new EventEmitter<number>();
  @Output() public submitEvent = new EventEmitter<Point>();

  public form = new FormGroup({
    x: new FormControl(null, Validators.required),
    y: new FormControl(null, Validators.compose([
      Validators.required,
      Validators.max(2.999999999),
      Validators.min(-2.999999999),
      Validators.maxLength(10)
    ])),
    r: new FormControl(null, Validators.required)
  })


  xControl = () => this.form.controls.x;
  yControl = () => this.form.controls.y;
  rControl = () => this.form.controls.r;

  changeR() {
    this.changeREvent.emit(this.rControl().value as unknown as number);
  }

  submit() {
    this.submitEvent.emit(this.form.getRawValue() as unknown as Point);
  }

}
