import {Component, Input} from '@angular/core';
import {TableService} from "./table.service";
import {SvgService} from "../svg/svg.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  providers: [ TableService ],
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() items = [];

  constructor(private tableService: TableService) {}

  ngOnInit() {
    // this.items = this.tableService.getAllPoints().subscribe(results => this.items = results.body.json);
  }
}
