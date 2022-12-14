import { Web3BaseRequest } from "./web3BaseRequest";

export interface AddMedicalRecordRequest extends Web3BaseRequest {
  patientsWallet: string,
  doctorWallet: string,
  record: any
}