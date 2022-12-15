import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RegisterPatientRequest } from 'src/Models/registerPatientRequest';
import { Web3BaseRequest } from 'src/Models/web3BaseRequest';

import { PatientsFacade } from 'src/Facades/patients.facade';

@ApiTags('Patients Controller')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsFacade: PatientsFacade) {}

  @Post('register-patients')
  @HttpCode(201)
  registerPatients(
    @Body() registerPatientRequest: RegisterPatientRequest,
  ): Promise<any> {
    return this.patientsFacade.registerNewPatient(registerPatientRequest);
  }

  @Post('allowed-doctor')
  @HttpCode(200)
  allowedDoctor(@Body() web3BaseRequest: Web3BaseRequest): Promise<any> {
    return this.patientsFacade.addDoctorOnAllowedList(web3BaseRequest);
  }
}
