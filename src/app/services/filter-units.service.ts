import { Injectable } from '@angular/core';
import { Location } from '../types/location.interface';


// tipos criados para acessar as propriedades do objeto abaixo(obj utilizado para desestruturar a resp da api)
type HOURS_INDEX = 'morning' | 'afternoon' | 'night';

const OPENING_HOURS = {
  morning: {
    first: '06',
    last: '12',
  },
  afternoon: {
    first: '12',
    last: '18',
  },
  night: {
    first: '18',
    last: '23',
  },
};
@Injectable({
  providedIn: 'root'
})


export class FilterUnitsService {

  constructor() { }

  transformWeekDayNumberToString(weekday: number) {
    switch (weekday) {
      case 0:
        return 'Dom.';
      case 6:
        return 'Sáb.';
      default:
        return 'Seg. à Sex.';
    }
  }

  filterUnits(unit: Location, open_hour: string, close_hour: string): boolean {
    if(!unit.schedules){
      return true
    }
    let open_hour_filter = parseInt(open_hour, 10);
    let close_hour_filter = parseInt(close_hour, 10);
    // retorna int onde 0 é domingo
    let todays_weekday = this.transformWeekDayNumberToString(new Date().getDay());
    for (let i = 0; i < unit.schedules.length; i++) {
      let schedule_hour = unit.schedules[i].hour;
      let schedule_weekdays = unit.schedules[i].weekdays;
      if (todays_weekday === schedule_weekdays) {
        if(schedule_hour !== 'Fechada') {
          let [unit_open_hour, unit_close_hour] = schedule_hour.split(' às ')
          let unit_open_hour_int = parseInt(unit_open_hour.replace('h', ''), 10)
          let unit_close_hour_int = parseInt(unit_close_hour.replace('h', ''), 10)
          // se o horário daquela academia for menor que o horário fornecido no filtro, ou seja, academia abre 9, horário do filtro 8 ou 9, logo, estará fechada
          // && se o horário de fechamento da academia for maior ou igual ao horário de fechamento do filtro, ou seja, fechamento 22, filtro 23, logo, fechada
          if(unit_open_hour_int <= open_hour_filter && unit_close_hour_int >= close_hour_filter) {
            return true
          } else {
            return false
          }
        }
      }
    }
    return false;
  }

  // este método recebe, através do formsComponent, os parâmetros do input do usuário, através do formGroup
  showUnitsByFilter(results: Location[], showClosed: boolean, hour: string) {
    let showOpenResults = results;

    // condição anterior: if (this.formGroup.value.showClosed === false)
    // antes a gente pegava o valor diretamente do input do usuário através do formGroup
    // agora recebemos essa informação através do parâmetro deste método
    if (showClosed === false) {
      showOpenResults = results.filter((unit) => unit.opened === true);                                           
    } 
    // aqui teremos o mesmo comportamento do comentário acima
    if(hour) {
      const OPEN_HOUR = OPENING_HOURS[hour as HOURS_INDEX].first;
      const CLOSE_HOUR = OPENING_HOURS[hour as HOURS_INDEX].last;

      // código anterior: this.filteredResults = showOpenResults.filter(unit => this.filterUnits(unit, OPEN_HOUR, CLOSE_HOUR))
                                        // esses parâmetros são tratados dentro de filterUnits()
      return showOpenResults.filter(unit => this.filterUnits(unit, OPEN_HOUR, CLOSE_HOUR))
    } else {
      return showOpenResults
    }
  }
}
