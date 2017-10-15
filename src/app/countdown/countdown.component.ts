import {
  Component,
  OnInit,
  Input,
  HostListener,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {
  static BEEP_DELAY = 3;

  @Input()
  running: boolean;
  @Output()
  startCountdown = new EventEmitter<boolean>();
  @Output()
  lockedCheckedOutput = new EventEmitter<boolean>();
  hours: number;
  mins: number;
  seconds: number;
  countdownSeconds: number;
  setup = true;
  countdown: Observable<number>;
  keyup$: Observable<any>;
  locked: boolean;
  countdownShown = true;

  constructor() { }

  ngOnInit() {}

  initCountdown(form: any): void {
    console.log(form);
    if (!form.valid) {
      return;
    }

    this.setup = false;
    this.countdownSeconds = this.hours * 3600 + this.mins * 60 + this.seconds;

    // Setup countdown
    this.countdown = Observable.interval(1000).startWith(0)
    .takeWhile(() => this.running && !this.setup && this.countdownShown)
    .map(secondsPassed => this.countdownSeconds - secondsPassed)
    .takeWhile(secondsLeft => secondsLeft >= 0)
    .do((secondsLeft) => {
      if (secondsLeft < 60 || secondsLeft < 300 && secondsLeft % CountdownComponent.BEEP_DELAY === 0) {
        this.playAudio('assets/alarm.mp3');
      } else if (secondsLeft % CountdownComponent.BEEP_DELAY === 0) {
        this.playAudio('assets/beep.mp3');
      }
    })
    .map(secondsLeft => secondsLeft * 1000 - 3600000);

    this.startCountdown.emit(this.locked);
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent): void {
    if ((this.setup || !this.locked) && ev.keyCode === 67) { // C key pressed
      this.countdownShown = !this.countdownShown;
    }

    if (this.locked) {
      return;
    }

    if (ev.keyCode === 37) {          // LEFT arrow pressed
      this.countdownSeconds -= 60;
    } else if (ev.keyCode === 39) {   // RIGHT arrow pressed
      this.countdownSeconds += 60;
    }
  }

  playAudio(src: string) {
    const audio = new Audio();
    audio.src = src;
    audio.load();
    audio.play();
  }

  setLockedChecked(newValue: boolean) {
    this.locked = newValue;
    this.lockedCheckedOutput.emit(newValue);
  }
}
