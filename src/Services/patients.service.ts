import { Injectable } from '@nestjs/common';
import { RegisterPatientRequest } from 'src/interfaces/requests/registerPatientRequest.interface';

import { Web3BaseRequest } from 'src/interfaces/requests/web3BaseRequest';

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
      .setPacientName(registerPatientRequest.wallet, registerPatientRequest.name)
      .send({ from: registerPatientRequest.wallet });

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
