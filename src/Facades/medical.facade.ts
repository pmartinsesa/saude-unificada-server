import { Injectable } from '@nestjs/common';

import { MedicalService } from 'src/Services/medical.service';

import { Web3BaseRequest } from 'src/Models/web3BaseRequest';
import { AddMedicalRecordRequest } from 'src/Models/addMedicalRecordRequest';
import { GetAllowedPatientsRequest } from 'src/Models/getAllowedPatientsRequest';

import { MedicalRecord, Patient } from 'src/types';
import { PatientsService } from 'src/Services/patients.service';

@Injectable()
export class MedicalFacade {
  constructor(
    private readonly medicalService: MedicalService,
    private readonly patientsService: PatientsService,
  ) {}

  public async getAllowedPatients(
    getAllowedPatientsRequest: GetAllowedPatientsRequest,
  ): Promise<Patient[]> {
    const patientWallets = await this.medicalService.getPatients(
      getAllowedPatientsRequest,
    );

    const parsedPatients = await Promise.all(
      patientWallets.map(
        async (patientWallet) =>
          await this.convertPatientWallets(
            patientWallet,
            getAllowedPatientsRequest.doctorWallet,
          ),
      ),
    );

    return parsedPatients;
  }

  public async getMedicalRecords(
    web3BaseRequest: Web3BaseRequest,
  ): Promise<MedicalRecord[]> {
    const records = await this.medicalService.getRecords(web3BaseRequest);

    console.log(records);
    const parsedRecords = records.map(this.convertMedicalRecords);

    return parsedRecords;
  }

  public async addMedicalRecords(
    addMedicalRecordRequest: AddMedicalRecordRequest,
  ): Promise<any> {
    return await this.medicalService.addRecord(addMedicalRecordRequest);
  }

  private convertMedicalRecords(stringfiedRecord: string): MedicalRecord {
    return JSON.parse(stringfiedRecord) as MedicalRecord;
  }

  private async convertPatientWallets(
    patientWallet: string,
    doctorWallet: string,
  ): Promise<Patient> {
    const web3Resquest = new Web3BaseRequest();
    web3Resquest.doctorWallet = doctorWallet;
    web3Resquest.patientsWallet = patientWallet;

    return {
      Nome:
        await this.patientsService.getPatientsName(web3Resquest) ||
        'Sem Nome',
      Carteira: patientWallet,
    };
  }
}
