import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Feed } from '../models/feeds.model';

@Injectable({
  providedIn: 'root',
})
export class FeedsService {
  private httpClient = inject(HttpClient);

  public getFeedList(): Observable<Feed[]> {
    return this.httpClient
      .get('../../assets/dummy/data.json')
      .pipe(map(({ feeds }: any) => feeds));
  }
}
