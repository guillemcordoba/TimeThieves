import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CountdownComponentComponent } from './countdown-component/countdown-component.component';
import { ContainerComponentComponent } from './container-component/container-component.component';
import { ContainerComponent } from './container/container.component';
import { CountdownComponent } from './countdown/countdown.component';

@NgModule({
  declarations: [
    AppComponent,
    CountdownComponentComponent,
    ContainerComponentComponent,
    ContainerComponent,
    CountdownComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
