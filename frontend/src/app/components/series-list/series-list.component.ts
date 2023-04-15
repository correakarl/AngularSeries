import { SerieService } from './../../services/serie.service';
import { Component, OnInit } from '@angular/core';
import { Serie } from 'src/app/common/serie';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.scss']
})
export class SeriesListComponent implements OnInit {

  series: Serie[] = [];

  formSerie: UntypedFormGroup = this.formBuilder.group({
    _id: [''],
    __v: [0],
    title: [''],
    emissionYear: [0],
    category: [],
    gallery: [],
    resume: ['']
  });

  category: UntypedFormGroup = this.formBuilder.group({
    _id: [''],
    __v: [0],
    catName: [''],
    catImg: []
  });

  gallery: UntypedFormGroup = this.formBuilder.group({
    img: [''],
    path: ['']
  });

  edit = false;

  constructor(
    private serieService: SerieService,
    private formBuilder: UntypedFormBuilder
  ) {
  }

  ngOnInit(): void {
    this.listSeries();
  }

  listSeries(): void {
    this.serieService.getSeriesList().subscribe(
      (data: any) => {
        this.series = data;
      }
    );
  }

  loadSerie(serie: Serie): void {
    this.formSerie.setValue(serie);
    this.edit = true;
  }

  resetFormSerie(): void {
    this.formSerie.reset();
    this.edit = false;
  }

  onSubmit(): void {
    if (this.edit) {
      const id = this.formSerie.getRawValue()._id;
      this.serieService.updateSerie(id,
        this.formSerie.getRawValue()).subscribe(
          data => {
            this.listSeries();
          }
        );
    }
    else {
      this.serieService.addSerie(this.formSerie.getRawValue()).subscribe(
        data => {
          console.log(data);
          this.listSeries();
        }
      )
    }
  }

  removeSerie(serie: Serie): void {
    if (confirm('Desea borrar ' + serie.title + '?')) {
      this.serieService.removeSerie(serie._id).subscribe(
        data => {
          console.log(data);
          this.listSeries();
        }
      );
    }
  }

}
