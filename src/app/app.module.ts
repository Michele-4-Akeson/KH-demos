import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WindowAltComponent } from './components/window-alt/window-alt.component';
import { ShapeFillComponent } from './components/shape-fill/shape-fill.component';
import { ManipulativeStudioComponent } from './components/manipulative-studio/manipulative-studio.component';
import { ClipTemplateComponent } from './components/clip-template/clip-template.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    WindowAltComponent,
    ShapeFillComponent,
    ManipulativeStudioComponent,
    ClipTemplateComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    BrowserAnimationsModule,
    MatSliderModule,
    MatInputModule,
    MatButtonModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
