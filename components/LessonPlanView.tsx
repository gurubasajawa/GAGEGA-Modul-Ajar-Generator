
import React from 'react';
import { LessonPlan, LessonPlanRequest } from '../types';

interface LessonPlanViewProps {
  plan: LessonPlan;
  meta: LessonPlanRequest;
}

const LessonPlanView: React.FC<LessonPlanViewProps> = ({ plan, meta }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-100">
      {/* Document Header */}
      <div className="bg-gradient-to-r from-red-600 to-yellow-400 border-b border-red-200 p-10 print:p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="text-left">
             <h3 className="text-white font-bold text-lg uppercase tracking-tight">{meta.schoolName || 'NAMA SEKOLAH'}</h3>
             <p className="text-red-50 text-xs font-medium">Penyusun: {meta.teacherName || 'Nama Guru'}</p>
             {meta.teacherNip && <p className="text-red-50 text-xs font-medium">NIP: {meta.teacherNip}</p>}
          </div>
          <div className="text-right">
             <div className="text-[10px] text-slate-400 font-mono">DOC-ID: {Math.random().toString(36).substring(7).toUpperCase()}</div>
          </div>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-3xl font-serif text-white uppercase">MODUL AJAR MENDALAM</h2>
          <p className="text-yellow-100 font-bold tracking-widest text-sm italic">Mindful • Meaningful • Joyful</p>
          <div className="w-24 h-1 bg-yellow-300 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mt-10 text-sm">
          <div className="flex justify-between border-b border-red-300 pb-1">
            <span className="font-bold text-white">Mata Pelajaran:</span>
            <span className="text-white">{meta.subject}</span>
          </div>
          <div className="flex justify-between border-b border-red-300 pb-1">
            <span className="font-bold text-white">Fase / Kelas:</span>
            <span className="text-white">{meta.phase} / {meta.grade}</span>
          </div>
          <div className="flex justify-between border-b border-red-300 pb-1">
            <span className="font-bold text-white">Topik Utama:</span>
            <span className="text-white">{meta.topic}</span>
          </div>
          <div className="flex justify-between border-b border-red-300 pb-1">
            <span className="font-bold text-white">Dasar Hukum:</span>
            <span className="text-white italic">BSKAP No. 046 Tahun 2025</span>
          </div>
        </div>
      </div>

      <div className="p-10 space-y-12 text-slate-800 leading-relaxed">
        {/* Section 1: Identifikasi Murid */}
        <section>
          <div className="flex items-center gap-3 mb-4 bg-gradient-to-r from-yellow-300 to-white p-2 rounded-lg border border-yellow-100">
            <div className="bg-yellow-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm">1</div>
            <h3 className="text-xl font-bold text-yellow-900">Identifikasi Murid (Diagnostik)</h3>
          </div>
          <div className="bg-slate-50 rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold text-red-700 text-sm uppercase mb-2">Kesiapan Belajar</h4>
              <p className="text-sm">{plan.identifikasiMurid.kesiapan}</p>
            </div>
            <div>
              <h4 className="font-bold text-red-700 text-sm uppercase mb-2">Minat & Profil</h4>
              <p className="text-sm">{plan.identifikasiMurid.minat}</p>
            </div>
            <div>
              <h4 className="font-bold text-red-700 text-sm uppercase mb-2">Kebutuhan Khusus</h4>
              <p className="text-sm">{plan.identifikasiMurid.kebutuhanKhusus}</p>
            </div>
          </div>
        </section>

        {/* Section 2: CP & TP */}
        <section>
          <div className="flex items-center gap-3 mb-4 bg-gradient-to-r from-yellow-300 to-white p-2 rounded-lg border border-yellow-100">
            <div className="bg-yellow-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm">2</div>
            <h3 className="text-xl font-bold text-yellow-900">Capaian & Tujuan Pembelajaran</h3>
          </div>
          <div className="space-y-4">
            <div className="border-l-4 border-red-300 pl-4 py-1">
              <h4 className="font-bold text-slate-700 mb-1">Capaian Pembelajaran (CP)</h4>
              <p className="text-sm italic">{plan.capaianPembelajaran}</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-700 mb-2">Tujuan Pembelajaran (TP)</h4>
              <ul className="list-disc list-inside space-y-1 text-sm pl-4">
                {plan.tujuanPembelajaran.map((tp, i) => <li key={i}>{tp}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Profil Lulusan */}
        <section>
          <div className="flex items-center gap-3 mb-4 bg-gradient-to-r from-yellow-300 to-white p-2 rounded-lg border border-yellow-100">
            <div className="bg-yellow-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm">3</div>
            <h3 className="text-xl font-bold text-yellow-900">Dimensi Profil Lulusan</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {plan.dimensiProfilLulusan.map((dim, i) => (
              <span key={i} className="bg-red-100 text-red-700 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                {dim}
              </span>
            ))}
          </div>
        </section>

        {/* Section 4: Konsep Deep Learning */}
        <section className="break-inside-avoid">
          <div className="flex items-center gap-3 mb-6 bg-gradient-to-r from-yellow-300 to-white p-2 rounded-lg border border-yellow-100">
            <div className="bg-yellow-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm">4</div>
            <h3 className="text-xl font-bold text-yellow-900">Kerangka Deep Learning (8-3-3-4)</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
              <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2 text-sm">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-md flex items-center justify-center text-xs italic">8</span>
                Dimensi Fokus
              </h4>
              <p className="text-[11px] leading-relaxed text-slate-700">{plan.konsepDeepLearning.delapanDimensi}</p>
            </div>
            <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100">
              <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-2 text-sm">
                <span className="w-6 h-6 bg-emerald-600 text-white rounded-md flex items-center justify-center text-xs italic">3</span>
                Prinsip (M-M-J)
              </h4>
              <p className="text-[11px] leading-relaxed text-slate-700">{plan.konsepDeepLearning.tigaPrinsip}</p>
            </div>
            <div className="bg-amber-50 p-5 rounded-xl border border-amber-100">
              <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-2 text-sm">
                <span className="w-6 h-6 bg-amber-600 text-white rounded-md flex items-center justify-center text-xs italic">3</span>
                Pengalaman Belajar
              </h4>
              <p className="text-[11px] leading-relaxed text-slate-700">{plan.konsepDeepLearning.tigaPengalaman}</p>
            </div>
            <div className="bg-rose-50 p-5 rounded-xl border border-rose-100">
              <h4 className="font-bold text-rose-800 mb-2 flex items-center gap-2 text-sm">
                <span className="w-6 h-6 bg-rose-600 text-white rounded-md flex items-center justify-center text-xs italic">4</span>
                Kerangka Kerja
              </h4>
              <p className="text-[11px] leading-relaxed text-slate-700">{plan.konsepDeepLearning.empatKerangka}</p>
            </div>
          </div>
        </section>

        {/* Section 5: Desain Pembelajaran */}
        <section>
          <div className="flex items-center gap-3 mb-6 bg-gradient-to-r from-yellow-300 to-white p-2 rounded-lg border border-yellow-100">
            <div className="bg-yellow-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm">5</div>
            <h3 className="text-xl font-bold text-yellow-900">Desain Instruksional</h3>
          </div>
          
          <div className="space-y-8">
            <div className="relative pl-8 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-0 before:w-0.5 before:bg-slate-200">
              <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-slate-100 border-2 border-red-400 flex items-center justify-center text-red-600 font-bold text-[10px]">A</div>
              <h4 className="font-bold text-red-800 mb-2">Kegiatan Awal (Mindful)</h4>
              <ul className="space-y-2">
                {plan.desainPembelajaran.awal.map((step, i) => (
                  <li key={i} className="text-sm flex gap-3">
                    <span className="text-slate-400">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative pl-8 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-0 before:w-0.5 before:bg-slate-200">
              <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-red-700 flex items-center justify-center text-white font-bold text-[10px]">B</div>
              <h4 className="font-bold text-red-800 mb-2">Kegiatan Inti (Meaningful)</h4>
              <ul className="space-y-3">
                {plan.desainPembelajaran.inti.map((step, i) => (
                  <li key={i} className="text-sm flex gap-3">
                    <span className="text-red-400 font-bold">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative pl-8">
              <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-[10px]">C</div>
              <h4 className="font-bold text-emerald-800 mb-2">Kegiatan Penutup (Joyful)</h4>
              <ul className="space-y-2">
                {plan.desainPembelajaran.penutup.map((step, i) => (
                  <li key={i} className="text-sm flex gap-3">
                    <span className="text-emerald-400">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Asesmen & Rubrik */}
        <section className="break-inside-avoid">
          <div className="flex items-center gap-3 mb-6 bg-gradient-to-r from-yellow-300 to-white p-2 rounded-lg border border-yellow-100">
            <div className="bg-yellow-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm">6</div>
            <h3 className="text-xl font-bold text-yellow-900">Asesmen & Rubrik</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border border-slate-200 rounded-xl p-5">
              <h4 className="font-bold text-slate-700 mb-2 text-sm uppercase tracking-wide">Formatif</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{plan.asesmen.formatif}</p>
            </div>
            <div className="border border-slate-200 rounded-xl p-5">
              <h4 className="font-bold text-slate-700 mb-2 text-sm uppercase tracking-wide">Sumatif</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{plan.asesmen.sumatif}</p>
            </div>
          </div>

          <div className="overflow-x-auto border rounded-xl border-slate-200">
            <table className="w-full text-[10px] text-left border-collapse">
              <thead className="bg-slate-50 text-slate-700 uppercase border-b border-slate-200">
                <tr>
                  <th className="p-3 w-1/5 border-r border-slate-200">Kriteria</th>
                  <th className="p-3 border-r border-slate-200">Baru Berkembang</th>
                  <th className="p-3 border-r border-slate-200">Layak</th>
                  <th className="p-3 border-r border-slate-200">Cakap</th>
                  <th className="p-3">Mahir</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                {plan.asesmen.rubrik.map((r, i) => (
                  <tr key={i} className="border-b border-slate-100 last:border-0">
                    <td className="p-3 font-bold bg-slate-50 border-r border-slate-200 text-slate-800">{r.kriteria}</td>
                    <td className="p-3 border-r border-slate-200">{r.baruBerkembang}</td>
                    <td className="p-3 border-r border-slate-200">{r.layak}</td>
                    <td className="p-3 border-r border-slate-200 font-medium text-slate-900">{r.cakap}</td>
                    <td className="p-3 bg-red-50/50 font-semibold text-red-900">{r.mahir}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div className="bg-slate-50 p-10 border-t border-slate-100 flex justify-between items-end">
        <div className="text-[10px] text-slate-400 uppercase tracking-tighter">
          Generated via GAGEGA multi informasi <br />
          {meta.creationDate ? new Date(meta.creationDate).toLocaleDateString('id-ID', { dateStyle: 'full' }) : new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}
        </div>
        <div className="flex flex-col items-center gap-12 text-center text-sm">
          <p className="font-bold text-slate-800">Mengetahui, <br /> Kepala {meta.schoolName || 'Sekolah'}</p>
          <div className="flex flex-col items-center">
            <span className="font-bold text-slate-800 whitespace-nowrap">{meta.principalName || 'Nama Kepala Sekolah'}</span>
            {meta.principalNip && <span className="text-xs text-slate-600 whitespace-nowrap">NIP: {meta.principalNip}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPlanView;
