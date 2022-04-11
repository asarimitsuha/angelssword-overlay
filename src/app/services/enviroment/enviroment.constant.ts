import { Enviroment } from "./enviroment.interface";

export const DevEnviroment: Enviroment = {
    webDomain: '',
    apiDomain: 'http://localhost:4000',
    redirectUrl: 'http://localhost:4200/token'
}

export const ProdEnviroment: Enviroment = {
    webDomain: '',
    apiDomain: 'https://leaflit-overlay.angelssword.com/api',
    redirectUrl: 'https://leaflit-overlay.angelssword.com/token'
}
