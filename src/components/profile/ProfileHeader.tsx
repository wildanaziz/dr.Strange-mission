import React from 'react';
import { GraduationCap, Building, Pencil } from 'lucide-react';

interface ProfileHeaderProps {
  avatarUrl?: string;
  name: string;
  major: string;
  university: string;
  onEditAvatar: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  avatarUrl,
  name,
  major,
  university,
  onEditAvatar,
}) => {
  return (
    <div className="flex items-center gap-6 pb-6 border-b border-primary/30">
      {/* Avatar with edit button */}
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-primary-light border-4 border-primary flex items-center justify-center overflow-hidden">
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-4xl text-primary font-bold">
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        {/* Edit button positioned absolutely */}
        <button
          onClick={onEditAvatar}
          className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary-hover transition-colors"
        >
          <Pencil className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* User Info */}
      <div>
        <h1 className="text-2xl font-bold text-secondary-dark">{name}</h1>
        <div className="flex items-center gap-2 text-neutral-text mt-1">
          <GraduationCap className="w-4 h-4 text-accent" />
          <span>{major}</span>
        </div>
        <div className="flex items-center gap-2 text-neutral-text mt-1">
          <Building className="w-4 h-4 text-primary" />
          <span>{university}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
