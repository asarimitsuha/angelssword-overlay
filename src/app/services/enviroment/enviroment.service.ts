import { Injectable, isDevMode } from '@angular/core';
import { DevEnviroment, ProdEnviroment } from './enviroment.constant';
import { Enviroment } from './enviroment.interface';

@Injectable({
  providedIn: 'root'
})
export class EnviromentService {

  constructor() { }

  get(): Enviroment {
    if (isDevMode()) {
      return DevEnviroment;
    } else {
      return ProdEnviroment;
    }
  }
}
