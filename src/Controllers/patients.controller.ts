import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RegisterPatientRequest } from 'src/interfaces/requests/registerPatientRequest.interface';
import { Web3BaseRequest } from 'src/interfaces/requests/web3BaseRequest';

import { PatientsFacade } from 'src/Facades/patients.facade';

@ApiTags('Patients Controller')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsFacade: PatientsFacade) {}

  @Post('register-patients')
  registerPatients(
    @Body() registerPatientRequest: RegisterPatientRequest,
  ): string {
    return this.patientsFacade.registerNewPatient(registerPatientRequest);
  }

  @Post('allowed-doctor')
  allowedDoctor(@Body() web3BaseRequest: Web3BaseRequest): string {
    return this.patientsFacade.addDoctorOnAllowedList(web3BaseRequest);
  }
}
