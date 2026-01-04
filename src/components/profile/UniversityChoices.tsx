import React from 'react';

interface UniversityChoice {
  university: string;
  major: string;
}

interface UniversityChoicesProps {
  choice1: UniversityChoice;
  choice2: UniversityChoice;
  onChange: (choice: 'choice1' | 'choice2', field: 'university' | 'major', value: string) => void;
}

const UniversityChoices: React.FC<UniversityChoicesProps> = ({
  choice1,
  choice2,
  onChange,
}) => {
  return (
    <div className="space-y-8">
      {/* Pilihan 1 */}
      <div>
        <h3 className="text-lg font-bold text-secondary-dark mb-4">Pilihan 1</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-text mb-2">
              Universitas
            </label>
            <input
              type="text"
              value={choice1.university}
              onChange={(e) => onChange('choice1', 'university', e.target.value)}
              className="w-full px-4 py-3 border border-neutral-border rounded-xl bg-white text-secondary-dark font-bold text-center uppercase focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-text mb-2">
              Jurusan
            </label>
            <input
              type="text"
              value={choice1.major}
              onChange={(e) => onChange('choice1', 'major', e.target.value)}
              className="w-full px-4 py-3 border border-neutral-border rounded-xl bg-white text-secondary-dark text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* Pilihan 2 */}
      <div>
        <h3 className="text-lg font-bold text-secondary-dark mb-4">Pilihan 2</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-text mb-2">
              Universitas
            </label>
            <input
              type="text"
              value={choice2.university}
              onChange={(e) => onChange('choice2', 'university', e.target.value)}
              className="w-full px-4 py-3 border border-neutral-border rounded-xl bg-white text-secondary-dark font-bold text-center uppercase focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-text mb-2">
              Jurusan
            </label>
            <input
              type="text"
              value={choice2.major}
              onChange={(e) => onChange('choice2', 'major', e.target.value)}
              className="w-full px-4 py-3 border border-neutral-border rounded-xl bg-white text-secondary-dark text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityChoices;
