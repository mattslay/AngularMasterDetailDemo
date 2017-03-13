import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { DataService } from './data.service';
import { Observable }       from 'rxjs/Observable';

@Component({
  selector: 'my-app',
  templateUrl: './app/app.html',
  providers: [ DataService ]
})

export class AppComponent implements OnInit {

   vehicle: Vehicle;
   vehicles: Vehicle[];

   constructor(private dataService: DataService) {
      this.vehicle = new Vehicle();
      this.vehicles = [];
   }

   // Angular automatically calls this method when this class is references in the UI.
   // In this method, we will get the initial list of Vehicles and the app.html page
   // renders them using *ngFor
   ngOnInit() {
         console.log('getting data...');

         this.dataService.getVehicles().subscribe(x => this.vehicles = x);
      }

    // This method is called from the UI when the user clicks on a Vehicle button in the list.
    // After this method makes the API call, once the data is returned, we set this.Vehicle automatically
    // the object data we receive back, and the UI will automatically update the Vehicle detail div
    // with the new data.
    selectVehicle(url: string) {
         this.dataService.getVehicleByUrl(url).subscribe(z => this.vehicle = z);
    }

 }

// These are only a few of the fields on the Vehicle object, but the UI can render and of them just fine.
// To get the full of TypeScript intellisense, we really should list all the property names from the API here.
export class Vehicle {
    name: string;
    manufacturer: string;
}

