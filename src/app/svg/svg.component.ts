import {Component, ViewChild} from '@angular/core';
import {Point} from "../type";
import {HttpService} from "../http-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TableComponent} from "../table/table.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  // providers: [ SvgService ],
  styleUrls: ['./svg.component.scss']
})
export class SvgComponent {
  @ViewChild("table") table!: TableComponent;
  point: Point = {
    x: 0,
    y: 0,
    r: 0,
  }

  items: Array<Point> = [];

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
    let svgCoord = event.target.getBoundingClientRect() // DOMRect object

    let xPartOfSvg = (event.clientX - svgCoord.x) / svgCoord.width // координата(в долях) клика относительно размеров svg
    let yPartOfSvg = (event.clientY - svgCoord.y) / svgCoord.height
    this.drawPoint(event.target, (xPartOfSvg) * 960, (yPartOfSvg) * 960)

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
      document.getElementById(i.toString() + 'r').innerHTML = '';
    }
    let r = radius;
    this.point.r = r;
    let areaFill: Number = 810 - r
    let id: string = radius + "r"
    // @ts-ignore
    document.getElementById(id).innerHTML += `<path id="path${r}"
              d="M 480 480
              L ${480 - 80 * r} 480
              L 480 ${480 - 80 * r}
              L 480 ${480 - 40 * r}
              L ${480 + 80 * r} ${480 - 40 * r}
              L ${480 + 80 * r} 480
              L 480 480
              L 480 ${480 + 40 * r}
              A ${40 * r} ${40 * r} 0 0 1 ${480 - 40 * r} 480
              L 480 480" stroke="black" fill="#fc${areaFill}f""/>`;
  }

  //заменить на функцию отрисовки всех точек из списка items
  newPoint(point: Point) {
    this.httpService.postData<Point>("/backend/api/points", point, true).subscribe(
      (res: Point) => {
        this.table.getPoints();
      }
    )
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
        this.table.getPoints();
      }
    )
  }

  logout() {
    localStorage.removeItem("token")
    this._router.navigate(['/login'])
    // this.httpService.postData("backend/api/auth/logout", undefined, true).subscribe()
  }
}
