import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Vehicle } from './app.component';



@Injectable()
export class DataService {

    private _vehiclesUrl = 'http://swapi.co/api/vehicles/'; // URL to web api
    private _vehicleUrl = 'http://swapi.co/api/vehicles/{0}/'; // URL to web api

    private _params: URLSearchParams = new URLSearchParams();

    constructor(public _http: Http) {
        this._params.set('format', 'json');
    }

    getVehicleById(id: number): Observable<Vehicle> {

        let url = this._vehicleUrl.replace('{0}', id.toString());
        return this._http.get(url, this._params).map(res => res.json());
    }

    getVehicleByUrl(url: string): Observable<Vehicle> {
        return this._http.get(url, this._params).map(res => res.json());
    }


    getVehicles(): Observable<Vehicle[]> {
            // Note: this API call only gets the first page of data. We could extend
            // this method to make additional calls to get the rest of the pages.
            // There are about 6 pages of data in total.
            return this._http.get(this._vehiclesUrl, this._params).map(res => res.json().results);
    }


    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}


