import { Observable, of } from 'rxjs';
import { SearchService } from './../../services/search.service';
import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css'],
})
export class HistoryPageComponent implements OnInit {
  listResults$: Observable<any> = of([]);
  constructor(private SearchService: SearchService) {}

  ngOnInit(): void {}

  receiveData(event: string): void {
    //TODO: Agarra el termino y solo se ejecuta cuando tiene 3 caracteres!
    console.log('😎😎😎 Estoy en el padre!', event);
    this.listResults$ = this.SearchService.searchTracks$(event)
  }
}
