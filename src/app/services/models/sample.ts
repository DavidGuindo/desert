import { Service } from "./service";
import { TrialOfSample } from "./trialOfSample";

export interface Sample {
  id: number;
  idService: Service;
  clientCode: string | null;
  receptionDate: Date;
  enable: boolean;
  ensayos: TrialOfSample[];
}