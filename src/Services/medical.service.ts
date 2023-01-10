import { Injectable } from '@nestjs/common';

import { BlockchainInstance } from 'src/types';
import { Web3BaseRequest } from 'src/Models/web3BaseRequest';
import { AddMedicalRecordRequest } from 'src/Models/addMedicalRecordRequest';
import { GetAllowedPatientsRequest } from 'src/Models/getAllowedPatientsRequest';

import { Web3Service } from './web3.service';

import { File } from 'web3.storage';
import { uuid } from 'uuidv4';

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
    const blockchainRecord = await this.postOnIPFS(addRecordRequest);

    const contract = this.web3Service.getSmartContractInstance();
    const response = await contract.methods
      .addMedicalRecord(
        addRecordRequest.patientsWallet,
        addRecordRequest.doctorWallet,
        JSON.stringify(blockchainRecord),
      )
      .send({ from: addRecordRequest.doctorWallet, gas: 300000 });

    return response;
  }

  private async postOnIPFS(
    addRecordRequest: AddMedicalRecordRequest,
  ): Promise<BlockchainInstance> {
    const client = this.web3Service.createWeb3StorageContract();

    const clientRecord = JSON.stringify(addRecordRequest.record);
    const fileName = `${addRecordRequest.patientsWallet}-${uuid()}.json`;

    const file = [
      new File([clientRecord], fileName, { type: 'application/json' }),
    ];
    const cid = await client.put(file);

    return {
      cid,
      fileName,
    };
  }
}
