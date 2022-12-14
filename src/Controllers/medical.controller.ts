import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MedicalFacade } from 'src/Facades/medical.facade';

import { Web3BaseRequest } from 'src/Models/web3BaseRequest';
import { GetAllowedPatientsRequest } from 'src/Models/getAllowedPatientsRequest';
import { AddMedicalRecordRequest } from 'src/interfaces/requests/addMedicalRecordRequest.interface';

import { MedicalRecord, Patient } from 'src/types';

@ApiTags('Medical Controller')
@Controller('medical')
export class MedicalController {
  constructor(private readonly medicalFacade: MedicalFacade) {}

  @Post('get-allowed-patients')
  @HttpCode(200)
  getAllowedPatientsByDoctor(
    @Body() getAllowedPatientsRequest: GetAllowedPatientsRequest,
  ): Promise<Patient[]> {
    return this.medicalFacade.getAllowedPatients(getAllowedPatientsRequest);
  }

  @Post('get-medical-records-by-clients')
  @HttpCode(200)
  getMedicalRecordsByPatients(
    @Body() web3BaseRequest: Web3BaseRequest,
  ): Promise<MedicalRecord[]> {
    return this.medicalFacade.getMedicalRecords(web3BaseRequest);
  }

  @Post('add-medical-records-on-patients-records')
  addMedicalOnPatientsRecords(
    @Body() addMedicalRecordRequest: AddMedicalRecordRequest,
  ): string {
    return this.medicalFacade.addMedicalRecords(addMedicalRecordRequest);
  }
}
