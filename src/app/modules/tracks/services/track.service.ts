import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  private readonly URL = environment.api;

  constructor(private httpClient: HttpClient) {}

  private skipById(
    listTracks: TrackModel[],
    id: number
  ): Promise<TrackModel[]> {
    return new Promise((resolve, reject) => {
      const listTmp = listTracks.filter((a) => a._id !== id);
      resolve(listTmp);
    });
  }

  /**
   * ///TODO: {data:[..1,..2,..3,..4,..5]}
   *
   * @returns
   */
  getAllTracks$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`).pipe(
      map(({ data }: any) => {
        return data;
      })
    );
  }

  /**
   *
   * @returns Devolver canciones random
   */

  getAllRandom$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`).pipe(
      tap((data) => console.log('🔴🔴🔴', data)),
      mergeMap(({ data }: any) => this.skipById(data, 2)),
      // map(({ dataRevertida }: any) => {
      //   //TODO: aplicar un filter comun de array
      //   return dataRevertida.filter((track: TrackModel) => track._id !== 1);
      // })
      tap((data) => console.log('🆗🆗🆗', data)),
      catchError ((err) => {
        const { status, statusText }= err;
        console.log('Ocurrió un error, revisa🔴🚩🚨', [status, statusText])
        return of([])
      })
    );
  }
}
