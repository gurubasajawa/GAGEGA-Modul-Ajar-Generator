
import React, { useState } from 'react';
import { Sparkles, Download, RotateCcw, Printer, Zap, AlertCircle } from 'lucide-react';
import { generateDeepLessonPlan } from './services/geminiService';
import { LessonPlan, LessonPlanRequest } from './types';
import LessonPlanView from './components/LessonPlanView';

const PHASES = ['Fase A (Kelas 1-2)', 'Fase B (Kelas 3-4)', 'Fase C (Kelas 5-6)', 'Fase D (Kelas 7-9)', 'Fase E (Kelas 10)', 'Fase F (Kelas 11-12)'];

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lessonPlan, setLessonPlan] = useState<LessonPlan | null>(null);
  const [formData, setFormData] = useState<LessonPlanRequest>({
    subject: '',
    phase: PHASES[0],
    grade: '',
    topic: '',
    schoolName: '',
    teacherName: '',
    teacherNip: '',
    principalName: '',
    principalNip: '',
    creationDate: new Date().toISOString().split('T')[0],
    studentContext: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await generateDeepLessonPlan(formData);
      setLessonPlan(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan sistem.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setLessonPlan(null);
  };

  const handleSaveAsPdf = () => {
    const originalTitle = document.title;
    // Set a descriptive filename for the browser's "Save as PDF" dialog
    const safeSubject = formData.subject.replace(/[^a-z0-9]/gi, '_');
    const safeTopic = formData.topic.replace(/[^a-z0-9]/gi, '_');
    document.title = `Modul_Ajar_Mendalam_${safeSubject}_${safeTopic}`;
    
    window.print();
    
    // Restore original title after print dialog closes
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Header */}
      <header className="bg-gradient-to-r from-red-700 to-yellow-500 text-white py-4 shadow-md no-print sticky top-0 z-50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-inner">
              <Sparkles className="h-8 w-8 text-yellow-300 animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl font-gagega bg-gradient-to-r from-red-500 via-yellow-400 via-green-500 via-blue-500 to-purple-600 bg-clip-text text-transparent uppercase leading-none animate-gagega drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">GAGEGA</h1>
              <p className="text-white text-xs tracking-wider font-medium opacity-90 drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]">MULTI INFORMASI</p>
            </div>
          </div>

          {lessonPlan && (
            <div className="flex items-center gap-3 animate-fade-in">
               <button 
                onClick={handleSaveAsPdf}
                className="bg-slate-900 text-white hover:bg-slate-800 px-6 py-2 rounded-full text-sm font-bold shadow-lg transition-all flex items-center gap-2 group"
              >
                <Download className="h-4 w-4 group-hover:scale-110 transition-transform" />
                Simpan sebagai PDF
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        {!lessonPlan ? (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in no-print">
            <div className="bg-gradient-to-r from-yellow-300 to-white border-b border-yellow-200 p-8">
              <h2 className="text-xl font-bold text-yellow-900">Rancang Modul Ajar Baru</h2>
              <p className="text-yellow-800 text-xs mt-1 font-medium">Modul Ajar Deep Learning (8-3-3-4) berdasarkan standar kurikulum BSKAP 046/2025.</p>
              <p className="text-yellow-700 mt-2 font-medium">Lengkapi detail di bawah untuk menghasilkan Modul Ajar berbasis Deep Learning.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Mata Pelajaran</label>
                  <input 
                    required
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Contoh: Matematika, IPA"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Fase</label>
                  <select 
                    name="phase"
                    value={formData.phase}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  >
                    {PHASES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Kelas Spesifik</label>
                  <input 
                    required
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    placeholder="Contoh: Kelas 4B"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Topik / Materi</label>
                  <input 
                    required
                    name="topic"
                    value={formData.topic}
                    onChange={handleInputChange}
                    placeholder="Contoh: Buang Sampah pada Tempatnya"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Sekolah</label>
                  <input 
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleInputChange}
                    placeholder="Contoh: SDN Ngarus 02"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tanggal Pembuatan</label>
                  <input 
                    type="date"
                    name="creationDate"
                    value={formData.creationDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Guru / Penyusun</label>
                  <input 
                    name="teacherName"
                    value={formData.teacherName}
                    onChange={handleInputChange}
                    placeholder="Contoh: Budi Santoso, S.Pd"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">NIP Guru</label>
                  <input 
                    name="teacherNip"
                    value={formData.teacherNip}
                    onChange={handleInputChange}
                    placeholder="Contoh: 19800101 200501 1 001"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Kepala Sekolah</label>
                  <input 
                    name="principalName"
                    value={formData.principalName}
                    onChange={handleInputChange}
                    placeholder="Contoh: Siti Aminah, M.Pd"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">NIP Kepala Sekolah</label>
                  <input 
                    name="principalNip"
                    value={formData.principalNip}
                    onChange={handleInputChange}
                    placeholder="Contoh: 19750202 199903 2 002"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Konteks & Kebutuhan Murid (Opsional)</label>
                <textarea 
                  name="studentContext"
                  value={formData.studentContext}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Ceritakan profil singkat murid Anda..."
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                />
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="animate-blink">Sedang Merancang Strategi Mendalam...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5" />
                      <span className="animate-blink">Hasilkan Modul Ajar</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="mb-6 flex flex-wrap gap-4 no-print items-center justify-between">
              <button 
                onClick={handleReset}
                className="flex items-center gap-2 text-slate-600 hover:text-red-700 transition-colors font-medium group"
              >
                <RotateCcw className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                Buat Ulang / Ganti Materi
              </button>
              <div className="flex gap-3">
                <button 
                  onClick={() => window.print()}
                  className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
                >
                  <Printer className="h-4 w-4" />
                  Cetak Modul Ajar
                </button>
                <button 
                  onClick={handleSaveAsPdf}
                  className="bg-red-700 px-4 py-2 rounded-lg text-white font-medium hover:bg-red-800 transition-all shadow-sm flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Simpan sebagai PDF
                </button>
              </div>
            </div>
            
            <LessonPlanView plan={lessonPlan} meta={formData} />
          </div>
        )}

        {error && (
          <div className="max-w-3xl mx-auto mt-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3 no-print">
            <AlertCircle className="h-6 w-6" />
            <p className="font-medium">{error}</p>
          </div>
        )}
      </main>

      <footer className="mt-auto py-12 bg-slate-100 border-t border-slate-200 no-print">
        <div className="container mx-auto px-4 text-center text-slate-500 text-[11px] sm:text-sm">
          <p className="whitespace-nowrap overflow-hidden text-ellipsis">© 2026 GAGEGA multi informasi | mazt370@gmail.com</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
