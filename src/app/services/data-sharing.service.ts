import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  constructor() { }
   sharedDataSubject = new BehaviorSubject<any>(null);
  sharedData$: Observable<any> = this.sharedDataSubject.asObservable();

  setSharedData(data: any) {
    this.sharedDataSubject.next(data);
  }
}
