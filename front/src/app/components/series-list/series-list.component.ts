import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Serie } from '../../common/serie';
import { SerieService } from '../../services/serie.service';
import { SerieModalComponent } from '../serie-modal/serie-modal.component';

@Component({
  selector: 'app-series-list',
  imports: [CommonModule, SerieModalComponent],
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.scss'],
})
export class SeriesListComponent implements OnInit {
  series: Serie[] = [];

  showModal = false;
  modalTitle = '';
  modalIdSerie: string | null = null;

  constructor(private serieService: SerieService) {}

  ngOnInit(): void {
    this.listSeries();
  }

  listSeries(): void {
    this.serieService.getSeriesList().subscribe((data: Serie[]) => {
      this.series = data;
    });
  }

  addSerie(): void {
    this.openModal('Agregar Serie', null);
  }

  viewSerieDetails(id?: string): void {
    this.openModal('Detalles Serie', id ?? null);
  }

  openModal(titleModal: string, idSerie: string | null): void {
    this.modalTitle = titleModal;
    this.modalIdSerie = idSerie;
    this.showModal = true;
  }

  onModalClose(): void {
    this.showModal = false;
    this.listSeries();
  }
}
