import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  runningCountdown = false;
  containerEnabled = true;
  lockedContainer = false;
  lockedChecked = false;

  constructor() {}

  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent): void {
    if (this.lockedContainer) {
      return;
    }

    if (ev.keyCode === 27) {          // ESC arrow pressed
      this.containerEnabled = !this.containerEnabled;
    }
  }

  startCountdown(locked: boolean) {
    console.log(locked);
    this.lockedContainer = locked;
    this.runningCountdown = true;
  }

  stopCountdown() {
    this.runningCountdown = false;
  }


  setLockedChecked(newValue: boolean) {
    this.lockedChecked = newValue;
  }
}
