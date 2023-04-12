import { SerieService } from './../../services/serie.service';
import { Component, OnInit } from '@angular/core';
import { Serie } from 'src/app/common/serie';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.scss']
})
export class SeriesListComponent implements OnInit {

  series: Serie[] = [];

  constructor(
    private serieService: SerieService
  ) { }

  ngOnInit(): void {
    this.listSeries();
  }

  listSeries() : void {
    this.serieService.getSeriesList().subscribe(
      (data: any) => {
        this.series = data;
      }
    )
  }
}
