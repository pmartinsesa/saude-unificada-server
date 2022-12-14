import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Web3BaseRequest } from 'src/Models/web3BaseRequest';

import { MedicalFacade } from 'src/Facades/medical.facade';
import { AddMedicalRecordRequest } from 'src/interfaces/requests/addMedicalRecordRequest.interface';
import { GetAllowedPatientsRequest } from 'src/interfaces/requests/getAllowedPatientsRequest.interface';

@ApiTags('Medical Controller')
@Controller('medical')
export class MedicalController {
  constructor(private readonly medicalFacade: MedicalFacade) {}

  @Post('get-allowed-patients')
  getAllowedPatientsByDoctor(
    @Body() getAllowedPatientsRequest: GetAllowedPatientsRequest,
  ): string {
    // tem que usar o get patient name
    return this.medicalFacade.getAllowedPatients(getAllowedPatientsRequest);
  }

  @Post('get-medical-records-by-clients')
  getMedicalRecordsByPatients(
    @Body() web3BaseRequest: Web3BaseRequest,
  ): Promise<any> {
    return this.medicalFacade.getMedicalRecords(web3BaseRequest);
  }

  @Post('add-medical-records-on-patients-records')
  addMedicalOnPatientsRecords(
    @Body() addMedicalRecordRequest: AddMedicalRecordRequest,
  ): string {
    return this.medicalFacade.addMedicalRecords(addMedicalRecordRequest);
  }
}
