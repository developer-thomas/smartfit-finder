import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterUnitsService } from 'src/app/services/filter-units.service';
import { GetUnitsService } from 'src/app/services/get-units.service';
import { Location } from 'src/app/types/location.interface';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  // Este evento será emitido dentro do onSubmit, que é um evento de click
  // E depois iremos tratar no component pai
  @Output() submitEvent = new EventEmitter();

  public results: Location[] = [];
  public filteredResults: Location[] = [];

  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private unitService: GetUnitsService, private filterUnitsService: FilterUnitsService) {}
  
  ngOnInit() {
    // Estamos pegando o behaviorSubject transformado para observable e se inscrevendo nele uma vez que ele observa os dados da api
    // depois pegamos esses dados inscritos e o aplicamos as variáveis que serão utilizadas neste componente
    this.unitService.getAllUnits().subscribe((data) => {
      this.results = data;
      this.filteredResults = data;
    });
    this.formGroup = this.formBuilder.group({hour: '',showClosed: true,});
  }

  onSubmit(): void {
    // showClosed e hour assumem os valores dos respectivos dentro de formGroup.value.
    let {showClosed, hour} = this.formGroup.value
    // chamamos a função que faz o filtro do service de filtro e passamos os parâmetros do formGroup do HTML feito na desestruturação acima
    this.filteredResults = this.filterUnitsService.showUnitsByFilter(this.results, showClosed, hour)
    // 
    this.unitService.setFilteredUnits(this.filteredResults)

    this.submitEvent.emit()
  }

  onClean(): void {
    console.log('clean');
    this.formGroup.reset();
  }
}
