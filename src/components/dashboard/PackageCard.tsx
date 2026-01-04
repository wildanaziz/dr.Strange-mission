import React from 'react';
import { Calendar } from 'lucide-react';

interface PackageCardProps {
  name: string;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  dateRange?: string;
  description?: string;
  onRegister: () => void;
}

const PackageCard: React.FC<PackageCardProps> = ({
  name,
  title,
  originalPrice,
  discountedPrice,
  dateRange,
  description,
  onRegister,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-neutral-border hover:shadow-lg transition-shadow flex flex-col sm:flex-row">
      {/* Price Section */}
      <div className="bg-accent px-6 py-4 flex flex-col items-center justify-center min-w-[140px]">
        <span className="text-secondary-dark font-bold text-lg italic mb-1">Harga</span>
        <span className="text-semantic-red line-through text-sm">
          Rp{formatPrice(originalPrice)}
        </span>
        <div className="flex items-baseline gap-0.5">
          <span className="text-secondary-dark text-sm font-bold">Rp</span>
          <span className="text-3xl font-extrabold text-secondary-dark">
            {discountedPrice === 0 ? '0' : formatPrice(discountedPrice)}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <span className="text-sm text-neutral-text/70">{name}</span>
          <h4 className="text-lg font-bold text-secondary-dark">{title}</h4>
          
          {dateRange && (
            <div className="flex items-center gap-2 text-primary text-sm mt-2">
              <Calendar className="w-4 h-4" />
              <span>{dateRange}</span>
            </div>
          )}
          
          {description && (
            <p className="text-sm text-neutral-text/70 mt-1">{description}</p>
          )}
        </div>

        <button
          onClick={onRegister}
          className="mt-4 border-2 border-primary text-primary font-bold py-2 px-6 rounded-full hover:bg-primary hover:text-white transition-all self-start"
        >
          Daftar
        </button>
      </div>
    </div>
  );
};

export default PackageCard;
