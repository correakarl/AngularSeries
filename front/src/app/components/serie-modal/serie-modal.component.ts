import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Serie, image, category } from '../../common/serie';
import { SerieService } from '../../services/serie.service';

@Component({
  selector: 'app-serie-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './serie-modal.component.html',
  styleUrls: ['./serie-modal.component.scss'],
})
export class SerieModalComponent implements OnInit {
  @Input() titleModal: string | null = null;
  @Input() idSerie: string | null = null;
  @Output() closed = new EventEmitter<void>();

  serie: Serie;

  formSerie: FormGroup;

  categories: category[];

  gallery: image[];

  isEdit = false;

  isNewSerie = false;

  myNewCategory = new FormGroup({
    newCat: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder, private serieService: SerieService) {
    this.categories = this.gallery = [];
    const thumb: image = { img: '' };
    this.serie = {
      _id: '',
      title: '',
      chapters: 0,
      emissionYear: 0,
      resume: '',
      gallery: [],
      category: [],
      thumbnail: thumb,
    };
    this.formSerie = this.formBuilder.group({
      _id: [''],
      __v: [0],
      title: [''],
      chapters: [0],
      thumbnail: this.formBuilder.group({
        img: [''],
      }),
      emissionYear: [0],
      category: [],
      gallery: [],
      resume: [''],
    });
  }

  ngOnInit(): void {
    if (this.idSerie === null) {
      this.isNewSerie = true;
      this.loadSerie(this.serie);
    } else {
      this.isNewSerie = false;
      this.serieService.getSerie(this.idSerie).subscribe((data) => {
        this.serie = data;
        this.loadSerie(this.serie);
      });
    }
  }

  close(): void {
    this.closed.emit();
  }

  onSubmit(): void {
    if (this.isEdit) {
      const id = this.idSerie !== null ? this.idSerie : '';
      this.serieService.updateSerie(this.formSerie.getRawValue(), id).subscribe(
        () => this.close(),
        (error) => console.log(error)
      );
    } else {
      const raw = this.formSerie.getRawValue();
      const formData = {
        title: raw.title,
        chapters: raw.chapters,
        thumbnail: { img: raw.thumbnail.img },
        emissionYear: raw.emissionYear,
        category: [],
        gallery: [],
        resume: raw.resume,
      };

      this.serieService.addSerie(formData as Serie).subscribe(
        () => this.close(),
        (error) => console.log(error)
      );
    }
  }

  loadSerie(serie: Serie): void {
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
      this.serieService.removeSerie(serie._id).subscribe(() => this.close());
    }
  }

  getImage(i: image): string {
    return i.img !== null ? i.img : '#';
  }
}
