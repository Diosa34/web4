import {Component, EventEmitter, Output} from '@angular/core';
import {SvgService} from "../svg/svg.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  providers: [ SvgService ],
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

  constructor(private svgService: SvgService) {}

  changeR(value: string | undefined, x: boolean | null, y: boolean | null) {
    if (Number(value) > 0 || value == "") {
      // @ts-ignore
      document.getElementById("r-warning").style.display = "none"
      this.changeREvent.emit(value);
    } else {
      // @ts-ignore
      document.getElementById("r-warning").style.display = "inline-block"
    }
    this.checkForSubmit(x, y, value)
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
