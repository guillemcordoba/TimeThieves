import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/merge';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {

  hours: number;
  mins: number;
  seconds: number;
  minutes: 90;
  @Input()
  running: boolean;
  setup = true;
  countdown: Observable<number>;
  keyup$: Observable<any>;

  constructor() { }

  ngOnInit() {
    // Setup countdown
    this.countdown = Observable.interval(1000)
      .takeWhile(() => this.running)
      .map(secondsPassed => this.minutes * 60 - secondsPassed)
      .takeWhile(secondsLeft => secondsLeft >= 0)
      .do((secondsLeft) => {
        if (secondsLeft < 60 || secondsLeft < 300 && secondsLeft % 4 === 0) {
          this.playAudio('assets/alarm.mp3');
        } else if (secondsLeft % 4 === 0) {
          this.playAudio('assets/beep.mp3');
        }
      })
      .map(secondsLeft => secondsLeft * 1000 - 3600000);
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent) {
    if (ev.keyCode === 37) {          // LEFT arrow pressed
      this.minutes--;
    } else if (ev.keyCode === 39) {   // RIGHT arrow pressed
      this.minutes++;
    }
  }

  playAudio(src: string) {
    const audio = new Audio();
    audio.src = src;
    audio.load();
    audio.play();
  }
}
