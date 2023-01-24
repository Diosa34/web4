import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  form: any = {
    x: '',
    y: '',
    r: '',
  }

  @Output() changeREvent = new EventEmitter<string>();
  @Output() submitEvent = new EventEmitter<any>();

  changeR(value: string | undefined, x: boolean | null, y: boolean | null) {
    this.changeREvent.emit(value);
    this.checkForSubmit(x, y, value);
  }

  checkForSubmit(x: boolean | null, y: boolean | null, r: string | undefined){
    if (x && y && Number(r) > 0) {
      // @ts-ignore
      document.getElementById("sbmt").disabled = false;
    } else {
      // @ts-ignore
      document.getElementById("sbmt").disabled = true;
    }
  }

  submit() {
    this.submitEvent.emit(this.form);
  }
}
