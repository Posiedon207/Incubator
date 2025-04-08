
import React, { useState } from 'react';
import { Header } from '@/components/navigation/Header';
import { BottomNav } from '@/components/navigation/BottomNav';
import { ClothingItem } from '@/components/wardrobe/ClothingItem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

// Mock wardrobe data
const mockWardrobeItems = [
  {
    id: '1',
    name: 'Blue Oxford Shirt',
    type: 'tops',
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    color: '#3b82f6',
  },
  {
    id: '2',
    name: 'Dark Slim Jeans',
    type: 'bottoms',
    imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
    color: '#1e3a8a',
  },
  {
    id: '3',
    name: 'White Sneakers',
    type: 'shoes',
    imageUrl: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04',
    color: '#ffffff',
  },
  {
    id: '4',
    name: 'Casual Watch',
    type: 'accessories',
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    color: '#6b7280',
  },
];

const Wardrobe = () => {
  const [items, setItems] = useState(mockWardrobeItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast.success('Item removed from wardrobe');
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.type === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="clos8-container">
      <Header title="My Wardrobe" />
      
      <main className="mt-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search wardrobe..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-4">
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="tops">Tops</TabsTrigger>
            <TabsTrigger value="bottoms">Bottoms</TabsTrigger>
            <TabsTrigger value="shoes">Shoes</TabsTrigger>
            <TabsTrigger value="accessories">Acc.</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No items found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <ClothingItem
                key={item.id}
                {...item}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Wardrobe;
