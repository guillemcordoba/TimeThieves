import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  HostListener,
  Input
} from '@angular/core';
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

  @Input()
  enabled: boolean;
  @Input()
  locked: boolean;
  level = 0;
  plusone: boolean;
  @ViewChild('layout') canvasRef;
  @Output()
  containerFilled = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.drawRectangle();

    const keyup$: Observable<any> = Observable.fromEvent(window, 'keyup');

    // Setup animation behaviour
    keyup$.filter(event => event.keyCode === 38)
      .filter(() => this.level < 100 && this.enabled)
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

  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent) {
    if (!this.enabled) {
      return;
    }

    if (ev.keyCode === 38) {          // UP arrow pressed
      if (this.level < 100) {
        // Increment level
        this.level++;
        // Draw new rectangle
        this.drawRectangle();

        // If the level is filled, emit the event
        if (this.level === 100) {
          this.containerFilled.emit();
        }
      }
    } else if (ev.keyCode === 40 && !this.locked) {   // DOWN arrow pressed
      if (this.level > 0) {
        this.level -= 1;
        this.drawRectangle();
      }
    }
  }

  playCheers() {
    const audio = new Audio();
    audio.src = 'assets/coin.mp3';
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
