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
            return this._http.get(this._vehiclesUrl, this._params).map(res => res.json().results);
                // {params: {format: 'json', page: page}}
    }

    _getPage(page: number) {

    }
    getVehicles1(): Observable<Vehicle[]> {
        // see: http://codepen.io/lancegliser/pen/GjXpNE?editors=0010

            let responseData: any;
            let vehicles: Vehicle[];

            return this._http.get(this._vehiclesUrl).map(res => {
                responseData = res.json();
                vehicles = responseData.results;
                JSON.stringify(vehicles);
                if (responseData.next) {
                    this._http.get(responseData.next).map(res2 => {
                        vehicles.concat(res2.json().results);
                    return vehicles;
                    });
                } else {
                    return vehicles;
                }
            });

            //return this._http.get(url).map(res => res.json());
            //todo: the above call only gets one page of data. there are multiple pages,
            // so will have to call multuple times to get it all.
    }

    getAllPages(url: string) {

           if (url == '') { url = this._vehiclesUrl;}

           //let result = { next: string, vehicles: Vehicle[] }

           return this.getPage(url)
           .map(resp => {
               let data = resp.json()
                if (data.next)
                {
                    return this.getAllPages(data.next)
                    .map(resultsToJoin => [data.results, resultsToJoin.json().results]);
                } else {
                    return data.results;
                }

           });
    }   

    getPage(url: string) {

           let vehicles: Vehicle[] = [];

            //return this._http.get(url, this._params).map(res => res.json().results);
            return this._http.get(url, this._params);
           

    }
    
        getPage2(url: string) {

           let vehicles: Vehicle[] = [];

            if (url == '') { url = this._vehiclesUrl;}

            return this._http.get(url).map(res => {
                let responseData = res.json();
                vehicles = responseData.results;
                if (responseData.next) {
                    this.getPage(responseData.next).map(x => {
                        vehicles = vehicles.concat(x.json().results);
                        return vehicles;
                    });
                } else {
                    return vehicles;
                }
            })
    }



    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}


