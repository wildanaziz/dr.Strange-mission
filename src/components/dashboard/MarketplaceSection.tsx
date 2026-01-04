import React from 'react';
import PackageCard from './PackageCard';

interface Package {
  id: string;
  name: string;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  dateRange?: string;
  description?: string;
}

interface MarketplaceSectionProps {
  packages: Package[];
  onRegister: (packageId: string) => void;
}

const MarketplaceSection: React.FC<MarketplaceSectionProps> = ({
  packages,
  onRegister,
}) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-primary mb-6">Try Out yang tersedia</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            name={pkg.name}
            title={pkg.title}
            originalPrice={pkg.originalPrice}
            discountedPrice={pkg.discountedPrice}
            dateRange={pkg.dateRange}
            description={pkg.description}
            onRegister={() => onRegister(pkg.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default MarketplaceSection;
