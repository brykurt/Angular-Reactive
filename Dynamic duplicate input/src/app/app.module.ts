import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule  } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserinputComponent } from './day3-dynamic/userinput/userinput.component';

@NgModule({
  declarations: [
    AppComponent,
    UserinputComponent,
   
  
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
