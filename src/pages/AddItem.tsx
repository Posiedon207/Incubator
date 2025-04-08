
import React from 'react';
import { Header } from '@/components/navigation/Header';
import { BottomNav } from '@/components/navigation/BottomNav';
import { ClothingUpload } from '@/components/wardrobe/ClothingUpload';

const AddItem = () => {
  return (
    <div className="clos8-container">
      <Header title="Add Clothing Item" showBackButton />
      
      <main className="mt-6 px-2">
        <ClothingUpload />
      </main>
      
      <BottomNav />
    </div>
  );
};

export default AddItem;
