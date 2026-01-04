import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordSectionProps {
  onPasswordChange?: (currentPassword: string, newPassword: string, confirmPassword: string) => void;
}

const PasswordSection: React.FC<PasswordSectionProps> = ({ onPasswordChange }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Show/hide password toggles
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="border border-neutral-border rounded-2xl p-6">
      <h3 className="text-lg font-bold text-secondary-dark mb-6">Ubah Kata Sandi</h3>
      
      <div className="space-y-4">
        {/* Current Password */}
        <div>
          <label className="block text-sm font-medium text-neutral-text mb-2">
            Kata Sandi Saat Ini
          </label>
          <div className="relative">
            <input
              type={showCurrent ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Masukkan kata sandi Anda saat ini"
              className="w-full px-4 py-3 pr-12 border border-neutral-border rounded-xl bg-white text-secondary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-neutral-text/50"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-text/50 hover:text-neutral-text transition-colors"
            >
              {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-neutral-text mb-2">
            Kata Sandi Baru
          </label>
          <div className="relative">
            <input
              type={showNew ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Masukkan kata sandi baru Anda"
              className="w-full px-4 py-3 pr-12 border border-neutral-border rounded-xl bg-white text-secondary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-neutral-text/50"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-text/50 hover:text-neutral-text transition-colors"
            >
              {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block text-sm font-medium text-neutral-text mb-2">
            Ketik Ulang Kata Sandi Baru
          </label>
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Konfirmasi kata sandi baru Anda"
              className="w-full px-4 py-3 pr-12 border border-neutral-border rounded-xl bg-white text-secondary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-neutral-text/50"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-text/50 hover:text-neutral-text transition-colors"
            >
              {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordSection;
