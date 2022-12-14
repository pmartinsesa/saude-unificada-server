export type Doctor = {
  Nome: string;
  CRM: string;
}

export type Patient = {
  Nome: string;
  Carteira: string;
}

export type Analysis = {
  Diagnostico: string;
  Prognostico: string;
  Imagens: string[];
}

export type MedicalRecord = {
  Nome: string;
  Hospital: string;
  Medico: Doctor;
  Analise: Analysis
}