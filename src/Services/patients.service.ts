import { Injectable } from '@nestjs/common';
import { RegisterPatientRequest } from 'src/Models/registerPatientRequest';

import { Web3BaseRequest } from 'src/Models/web3BaseRequest';

import { Web3Service } from './web3.service';

@Injectable()
export class PatientsService {
  constructor(private readonly web3Service: Web3Service) {}

  public async getPatientsName(
    web3BaseRequest: Web3BaseRequest,
  ): Promise<string> {
    const contract = this.web3Service.getSmartContractInstance();

    const name = (await contract.methods
      .getPacientName(
        web3BaseRequest.patientsWallet,
        web3BaseRequest.doctorWallet,
      )
      .call()) as string;

    return name;
  }

  public async registerPatient(
    registerPatientRequest: RegisterPatientRequest
  ): Promise<any> {
    const contract = this.web3Service.getSmartContractInstance();

    const response = await contract.methods
      .setPacientName(registerPatientRequest.patientWallet, registerPatientRequest.name)
      .send({ from: registerPatientRequest.patientWallet });

    return response;
  }

  public async addDoctorOnList(web3BaseRequest: Web3BaseRequest): Promise<any> {
    const contract = this.web3Service.getSmartContractInstance();

    const response = await contract.methods
      .addDoctorOnList(
        web3BaseRequest.patientsWallet,
        web3BaseRequest.doctorWallet,
      )
      .send({ from: web3BaseRequest.patientsWallet });

    return response;
  }
}
