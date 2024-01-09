import { Component, Input, OnInit } from '@angular/core';
import { Location } from 'src/app/types/location.interface';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent implements OnInit {
 
  // unitsList recebe o input das unidades filtradas do component pai (app.component)
  @Input() 
  public unitsList: Location[] = [];
  
  

  constructor() {
   
  }

  ngOnInit():void {
    console.log(this.unitsList)
  }

  
}
