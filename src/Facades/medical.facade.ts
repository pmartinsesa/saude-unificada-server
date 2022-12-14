import { Injectable } from '@nestjs/common';

import { MedicalService } from 'src/Services/medical.service';

import { Web3BaseRequest } from 'src/Models/web3BaseRequest';
import { AddMedicalRecordRequest } from 'src/interfaces/requests/addMedicalRecordRequest.interface';
import { GetAllowedPatientsRequest } from 'src/interfaces/requests/getAllowedPatientsRequest.interface';

import { MedicalRecord } from 'src/types';

@Injectable()
export class MedicalFacade {
  constructor(private readonly medicalService: MedicalService) {}

  public getAllowedPatients(
    getAllowedPatientsRequest: GetAllowedPatientsRequest,
  ): string {
    return 'pacientes';
  }

  public async getMedicalRecords(
    web3BaseRequest: Web3BaseRequest,
  ): Promise<MedicalRecord[]> {
    const records = await this.medicalService.getRecords(web3BaseRequest);
    const parsedRecords = records.map(
      this.convertMedicalRecords
    );

    return parsedRecords;
  }

  public addMedicalRecords(
    addMedicalRecordRequest: AddMedicalRecordRequest,
  ): string {
    return 'adicionado...';
  }

  private convertMedicalRecords(stringfiedRecord: string): MedicalRecord {
      return JSON.parse(stringfiedRecord) as MedicalRecord
  }
}

