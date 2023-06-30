import { Component, OnInit } from '@angular/core';
import { GadgetType } from 'src/app/enum/GadgetType';
import { VehicleType } from 'src/app/enum/VehicleType';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  vehicleTypes = VehicleType;
  gadgetsTypes = GadgetType;

  constructor() { }

  ngOnInit() {
    console.log(VehicleType.Car);
  }

}
