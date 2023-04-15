import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

import { SerieService } from './../../services/serie.service';
import { Serie } from 'src/app/common/serie';

@Component({
  selector: 'app-serie-modal',
  templateUrl: './serie-modal.component.html',
  styleUrls: ['./serie-modal.component.scss']
})
export class SerieModalComponent implements OnInit {

  serie: Serie | null = null;

  titleModal: string | null = null;

  idSerie: string | null = null;

  formSerie: FormGroup = this.formBuilder.group({
    _id: [''],
    __v: [0],
    title: [''],
    chapters: [0],
    thumbnail: [],
    emissionYear: [0],
    category: [],
    gallery: [],
    resume: ['']
  });

  category: FormGroup = this.formBuilder.group({
    _id: [''],
    __v: [0],
    catName: [''],
    catImg: []
  });

  thumbnail: FormGroup = this.formBuilder.group({
    _id: [''],
    img: [''],
  });

  gallery: FormGroup = this.formBuilder.group({
    _id: [''],
    __v: [0],
    img: [''],
  });

  isEdit = false;

  isNewSerie = false;

  constructor(
    public modalRef: MdbModalRef<SerieModalComponent>,
    private formBuilder: FormBuilder,
    private serieService: SerieService
  ) { }

  ngOnInit(): void {

    if (this.idSerie === null) {
      this.isNewSerie = true;
    } else {
      this.isNewSerie = false;
      this.serieService.getSerie(this.idSerie).subscribe(
        data => {
          this.serie = data;
          this.loadSerie(data);
          //console.log(data);
        }
      );
    }

  }

  onSubmit(): void {
    if (this.isEdit) {
      const id = this.formSerie.getRawValue()._id;
      this.serieService.updateSerie(id,
        this.formSerie.getRawValue()).subscribe(
          data => {
            console.log(data);
            //this.listSeries();
          }
        );
    } else {
      this.serieService.addSerie(this.formSerie.getRawValue()).subscribe(
        data => {
          console.log(data);
          //this.listSeries();
        }
      )
    }
  }

  loadSerie(serie: Serie): void {
    this.formSerie.setValue(serie);
    this.category.setValue(serie.category);
    this.gallery.setValue(serie.gallery);
  }

  editSerie(): void {
    this.isEdit = true;
  }

  cancelEditSerie(): void {
    this.isEdit = false;
  }

  removeSerie(serie: Serie): void {
    if (confirm('Desea borrar ' + serie.title + '?')) {
      this.serieService.removeSerie(serie._id).subscribe(
        data => {
          console.log(data);
          //this.listSeries();
        }
      );
    }
  }

}
