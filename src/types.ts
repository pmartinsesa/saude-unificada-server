export type Doctor = {
  Nome: string;
  CRM: string;
}

export type Analysis = {
  Diagnostico: string;
  Prognostico: string;
  Imagens: string[];
}

export type MedicalRecord = {
  Nome: string;
  Hospitals: string;
  Medico: Doctor;
  Analise: Analysis
}