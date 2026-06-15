import { LenisProvider } from '@/components/lenis/LenisProvider';
import Home from '@/components/preloader/ClientLayout';

import React from 'react';

const page = () => {
  return (
    <div>
      <LenisProvider>
        <Home />
      </LenisProvider>
    </div>
  );
};

export default page;