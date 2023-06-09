import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MdbModalModule } from 'mdb-angular-ui-kit/modal';

import { SeriesListComponent } from './components/series-list/series-list.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SerieModalComponent } from './components/serie-modal/serie-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    HttpClientModule,
    MdbModalModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
