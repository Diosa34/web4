import { Component } from '@angular/core';
import {Point} from "../type";
import {HttpService} from "../http-service.service";

@Component({
    selector: 'app-svg',
  templateUrl: './svg.component.html',
  // providers: [ SvgService ],
  styleUrls: ['./svg.component.css']
})
export class SvgComponent {
  point: Point = {
    x: 0,
    y: 0,
    r: 0,
  }

  items: Array<Point> = [];

  constructor(private httpService: HttpService) {}

  svgClick(event: MouseEvent) {
    // @ts-ignore
    let svgCoord = event.target.getBoundingClientRect() // DOMRect object

    let xPartOfSvg = (event.clientX - svgCoord.x)/svgCoord.width // координата(в долях) клика относительно размеров svg
    let yPartOfSvg = (event.clientY - svgCoord.y)/svgCoord.height
    this.drawPoint(event.target, (xPartOfSvg) * 960, (yPartOfSvg) * 960)

    //координаты в системе координат графика(должны быть отправлены на сервер), а не в системе координат пикселей
    this.point.x = (xPartOfSvg - 0.5) * 12
    this.point.y = -1 * (yPartOfSvg - 0.5) * 12
    this.newPoint(this.point);
  }

  // когда кликают по свг, то точки отрисовываются на свг, но точки из бд отрисовываются в группах, причём при каждой смене радиуса
  drawPoint(svgOrG: EventTarget | null, x: number, y: number, resultFill = 'black'){
    // @ts-ignore
    svgOrG.innerHTML += `<circle cx="${x}" cy="${y}" r='7' fill="${resultFill}"/>`;
  }

  changeArea(radius: number) {
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
              L ${480-80*r} 480
              L 480 ${480-80*r}
              L 480 ${480-40*r}
              L ${480+80*r} ${480-40*r}
              L ${480+80*r} 480
              L 480 480
              L 480 ${480+40*r}
              A ${40*r} ${40*r} 0 0 1 ${480-40*r} 480
              L 480 480" stroke="black" fill="#fc${areaFill}f""/>`;
  }

  //заменить на функцию отрисовки всех точек из списка items
  newPoint(point: Point) {
    console.log(sessionStorage)
    this.httpService.postData<Point>( "/backend/api/points", true, point).subscribe(
      (res: Point) => {
        // @ts-ignore
        if (res.status === 200) {
          this.items.push(res)
          console.log(this.items)
        }
        this.drawPointsFromDB()
      }
    )
  }

  drawPointsFromDB() {
    for (let i = 1; i < this.items.length; i++) {
      let x = this.items[i].x;
      let y = this.items[i].y;
      if (x <= 960 && y <= 960) {
        this.drawPoint(document.getElementById(this.items[i].r + "r"), (x / 12 + 0.5) * 960, (y / (-12) + 0.5) * 960, this.items[i].res ? "green" : "red")
      }
    }
  }
}
