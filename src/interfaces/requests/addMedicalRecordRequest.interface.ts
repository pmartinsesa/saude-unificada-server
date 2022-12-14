import { Web3BaseRequest } from "./web3BaseRequest.interface";

export interface AddMedicalRecordRequest extends Web3BaseRequest {
  patientsWallet: string,
  doctorWallet: string,
  record: any
}