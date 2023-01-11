import { Component } from '@angular/core';
import {SvgService} from "./svg.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-svg',
  templateUrl: './svg.component.html',
  providers: [ SvgService ],
  styleUrls: ['./svg.component.css']
})
export class SvgComponent {
  point: any = {
    x: 0,
    y: 0,
    r: 0,
  }
  items = [];

  constructor(private svgService: SvgService) {}

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

  // когда кликают по свг, то точки отрисовываются на свг, но точки из бд отрисовываются в группах, при чём при каждой смене радиуса
  drawPoint(svgOrG: EventTarget | null, x: number, y: number, resultFill = 'black'){
    // @ts-ignore
    svgOrG.innerHTML += `<circle cx="${x}" cy="${y}" r='7' fill="${resultFill}"/>`;
  }

  changeArea(radius: string) {
    // @ts-ignore
    document.getElementById('r1').innerHTML = '';
    // @ts-ignore
    document.getElementById('r2').innerHTML = '';
    // @ts-ignore
    document.getElementById('r3').innerHTML = '';
    // @ts-ignore
    document.getElementById('r4').innerHTML = '';
    let r = Number(radius);
    this.point.r = r;
    let areaFill: Number = 810 - r
    let id: string = "r"
    if (r > 0) {
      id = id + radius
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
              L 480 480" stroke="black" fill="#fc${areaFill}f""/>`
    }
  }

  //заменить на функцию отрисовки всех точек из списка items
  newPoint(point: any) {
    // this.svgService.addPoint(point.x, y, r).subscribe(results => this.items = results.body);
    console.log(this.items)
  }
}
