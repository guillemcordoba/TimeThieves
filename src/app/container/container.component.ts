import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/timer';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  level = 0;
  plusone: String;
  @ViewChild('layout') canvasRef;

  constructor() { }

  ngOnInit() {
    const keyup$: Observable<any> = Observable.fromEvent(window, 'keyup');
    keyup$.filter(event => event.keyCode === 104).filter(() => this.level < 100).subscribe(() => {
      this.level += 1;
      this.drawRectangle();
      this.showPlusOne();
    });
    keyup$.filter(event => event.keyCode === 98).filter(() => this.level > 0).subscribe(() => {
      this.level -= 1;
      this.drawRectangle();
    });
    this.drawRectangle();
  }

  showPlusOne() {
    this.plusone = '+1';
    Observable.timer(3000).subscribe(() => this.plusone = '');
  }

  drawRectangle(): void {
      let file = { left: 42, top: 60 + 380 - (380 * this.level / 100), width: 242, height: 380 * this.level / 100 };      
      let canvas = this.canvasRef.nativeElement;
      let context = canvas.getContext('2d');
      let source = new Image();
      source.onload = () => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(source, 0, 0);
          context.beginPath();
          context.fillStyle = 'orange';
          context.rect(file.left, file.top, file.width, file.height);
          context.fill();
      };
      source.src = 'assets/battery.png';
  }

}
