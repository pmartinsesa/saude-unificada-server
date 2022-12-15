import { Injectable } from '@nestjs/common';

import { PatientsService } from 'src/Services/patients.service';

import { Web3BaseRequest } from 'src/Models/web3BaseRequest';
import { RegisterPatientRequest } from 'src/Models/registerPatientRequest';

@Injectable()
export class PatientsFacade {
  constructor(private readonly patientsService: PatientsService) {}

  public async registerNewPatient(registerPatientRequest: RegisterPatientRequest): Promise<any> {
    return await this.patientsService.registerPatient(registerPatientRequest);
  }
  
  public async addDoctorOnAllowedList(web3BaseRequest: Web3BaseRequest): Promise<any> {
    return await this.patientsService.addDoctorOnList(web3BaseRequest);
  }
}
