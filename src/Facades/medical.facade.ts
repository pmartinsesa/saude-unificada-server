import { Injectable } from '@nestjs/common';

import { MedicalService } from 'src/Services/medical.service';

import { Web3BaseRequest } from 'src/interfaces/requests/web3BaseRequest';
import { AddMedicalRecordRequest } from 'src/interfaces/requests/addMedicalRecordRequest.interface';
import { GetAllowedPatientsRequest } from 'src/interfaces/requests/getAllowedPatientsRequest.interface';

@Injectable()
export class MedicalFacade {
  constructor(private readonly medicalService: MedicalService) {}
  
  public getAllowedPatients(getAllowedPatientsRequest: GetAllowedPatientsRequest): string {
    return 'pacientes'
  }

  public async getMedicalRecords(web3BaseRequest: Web3BaseRequest): Promise<any> {
    const records = await this.medicalService.getRecords(web3BaseRequest);
    return records;  
  }

  public addMedicalRecords(addMedicalRecordRequest: AddMedicalRecordRequest): string {
    return 'adicionado...'
  }
}
