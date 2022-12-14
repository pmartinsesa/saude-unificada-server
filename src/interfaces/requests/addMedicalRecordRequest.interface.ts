import { Web3BaseRequest } from "../../Models/web3BaseRequest";

export interface AddMedicalRecordRequest extends Web3BaseRequest {
  patientsWallet: string,
  doctorWallet: string,
  record: any
}