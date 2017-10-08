import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  runningCountdown = false;

  startCountdown() {
    this.runningCountdown = true;
  }

  stopCountdown() {
    this.runningCountdown = false;
  }
}
