import { SerieService } from './../../services/serie.service';
import { Component, OnInit } from '@angular/core';
import { Serie } from 'src/app/common/serie';
import { FormBuilder, FormGroup } from '@angular/forms';

import { SerieModalComponent } from '../serie-modal/serie-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.scss']
})
export class SeriesListComponent implements OnInit {

  modalRef: MdbModalRef<SerieModalComponent> | null = null;

  series: Serie[] = [];

  constructor(
    private serieService: SerieService,
    private modalService: MdbModalService
  ) {
  }

  ngOnInit(): void {
    this.listSeries();
  }

  listSeries(): void {
    this.serieService.getSeriesList().subscribe(
      (data: any) => {
        this.series = data;
        //console.log(data);
      }
    );
  }

  addSerie(): void {
    this.openModal('Agregar Serie', null);
  }

  viewSerieDetails(id: string): void {
    this.openModal('Detalles Serie', id);
  }

  openModal(titleModal: string, idSerie: string | null): void {
    this.modalRef = this.modalService.open(SerieModalComponent,
      {
        data: { titleModal, idSerie },
      });
  }
}
