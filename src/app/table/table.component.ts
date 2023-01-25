import {Component, Input} from '@angular/core';
import {TableService} from "./table.service";
import {Point} from "../type";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  providers: [ TableService ],
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() items: Array<Point> = [];
}
