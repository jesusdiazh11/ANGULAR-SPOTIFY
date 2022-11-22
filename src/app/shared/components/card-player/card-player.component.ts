import { TrackModel } from './../../../core/models/tracks.model';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MultimediaService } from '@shared/services/multimedia.service';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.css'],
})
export class CardPlayerComponent implements OnInit {
  @Input() mode: 'small' | 'big' = 'small';
  @Input() track: TrackModel = {
    _id: 0,
    name: '',
    album: '',
    url: '',
    cover: '',
  };
  constructor(private multimediaService: MultimediaService) {}

  ngOnInit(): void {}

  sendPlay(track: TrackModel): void {
    this.multimediaService.trackInfo$.next(track);
  }
}
