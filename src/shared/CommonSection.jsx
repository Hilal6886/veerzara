import React from 'react';
import './ccommon-section.css';

const CommonSection = ({ title }) => {
  return (
    <section className='common_section'>
      <div className='container mx-auto'>
        <div className='lg:col-span-12'>
          <h1 className='text-3xl lg:text-5xl font-bold mb-4'>{title}</h1>
        </div>
      </div>
    </section>
  );
};

export default CommonSection;
