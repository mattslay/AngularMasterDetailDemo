import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
//import { DataComponent } from './data.component';
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
      //this.vehicle = <Vehicle>{name: 'Corvette', manufacturer: 'Chevrolet'};
      //this.vehicle = <Vehicle>{};
      this.vehicle = new Vehicle();
      this.vehicles = [];
   }

   ngOnInit() {
          console.log('getting data...');

         this.dataService.getVehicleById(30).subscribe(z => {
           //this.vehicle = z;
           console.log(JSON.stringify(this.vehicle));
         });

         this.dataService.getVehicles().subscribe(x => this.vehicles = x);
         // this.dataService.getAllPages('').subscribe(x => this.vehicles = x);
         //this.vehicles = this.dataService.getAllPages('');
      }

    selectVehicle(url: string) {
         this.dataService.getVehicleByUrl(url).subscribe(z => this.vehicle = z);
    }

 }

export class Vehicle {
    name: string;
    manufacturer: string;
}

