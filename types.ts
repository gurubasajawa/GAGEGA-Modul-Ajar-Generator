
export interface LessonPlanRequest {
  subject: string;
  phase: string;
  topic: string;
  grade: string;
  schoolName?: string;
  teacherName?: string;
  teacherNip?: string;
  principalName?: string;
  principalNip?: string;
  creationDate?: string;
  studentContext?: string;
}

export interface RubricEntry {
  kriteria: string;
  baruBerkembang: string;
  layak: string;
  cakap: string;
  mahir: string;
}

export interface LessonPlan {
  identifikasiMurid: {
    kesiapan: string;
    minat: string;
    kebutuhanKhusus: string;
  };
  capaianPembelajaran: string;
  tujuanPembelajaran: string[];
  dimensiProfilLulusan: string[];
  konsepDeepLearning: {
    delapanDimensi: string;
    tigaPrinsip: string;
    tigaPengalaman: string;
    empatKerangka: string;
  };
  desainPembelajaran: {
    awal: string[];
    inti: string[];
    penutup: string[];
  };
  asesmen: {
    formatif: string;
    sumatif: string;
    rubrik: RubricEntry[];
  };
}
