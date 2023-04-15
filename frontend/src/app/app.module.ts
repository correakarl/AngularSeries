import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SeriesListComponent } from './components/series-list/series-list.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SerieModalComponent } from './components/serie-modal/serie-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SeriesListComponent,
    NavigationComponent,
    SerieModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
