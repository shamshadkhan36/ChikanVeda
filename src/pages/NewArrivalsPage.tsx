import React from 'react';
import { Shop } from './Shop';

export const NewArrivalsPage: React.FC = () => {
  return (
    <Shop
      preFilterNewArrivals={true}
      title="Fresh From ChikanVeda"
      subtitle="Discover our newest styles."
    />
  );
};
