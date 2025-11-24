import React from 'react';
import { Mail, Phone, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-0 relative font-sans">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Border Container Frame */}
        <div className="border-t-[4px] border-l-[4px] border-r-[4px] border-primary rounded-t-[40px] md:rounded-t-[60px] p-8 md:p-12 lg:p-16 pb-8 relative bg-white">
          
          {/* 
            GRID LAYOUT:
            Mobile/Tablet (< lg): 2 Columns
            - Logo: col-span-2 (Full Width)
            - Menu: col-span-1 (Half Width)
            - Program: col-span-1 (Half Width)
            - Contact: col-span-2 (Full Width)
            
            Desktop (>= lg): 4 Columns
            - All: col-span-1
          */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 mb-12">
            
            {/* Logo Section */}
            {/* items-center for mobile centering, lg:items-start for desktop alignment */}
            <div className="col-span-2 lg:col-span-1 flex flex-col items-center lg:items-start">
              <a href="#" className="flex items-center gap-3 mb-6">
                 <img
                   src="/assets/PASTI PINTAR NEW-02-01.png"
                   alt="Pasti Pintar Logo"
                   className="w-74 h-74 object-fit"
                 />
              </a>
            </div>

            {/* Navigation Links Column 1 */}
            <div className="col-span-1">
              <h4 className="font-bold text-secondary text-lg mb-6">Menu</h4>
              <ul className="space-y-4 text-neutral-text font-medium">
                <li><a href="#home" className="hover:text-primary transition-colors">Beranda</a></li>
                <li><a href="#features" className="hover:text-primary transition-colors">Fitur</a></li>
                <li><a href="#pricing" className="hover:text-primary transition-colors">Katalog</a></li>
                <li><a href="#testimonials" className="hover:text-primary transition-colors">Testimoni</a></li>
              </ul>
            </div>

            {/* Navigation Links Column 2 */}
            <div className="col-span-1">
               <h4 className="font-bold text-secondary text-lg mb-6">Program</h4>
               <ul className="space-y-4 text-neutral-text font-medium">
                <li><a href="#" className="hover:text-primary transition-colors">UTBK SNBT</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Ujian Mandiri</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Kedinasan</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Beasiswa</a></li>
               </ul>
            </div>

            {/* Contact Section */}
            <div className="col-span-2 lg:col-span-1">
              <h4 className="font-bold text-secondary text-lg mb-4">Contact Us</h4>
              <div className="space-y-3 mb-8 text-neutral-text font-medium">
                <p>pastipintar@gmail.com</p>
                <p>0812 3456 7890</p>
              </div>

              <h4 className="font-bold text-secondary text-lg mb-4">Ikuti Kami</h4>
              <button className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-10 rounded-full shadow-lg transition-all hover:-translate-y-1 w-full md:w-auto">
                Hubungi Kami
              </button>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-neutral-border mt-4">
            <p className="text-neutral-text/60 font-bold text-sm mt-4 md:mt-0 text-center md:text-left">
              © 2025 Pasti Pintar. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;