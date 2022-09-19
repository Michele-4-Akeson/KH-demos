import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WindowAltComponent } from './components/window-alt/window-alt.component';

@NgModule({
  declarations: [
    AppComponent,
    WindowAltComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
