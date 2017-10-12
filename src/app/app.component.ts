import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  runningCountdown = false;
  containerEnabled = true;

  constructor() {}

  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent): void {
    if (ev.keyCode === 27) {          // ESC arrow pressed
      this.containerEnabled = !this.containerEnabled;
    }
  }

  startCountdown() {
    this.runningCountdown = true;
  }

  stopCountdown() {
    this.runningCountdown = false;
  }
}
