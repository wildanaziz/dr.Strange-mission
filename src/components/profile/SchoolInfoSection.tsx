import React from 'react';

interface SchoolInfoData {
  province: string;
  city: string;
  school: string;
  curriculum: string;
  major: string;
}

interface SchoolInfoSectionProps {
  data: SchoolInfoData;
  onChange: (field: string, value: string) => void;
}

const SchoolInfoSection: React.FC<SchoolInfoSectionProps> = ({ data, onChange }) => {
  return (
    <div className="bg-primary-light/50 rounded-2xl p-6 border border-primary/20">
      <h3 className="text-lg font-bold text-secondary-dark mb-6">Sekolah</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Province */}
        <div>
          <label className="block text-sm font-medium text-neutral-text mb-2">
            Provinsi
          </label>
          <input
            type="text"
            value={data.province}
            onChange={(e) => onChange('province', e.target.value)}
            className="w-full px-4 py-3 border border-primary/30 rounded-xl bg-white text-secondary-dark text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-neutral-text mb-2">
            Kota/Kab.
          </label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => onChange('city', e.target.value)}
            className="w-full px-4 py-3 border border-primary/30 rounded-xl bg-white text-secondary-dark text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        {/* School */}
        <div>
          <label className="block text-sm font-medium text-neutral-text mb-2">
            Sekolah
          </label>
          <input
            type="text"
            value={data.school}
            onChange={(e) => onChange('school', e.target.value)}
            className="w-full px-4 py-3 border border-primary/30 rounded-xl bg-white text-secondary-dark text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        {/* Curriculum */}
        <div>
          <label className="block text-sm font-medium text-neutral-text mb-2">
            Kurikulum
          </label>
          <input
            type="text"
            value={data.curriculum}
            onChange={(e) => onChange('curriculum', e.target.value)}
            className="w-full px-4 py-3 border border-primary/30 rounded-xl bg-white text-secondary-dark text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        {/* Major - Full Width (spans 2 columns) */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-neutral-text mb-2">
            Jurusan
          </label>
          <input
            type="text"
            value={data.major}
            onChange={(e) => onChange('major', e.target.value)}
            className="w-full px-4 py-3 border border-primary/30 rounded-xl bg-white text-secondary-dark text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default SchoolInfoSection;
