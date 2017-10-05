import { Component, OnInit, Input } from '@angular/core';
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

  countdown: Observable<number>;
  @Input()
  minutes: number;
  keyup$: Observable<any>;

  constructor() { }

  ngOnInit() {
    this.countdown = Observable.interval(1000)
      .map(secondsPassed => this.minutes * 60 - secondsPassed)
      .map(secondsLeft => secondsLeft * 1000 - 3600000);

      this.keyup$ = Observable.fromEvent(window, 'keyup');
      this.keyup$.filter(event => event.keyCode === 102).subscribe(() => this.minutes++);
      this.keyup$.filter(event => event.keyCode === 100).subscribe(() => this.minutes--);
    }

}
