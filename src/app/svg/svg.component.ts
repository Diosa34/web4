import {Component, ViewChild} from '@angular/core';
import {Point} from "../type";
import {HttpService} from "../http-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TableComponent} from "../table/table.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss']
})
export class SvgComponent {
  @ViewChild("table") table!: TableComponent;
  point: Point = {
    x: 0,
    y: 0,
    r: 0,
  }

  items: Point[] = [];

  constructor(
    private httpService: HttpService,
    private _snackBar: MatSnackBar,
    private _router: Router,
  ) {
  }

  svgClick(event: MouseEvent) {
    if (!this.point.r) {
      this._snackBar.open("Укажите радиус", 'Закрыть', {
        duration: 3000
      })
      return
    }
    // @ts-ignore
    let svgCoord = document.getElementById("svg").getBoundingClientRect() // DOMRect object

    let xPartOfSvg = (event.clientX - svgCoord.x) / svgCoord.width // координата(в долях) клика относительно размеров svg
    let yPartOfSvg = (event.clientY - svgCoord.y) / svgCoord.height
    this.drawPoint(document.getElementById(this.point.r.toString() + 'dot'), (xPartOfSvg) * 960, (yPartOfSvg) * 960)

    //координаты в системе координат графика(должны быть отправлены на сервер), а не в системе координат пикселей
    // this.point.x = (xPartOfSvg - 0.5) * 12
    // this.point.y = -1 * (yPartOfSvg - 0.5) * 12
    this.point.x = Number(((xPartOfSvg - 0.5) * 12).toFixed(5))
    this.point.y = Number(((-1 * (yPartOfSvg - 0.5) * 12)).toFixed(5))
    this.newPoint(this.point);
  }

  // когда кликают по свг, то точки отрисовываются на свг, но точки из бд отрисовываются в группах, причём при каждой смене радиуса
  drawPoint(svgOrG: EventTarget | null, x: number, y: number, resultFill = 'black') {
    // @ts-ignore
    svgOrG.innerHTML += `<circle cx="${x}" cy="${y}" r='7' fill="${resultFill}"/>`;
  }

  changeArea(radius: number) {
    this.point.r = radius
    for (let i = -4; i < 5; i++) {
      // @ts-ignore
      document.getElementById(this.point.r.toString() + 'dot').innerHTML = '';
      // @ts-ignore
      document.getElementById(i.toString() + 'r').style.display = "none";

    }
    let r = radius;
    this.point.r = r;
    let id: string = radius + "r"
    // @ts-ignore
    document.getElementById(id).style.display = "inline-block";
    this.allPointsRender()
  }

  //заменить на функцию отрисовки всех точек из списка items
  newPoint(point: Point) {
    this.httpService.postData<Point>("/backend/api/points", point, true).subscribe(
      (res) => {
        this.table.getPoints()
        this.allPointsRender()
      }
    )
  }

  allPointsRender(){
    for (let i = 0; i < this.items.length; i++) {
      // @ts-ignore
      if (this.items[i].r == this.point.r) {
        let x = Number(this.items[i].x);
        let y = Number(this.items[i].y);
        if (x <= 960 && y <= 960) {
          this.drawPoint(document.getElementById(this.items[i].r.toString()+"dot"), (x/12 + 0.5) * 960, (y/(-12) + 0.5) * 960, this.items[i].res ? 'green' : 'red')
        }
      }
    }
  }

  deletePoints() {
    if (!this.table.dataSource.data?.length){
      this._snackBar.open("У вас пока нет точек", 'Закрыть', {
        duration: 3000
      })
      return
    }
    this.httpService.deleteData("/backend/api/points", undefined, true).subscribe(
      () => {
        //todo remove all points
        this.table.getPoints();
        this.items = [];
        for (let i = -4; i < 5; i++) {
          // @ts-ignore
          document.getElementById(this.point.r.toString() + 'dot').innerHTML = '';
        }
      }
    )
  }

  logout() {
    localStorage.removeItem("token")
    this._router.navigate(['/login'])
    // this.httpService.postData("backend/api/auth/logout", undefined, true).subscribe()
  }

  redrawPoints(points: Point[]) {
    this.items = points;
  }
}
