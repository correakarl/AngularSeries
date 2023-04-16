import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

import { SerieService } from './../../services/serie.service';
import { Serie, image, category } from 'src/app/common/serie';

@Component({
  selector: 'app-serie-modal',
  templateUrl: './serie-modal.component.html',
  styleUrls: ['./serie-modal.component.scss']
})
export class SerieModalComponent implements OnInit {

  serie: Serie;

  titleModal: string | null = null;

  idSerie: string | null = null;

  formSerie: FormGroup = this.formBuilder.group({
    _id: [''],
    __v: [0],
    title: [''],
    chapters: [0],
    thumbnail: this.formBuilder.group({
      img:['']
    }),
    emissionYear: [0],
    category: [],
    gallery: [],
    resume: ['']
  });

  categories: category[];

  gallery: image[];

  isEdit = false;

  isNewSerie = false;

  constructor(
    public modalRef: MdbModalRef<SerieModalComponent>,
    private formBuilder: FormBuilder,
    private serieService: SerieService
  ) {
    this.categories = this.gallery = [];
    let thumb: image = { img:'' };
    this.serie = {_id:'', title: '', chapters: 0, emissionYear: 0, resume: '', gallery: [], category: [], thumbnail: thumb};
  }

  ngOnInit(): void {

    if (this.idSerie === null) {
      this.isNewSerie = true;
      this.loadSerie(this.serie);
    } else {
      this.isNewSerie = false;
      this.serieService.getSerie(this.idSerie).subscribe(
        data => {
          this.serie = data;
          this.loadSerie(this.serie);
          //console.log(data);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.isEdit) {
      const id = (this.idSerie !== null)?this.idSerie:'';
      this.serieService.updateSerie(
        this.formSerie.getRawValue()).subscribe(
          data => {
            console.log(data);
            this.modalRef.close('reload');
            //this.listSeries();
          },
          error => {
            console.log(error);
          }
        ),
        id
    } else {
      //console.log(this.formSerie.getRawValue());

      const formData = {
        title: this.formSerie.getRawValue().title,
        chapters: this.formSerie.getRawValue().chapters,
        thumbnail: {
          img: this.formSerie.getRawValue().thumbnail.img
        },
        emissionYear: this.formSerie.getRawValue().emissionYear,
        category: [],
        gallery: [],
        resume: this.formSerie.getRawValue().resume
      };

      this.serieService.addSerie(formData).subscribe(
        data => {
          console.log(data);
          this.modalRef.close('reload');
          //this.listSeries();
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  loadSerie(serie: Serie): void {
    console.log(serie);
    this.formSerie.setValue(serie);
    this.categories = serie.category;
    this.gallery = serie.gallery;
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
          this.modalRef.close('reload');
        }
      );
    }
  }

  getImage(i: image): string {
    return (i.img !== null)?i.img:'#';
  }

  myNewCategory = new FormGroup({
    newCat: new FormControl('')
    });
}
