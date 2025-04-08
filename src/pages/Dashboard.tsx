
import React, { useState } from 'react';
import { Header } from '@/components/navigation/Header';
import { BottomNav } from '@/components/navigation/BottomNav';
import { WeatherSummary } from '@/components/dashboard/WeatherSummary';
import { OutfitSuggestion } from '@/components/outfits/OutfitSuggestion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Wand2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

// Mock data for outfit suggestions
const mockOutfit = {
  occasion: 'Today\'s Casual Look',
  items: [
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
  ],
};

type Occasion = 'casual' | 'work' | 'formal' | 'party';

const Dashboard = () => {
  const [currentOutfit, setCurrentOutfit] = useState(mockOutfit);
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion>('casual');

  const occasions: { value: Occasion; label: string }[] = [
    { value: 'casual', label: 'Casual' },
    { value: 'work', label: 'Work' },
    { value: 'formal', label: 'Formal' },
    { value: 'party', label: 'Party' },
  ];

  const generateOutfit = () => {
    toast.success(`Generated new ${selectedOccasion} outfit!`);
    // In a real app, we would call the AI to generate based on selected occasion
  };

  const saveOutfit = () => {
    toast.success('Outfit saved to favorites!');
  };

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
          >
            <Wand2 size={16} />
            Generate
          </Button>
        </div>
        
        <OutfitSuggestion 
          occasion={`${selectedOccasion.charAt(0).toUpperCase() + selectedOccasion.slice(1)} Look`}
          items={currentOutfit.items}
          onSave={saveOutfit}
          onGenerate={generateOutfit}
        />
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Dashboard;
