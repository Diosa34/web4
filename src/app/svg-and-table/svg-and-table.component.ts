import { Component } from '@angular/core';

@Component({
  selector: 'app-svg-and-table',
  templateUrl: './svg-and-table.component.html',
  styleUrls: ['./svg-and-table.component.css']
})
export class SvgAndTableComponent {

  svgClick(event: MouseEvent) {
    // @ts-ignore
    let svgCoord = event.target.getBoundingClientRect() // DOMRect object

    let xPartOfSvg = (event.clientX - svgCoord.x)/svgCoord.width // координата(в долях) клика относительно размеров svg
    let yPartOfSvg = (event.clientY - svgCoord.y)/svgCoord.height
    this.drawPoint(event.target, (xPartOfSvg) * 960, (yPartOfSvg) * 960)

    //координаты в системе координат графика(должны быть отправлены на сервер), а не в системе координат пикселей
    let x = (xPartOfSvg - 0.5) * 12
    let y = -1 * (yPartOfSvg - 0.5) * 12
  }

  // когда кликают по свг, то точки отрисовываются на свг, но точки из бд отрисовываются в группах, при чём при каждой смене радиуса
  drawPoint(svgOrG: EventTarget | null, x: number, y: number, resultFill = 'black'){
    // @ts-ignore
    svgOrG.innerHTML += `<circle cx="${x}" cy="${y}" r='7' fill="${resultFill}"/>`;
  }
}
