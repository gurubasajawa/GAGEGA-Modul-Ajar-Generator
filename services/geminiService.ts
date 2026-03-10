
import { GoogleGenAI, Type } from "@google/genai";
import { LessonPlan, LessonPlanRequest } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export async function generateDeepLessonPlan(params: LessonPlanRequest): Promise<LessonPlan> {
  const prompt = `
    Anda adalah Pengawas Sekolah Senior dan Pakar Desain Instruksional. 
    Buatlah Modul Ajar Mendalam (Deep Learning 8-3-3-4) yang berkualitas tinggi.
    
    DATA INPUT:
    Mata Pelajaran: ${params.subject}
    Fase: ${params.phase}
    Kelas: ${params.grade}
    Topik: ${params.topic}
    Konteks Murid: ${params.studentContext || "Umum"}

    REGULASI:
    - Gunakan Capaian Pembelajaran (CP) dari Keputusan Kepala BSKAP Nomor 046 Tahun 2025.
    - Terapkan kerangka Deep Learning 8-3-3-4 secara eksplisit.
    - Fokus pada pembelajaran Berkesadaran (Mindful), Bermakna (Meaningful), dan Menggembirakan (Joyful).

    Hasilkan output dalam format JSON sesuai struktur yang diminta.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          identifikasiMurid: {
            type: Type.OBJECT,
            properties: {
              kesiapan: { type: Type.STRING },
              minat: { type: Type.STRING },
              kebutuhanKhusus: { type: Type.STRING },
            },
            required: ["kesiapan", "minat", "kebutuhanKhusus"],
          },
          capaianPembelajaran: { type: Type.STRING },
          tujuanPembelajaran: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          dimensiProfilLulusan: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          konsepDeepLearning: {
            type: Type.OBJECT,
            properties: {
              delapanDimensi: { type: Type.STRING },
              tigaPrinsip: { type: Type.STRING },
              tigaPengalaman: { type: Type.STRING },
              empatKerangka: { type: Type.STRING },
            },
            required: ["delapanDimensi", "tigaPrinsip", "tigaPengalaman", "empatKerangka"],
          },
          desainPembelajaran: {
            type: Type.OBJECT,
            properties: {
              awal: { type: Type.ARRAY, items: { type: Type.STRING } },
              inti: { type: Type.ARRAY, items: { type: Type.STRING } },
              penutup: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["awal", "inti", "penutup"],
          },
          asesmen: {
            type: Type.OBJECT,
            properties: {
              formatif: { type: Type.STRING },
              sumatif: { type: Type.STRING },
              rubrik: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    kriteria: { type: Type.STRING },
                    baruBerkembang: { type: Type.STRING },
                    layak: { type: Type.STRING },
                    cakap: { type: Type.STRING },
                    mahir: { type: Type.STRING },
                  },
                  required: ["kriteria", "baruBerkembang", "layak", "cakap", "mahir"],
                }
              }
            },
            required: ["formatif", "sumatif", "rubrik"],
          }
        },
        required: [
          "identifikasiMurid", 
          "capaianPembelajaran", 
          "tujuanPembelajaran", 
          "dimensiProfilLulusan", 
          "konsepDeepLearning", 
          "desainPembelajaran", 
          "asesmen"
        ]
      }
    }
  });

  if (!response.text) {
    throw new Error("Gagal mendapatkan respon dari AI.");
  }

  return JSON.parse(response.text);
}
