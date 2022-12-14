import { Injectable } from '@nestjs/common';

import { Web3BaseRequest } from 'src/interfaces/requests/web3BaseRequest.interface';
import { AddMedicalRecordRequest } from 'src/interfaces/requests/addMedicalRecordRequest.interface';
import { GetAllowedPatientsRequest } from 'src/interfaces/requests/getAllowedPatientsRequest.interface';

@Injectable()
export class MedicalFacade {
  
  public getAllowedPatients(getAllowedPatientsRequest: GetAllowedPatientsRequest): string {
    return 'pacientes'
  }

  public getMedicalRecords(web3BaseRequest: Web3BaseRequest): string {
    return 'prontuarios'
  }

  public addMedicalRecords(addMedicalRecordRequest: AddMedicalRecordRequest): string {
    return 'adicionado...'
  }
}
