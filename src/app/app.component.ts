import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Location } from './types/location.interface';
import { GetUnitsService } from './services/get-units.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showList = new BehaviorSubject(false);
  unitsList: Location[] = []
  // quando o evento de submit do component filho for clicado, emitirá um evento para o component pai
  // Este evento podemos pegá-lo no html deste component pai e aplicar este método onSubmit()
  // Que nada mais é do que um boolean para um ngIf

  constructor(private unitService: GetUnitsService) {}

  onSubmit() {
    this.unitsList = this.unitService.getFilteredUnits();
    this.showList.next(true)
  }
}
