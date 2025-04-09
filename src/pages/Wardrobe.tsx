
import React, { useEffect, useState } from 'react';
import { Header } from '@/components/navigation/Header';
import { BottomNav } from '@/components/navigation/BottomNav';
import { ClothingItem } from '@/components/wardrobe/ClothingItem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { toast } from '@/lib/toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface ClothingItemType {
  id: string;
  name: string;
  type: string;
  color: string;
  image_url: string;
}

const Wardrobe = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<ClothingItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchClothingItems = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('clothing_items')
          .select('*');
        
        if (error) throw error;
        
        setItems(data || []);
      } catch (error) {
        console.error('Error fetching clothing items:', error);
        toast.error('Failed to load your wardrobe');
      } finally {
        setIsLoading(false);
      }
    };

    fetchClothingItems();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!user) return;
    
    try {
      // First get the item to get the image URL
      const { data: item } = await supabase
        .from('clothing_items')
        .select('image_url')
        .eq('id', id)
        .single();
        
      // Delete from the database
      const { error: deleteError } = await supabase
        .from('clothing_items')
        .delete()
        .eq('id', id);
      
      if (deleteError) throw deleteError;
      
      // Try to delete the image from storage if possible
      if (item && item.image_url) {
        const imagePath = item.image_url.split('/').slice(-2).join('/');
        await supabase.storage.from('clothing-images').remove([imagePath]);
      }
      
      // Update state
      setItems(items.filter(item => item.id !== id));
      toast.success('Item removed from wardrobe');
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item');
    }
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
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-clos8-primary"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No items found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <ClothingItem
                key={item.id}
                id={item.id}
                name={item.name}
                type={item.type}
                color={item.color}
                imageUrl={item.image_url}
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
