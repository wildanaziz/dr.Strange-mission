import React from 'react';
import { FEATURES } from '../../constants';

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-brand-blue font-bold text-lg uppercase tracking-wider mb-2">Kenapa Pasti Pintar?</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Fitur Lengkap untuk <br className="hidden md:block" />
            Persiapan Maksimal
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-brand-blue/20 hover:shadow-xl hover:shadow-brand-blue/5 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-brand-blue" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h4>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;