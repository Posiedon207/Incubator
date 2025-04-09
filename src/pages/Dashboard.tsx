
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/navigation/Header';
import { BottomNav } from '@/components/navigation/BottomNav';
import { WeatherSummary } from '@/components/dashboard/WeatherSummary';
import { OutfitSuggestion } from '@/components/outfits/OutfitSuggestion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Wand2, BriefcaseBusiness, PartyPopper } from 'lucide-react';
import { toast } from '@/lib/toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { generateOutfitForOccasion } from '@/utils/outfitGeneration';

// Define clothing item type
interface ClothingItem {
  id: string;
  name: string;
  type: string;
  imageUrl: string;
  color: string;
}

// Mock data for outfit suggestions - we'll replace this with real data from the database when available
const mockWardrobe = {
  tops: [
    {
      id: '1',
      name: 'Blue Oxford Shirt',
      type: 'tops',
      imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
      color: '#3b82f6',
    },
    {
      id: '5',
      name: 'White Tee',
      type: 'tops',
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
      color: '#ffffff',
    },
    {
      id: '6',
      name: 'Black Polo',
      type: 'tops',
      imageUrl: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99',
      color: '#000000',
    }
  ],
  bottoms: [
    {
      id: '2',
      name: 'Dark Slim Jeans',
      type: 'bottoms',
      imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
      color: '#1e3a8a',
    },
    {
      id: '7',
      name: 'Khaki Chinos',
      type: 'bottoms',
      imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a',
      color: '#d4b996',
    },
    {
      id: '8',
      name: 'Black Dress Pants',
      type: 'bottoms',
      imageUrl: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660',
      color: '#222222',
    }
  ],
  shoes: [
    {
      id: '3',
      name: 'White Sneakers',
      type: 'shoes',
      imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
      color: '#ffffff',
    },
    {
      id: '9',
      name: 'Brown Loafers',
      type: 'shoes',
      imageUrl: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4',
      color: '#8b4513',
    },
    {
      id: '10',
      name: 'Black Dress Shoes',
      type: 'shoes',
      imageUrl: 'https://images.unsplash.com/photo-1523471826770-c437dae25b1f',
      color: '#222222',
    }
  ],
  accessories: [
    {
      id: '4',
      name: 'Casual Watch',
      type: 'accessories',
      imageUrl: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a',
      color: '#6b7280',
    },
    {
      id: '11',
      name: 'Silver Necklace',
      type: 'accessories',
      imageUrl: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e',
      color: '#c0c0c0',
    },
    {
      id: '12',
      name: 'Brown Belt',
      type: 'accessories',
      imageUrl: 'https://images.unsplash.com/photo-1553115035-71a1d11a30e9',
      color: '#8b4513',
    }
  ]
};

type Occasion = 'casual' | 'work' | 'formal' | 'party';

const Dashboard = () => {
  const { user } = useAuth();
  const [currentOutfit, setCurrentOutfit] = useState<ClothingItem[]>([]);
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion>('casual');
  const [userWardrobe, setUserWardrobe] = useState<Record<string, ClothingItem[]>>(mockWardrobe);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user's wardrobe from Supabase if logged in
  useEffect(() => {
    const fetchUserWardrobe = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('clothing_items')
          .select('*')
          .eq('user_id', user.id);
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Group items by type
          const groupedItems = data.reduce((acc: Record<string, ClothingItem[]>, item) => {
            const type = item.type;
            if (!acc[type]) acc[type] = [];
            acc[type].push({
              id: item.id,
              name: item.name,
              type: item.type,
              imageUrl: item.image_url || '',
              color: item.color,
            });
            return acc;
          }, {});
          
          // Only replace mockWardrobe if we have enough items for a complete outfit
          if (Object.keys(groupedItems).length >= 2) {
            setUserWardrobe(groupedItems);
          }
        }
      } catch (error) {
        console.error('Error fetching wardrobe:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserWardrobe();
  }, [user]);

  // Generate an outfit based on the selected occasion using our new utility
  const generateOutfit = () => {
    try {
      // Use our new occasion-specific outfit generation
      const newOutfit = generateOutfitForOccasion(userWardrobe, selectedOccasion);
      
      // Update state with the new outfit
      setCurrentOutfit(newOutfit);
      
      toast.success(`Generated new ${selectedOccasion} outfit!`);
    } catch (error) {
      console.error('Error generating outfit:', error);
      toast.error('Failed to generate outfit. Please try again.');
    }
  };

  // Run initial generation on component mount or when occasion changes
  useEffect(() => {
    generateOutfit();
  }, [selectedOccasion]);

  const saveOutfit = async () => {
    if (!user) {
      toast.error('You must be logged in to save outfits');
      return;
    }
    
    try {
      // Create a new outfit in the database
      const { data, error } = await supabase
        .from('outfits')
        .insert({
          user_id: user.id,
          name: `${selectedOccasion.charAt(0).toUpperCase() + selectedOccasion.slice(1)} Outfit`,
          occasion: selectedOccasion
        })
        .select()
        .single();
        
      if (error) throw error;
      
      if (data) {
        // Add each clothing item to the outfit_items junction table
        const outfitItems = currentOutfit.map(item => ({
          outfit_id: data.id,
          clothing_item_id: item.id
        }));
        
        const { error: itemsError } = await supabase
          .from('outfit_items')
          .insert(outfitItems);
          
        if (itemsError) throw itemsError;
        
        toast.success('Outfit saved to favorites!');
      }
    } catch (error) {
      console.error('Error saving outfit:', error);
      toast.error('Failed to save outfit. Please try again.');
    }
  };

  // Get the appropriate icon for each occasion
  const getOccasionIcon = (occasion: Occasion) => {
    switch (occasion) {
      case 'work':
        return <BriefcaseBusiness size={16} />;
      case 'party':
        return <PartyPopper size={16} />;
      default:
        return null;
    }
  };

  const occasions: { value: Occasion; label: string }[] = [
    { value: 'casual', label: 'Casual' },
    { value: 'work', label: 'Work' },
    { value: 'formal', label: 'Formal' },
    { value: 'party', label: 'Party' },
  ];

  return (
    <div className="clos8-container">
      <Header title="Clos8" />
      
      <main className="mt-4">
        <WeatherSummary />
        
        <Card className="mb-4">
          <CardContent className="p-4">
            <p className="text-sm font-medium mb-2">Generate outfit for:</p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {occasions.map((occasion) => (
                <Button
                  key={occasion.value}
                  variant={selectedOccasion === occasion.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedOccasion(occasion.value)}
                  className={selectedOccasion === occasion.value ? "bg-clos8-primary" : ""}
                >
                  {getOccasionIcon(occasion.value)}
                  {occasion.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="flex gap-4 mb-4 items-center">
          <h2 className="text-xl font-semibold">Today's Outfit</h2>
          <Button 
            size="sm" 
            variant="outline" 
            className="ml-auto flex items-center gap-1"
            onClick={generateOutfit}
            disabled={isLoading}
          >
            <Wand2 size={16} />
            Generate
          </Button>
        </div>
        
        <OutfitSuggestion 
          occasion={`${selectedOccasion.charAt(0).toUpperCase() + selectedOccasion.slice(1)} Look`}
          items={currentOutfit}
          onSave={saveOutfit}
          onGenerate={generateOutfit}
        />
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Dashboard;
