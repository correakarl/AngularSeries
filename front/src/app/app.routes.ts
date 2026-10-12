import { Routes } from '@angular/router';

import { SeriesListComponent } from './components/series-list/series-list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: SeriesListComponent },
  { path: 'series', redirectTo: '' },
  { path: '**', redirectTo: '' },
];
