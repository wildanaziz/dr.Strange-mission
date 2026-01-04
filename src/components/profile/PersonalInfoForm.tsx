import React from 'react';
import { User } from 'lucide-react';

interface PersonalInfoData {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  gender: string;
  grade: string;
}

interface PersonalInfoFormProps {
  data: PersonalInfoData;
  onChange: (field: string, value: string) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-neutral-text mb-2">
          Nama Lengkap
        </label>
        <input
          type="text"
          value={data.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
          className="w-full px-4 py-3 border border-neutral-border rounded-xl bg-white text-secondary-dark text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>

      {/* Username */}
      <div>
        <label className="block text-sm font-medium text-neutral-text mb-2">
          Username
        </label>
        <input
          type="text"
          value={data.username}
          onChange={(e) => onChange('username', e.target.value)}
          className="w-full px-4 py-3 border border-neutral-border rounded-xl bg-white text-secondary-dark text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-neutral-text mb-2">
          Email
        </label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => onChange('email', e.target.value)}
          className="w-full px-4 py-3 border border-neutral-border rounded-xl bg-white text-secondary-dark text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-neutral-text mb-2">
          No. Telepon
        </label>
        <input
          type="tel"
          value={data.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          className="w-full px-4 py-3 border border-neutral-border rounded-xl bg-white text-secondary-dark text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>

      {/* Gender with icon prefix */}
      <div>
        <label className="block text-sm font-medium text-neutral-text mb-2">
          Jenis Kelamin
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-text/50" />
          <input
            type="text"
            value={data.gender}
            onChange={(e) => onChange('gender', e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-neutral-border rounded-xl bg-white text-secondary-dark text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Grade/Class */}
      <div>
        <label className="block text-sm font-medium text-neutral-text mb-2">
          Kelas
        </label>
        <input
          type="text"
          value={data.grade}
          onChange={(e) => onChange('grade', e.target.value)}
          className="w-full px-4 py-3 border border-neutral-border rounded-xl bg-white text-secondary-dark text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;
