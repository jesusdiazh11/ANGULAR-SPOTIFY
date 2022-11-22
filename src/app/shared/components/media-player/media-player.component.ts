import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs'; //TODO: PROGRAMACION REACTIVA

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css'],
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('');
  listObserver$: Array<Subscription> = [];
  state: string = 'paused';
  constructor(public multimediaService: MultimediaService) {}

  ngOnInit(): void {
    const observer1$ = this.multimediaService.playerStatus$.subscribe(
      (status) => (this.state = status)
    );

    this.listObserver$ = [observer1$];
    // const observable1$ = this.multimediaService.myObservable1$.subscribe(
    //   (responseOk) => {
    //     //TODO: next()
    //     console.log('✔ El agua llega perfecto!', responseOk);
    //   },
    //   (responseFail) => {
    //     //TODO: error()
    //     console.log('✖ Se tapo la tuberia!', responseFail);
    //   }
    // );
  }

  ngOnDestroy(): void {
    this.listObserver$.forEach((u) => u.unsubscribe());
    // ! PARA INDICAR CUANDO SE DESTRUYE EL COMPONENTE, AL DIRIGIRSE AL LOGIN 🆗👍
    // console.log('🔴🔴🔴🔴🔴🔴 BOOOOOOOOOOOM!');
  }

  handlePosition(event: MouseEvent): void {
    const elNative: HTMLElement = this.progressBar.nativeElement;
    const { clientX } = event;
    const { x, width } = elNative.getBoundingClientRect();
    const clickX = clientX - x;
    const percentageFromX = (clickX * 100) / width;
    
    console.log(`Percentaje Barra: ${percentageFromX}`);
    this.multimediaService.seekAudio(percentageFromX);
  }
}
