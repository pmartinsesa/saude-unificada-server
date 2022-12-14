import { Injectable } from '@nestjs/common';

import { Web3BaseRequest } from 'src/interfaces/requests/web3BaseRequest';
import { RegisterPatientRequest } from 'src/interfaces/requests/registerPatientRequest.interface';

@Injectable()
export class PatientsFacade {
  public addDoctorOnAllowedList(web3BaseRequest: Web3BaseRequest): string {
    return 'adicionado';
  }

  public registerNewPatient(registerPatientRequest: RegisterPatientRequest): string {
    return 'novo paciente';
  }
}
