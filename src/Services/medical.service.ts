import { Injectable } from '@nestjs/common';

import { Web3BaseRequest } from 'src/Models/web3BaseRequest';
import { AddMedicalRecordRequest } from 'src/Models/addMedicalRecordRequest';
import { GetAllowedPatientsRequest } from 'src/Models/getAllowedPatientsRequest';

import { Web3Service } from './web3.service';

@Injectable()
export class MedicalService {
  constructor(private readonly web3Service: Web3Service) {}

  public async getPatients(
    getAllowedPatientsRequest: GetAllowedPatientsRequest,
  ): Promise<Array<string>> {
    const contract = this.web3Service.getSmartContractInstance();

    const patientsWallets = (await contract.methods
      .getAllAuthorizedPacientsByDoctor(getAllowedPatientsRequest.doctorWallet)
      .call()) as Array<string>;

    return patientsWallets;
  }

  public async getRecords(
    web3BaseRequest: Web3BaseRequest,
  ): Promise<Array<string>> {
    const contract = this.web3Service.getSmartContractInstance();
    
    const medicalRecords = (await contract.methods
      .getMedicalRecord(
        web3BaseRequest.patientsWallet,
        web3BaseRequest.doctorWallet,
      )
      .call()) as Array<string>;
 
      return medicalRecords;
  }

  public async addRecord(
    addRecordRequest: AddMedicalRecordRequest,
  ): Promise<any> {
    const contract = this.web3Service.getSmartContractInstance();

    const response = await contract.methods
      .addMedicalRecord(
        addRecordRequest.patientsWallet,
        addRecordRequest.doctorWallet,
        JSON.stringify(addRecordRequest.record),
      )
      .send({ from: addRecordRequest.doctorWallet, gas: 100000000 } );

    return response;
  }
}
