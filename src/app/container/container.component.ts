import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { trigger, style, transition, animate, group } from '@angular/animations';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
  animations: [
    trigger('itemAnim', [
      transition(':enter', [
        style({transform: 'translateY(100%)', opacity: 0}),
        animate(50)
      ]),
      transition(':leave', [
        group([
          animate('0.2s ease', style({
            transform: 'translateY(-150px)'
          })),
          animate('0.5s 0.2s ease', style({
            opacity: 0
          }))
        ])
      ])
    ])
  ]
})
export class ContainerComponent implements OnInit {

  level = 0;
  plusone: boolean;
  @ViewChild('layout') canvasRef;
  cheer1 = true;
  @Output()
  batteryFilled = new EventEmitter();

  constructor() { }

  ngOnInit() {
    const keyup$: Observable<any> = Observable.fromEvent(window, 'keyup');
    keyup$.filter(event => event.keyCode === 104).filter(() => this.level < 100).subscribe(() => {
      this.level += 1;
      if (this.level === 100) {
        this.batteryFilled.emit();
      }
      this.drawRectangle();
    });
    keyup$.filter(event => event.keyCode === 98).filter(() => this.level > 0).subscribe(() => {
      this.level -= 1;
      this.drawRectangle();
    });
    this.drawRectangle();

    keyup$.filter(event => event.keyCode === 104)
      .filter(() => this.level < 100)
      .do(() => {
        this.plusone = false;
        setTimeout(() => {
          this.plusone = true;
          this.playCheers();
        }, 20);
      })
      .switchMap(() => Observable.timer(3000))
      .subscribe(() => this.plusone = false);
  }

  playCheers() {
    const audio = new Audio();
    audio.src = this.cheer1 ? 'assets/cheer1.mp3' : 'assets/cheer2.mp3';
    this.cheer1 = !this.cheer1;
    audio.load();
    audio.play();
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
