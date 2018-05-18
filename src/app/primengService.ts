export interface Car {
    athlete;
    age;
    country;
    year;
    date;
    sport;
    gold;
    silver;
    bronze;
    total
}
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
export class CarService {

    constructor(private http: HttpClient) {}

    getCarsSmall():Observable<Car[]> {
        return this.http.get<Car[]>('https://raw.githubusercontent.com/ag-grid/ag-grid-docs/master/src/olympicWinnersSmall.json')
        
                   
    }
}