import { Sample } from "./sample";
import { StateService } from "./stateService.enum";
export interface Service {
    id: string;
    client: string;
    startDate: Date | string; 
    endDate: Date | string;
    observations: string;
    reportPDF: string;
    reportWord: string;
    signedRequest: string;
    totalPrice: number;
    urgent: boolean;
    nodo: number;
    enable: boolean;
    state: StateService;
    samples: Sample[]
}
