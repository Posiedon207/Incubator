
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Shuffle, Shirt, BriefcaseBusiness, PartyPopper } from 'lucide-react';

interface ClothingItem {
  id: string;
  name: string;
  type: string;
  imageUrl: string;
  color: string;
}

interface OutfitSuggestionProps {
  occasion: string;
  items: ClothingItem[];
  onSave?: () => void;
  onGenerate?: () => void;
}

export const OutfitSuggestion: React.FC<OutfitSuggestionProps> = ({
  occasion,
  items,
  onSave,
  onGenerate,
}) => {
  // Get the appropriate icon for the occasion
  const getOccasionIcon = () => {
    const occasionLower = occasion.toLowerCase();
    if (occasionLower.includes('work')) {
      return <BriefcaseBusiness size={24} className="text-gray-600" />;
    } else if (occasionLower.includes('party')) {
      return <PartyPopper size={24} className="text-gray-600" />;
    } else if (occasionLower.includes('formal')) {
      return <Shirt size={24} className="text-gray-600" />;
    } else {
      return <Shirt size={24} className="text-gray-600" />;
    }
  };

  // Get style tips based on occasion
  const getOccasionTips = () => {
    const occasionLower = occasion.toLowerCase();
    if (occasionLower.includes('casual')) {
      return "Tip: Casual outfits work best with comfortable fabrics and relaxed fits.";
    } else if (occasionLower.includes('work')) {
      return "Tip: Professional attire typically features neutral colors and structured pieces.";
    } else if (occasionLower.includes('formal')) {
      return "Tip: Formal occasions call for refined fabrics and elegant silhouettes.";
    } else if (occasionLower.includes('party')) {
      return "Tip: Have fun with bold colors and statement pieces for party outfits!";
    } else {
      return "";
    }
  };

  // If there are no items, show a placeholder
  if (!items || items.length === 0) {
    return (
      <Card className="w-full overflow-hidden">
        <div className="p-4 bg-muted flex items-center gap-2">
          {getOccasionIcon()}
          <h3 className="font-medium text-lg">{occasion}</h3>
        </div>
        <CardContent className="p-6 flex flex-col items-center justify-center h-64">
          <Shirt size={48} className="text-gray-300 mb-4" />
          <p className="text-gray-500">No items in this outfit yet.</p>
          <p className="text-gray-400 text-sm">Click Generate to create an outfit.</p>
        </CardContent>
        <CardFooter className="flex justify-between p-4 bg-white border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={onSave}
            className="flex items-center gap-2"
            disabled={items.length === 0}
          >
            <Heart size={16} />
            Save
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onGenerate}
            className="flex items-center gap-2"
          >
            <Shuffle size={16} />
            New Outfit
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // Group items by type for better display
  const groupedItems = items.reduce((acc: Record<string, ClothingItem[]>, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});

  return (
    <Card className="w-full overflow-hidden">
      <div className="p-4 bg-muted flex items-center gap-2">
        {getOccasionIcon()}
        <h3 className="font-medium text-lg">{occasion}</h3>
      </div>
      
      {/* Style tip */}
      <div className="px-6 pt-4 text-sm text-gray-600 italic border-b border-gray-100 pb-3">
        {getOccasionTips()}
      </div>
      
      <CardContent className="p-6 grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="aspect-square relative overflow-hidden rounded-md bg-gray-100"
          >
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Handle image load errors by setting a fallback
                  (e.target as HTMLImageElement).src = 'https://placehold.co/400x400?text=No+Image';
                }}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-100">
                <Shirt size={48} className="text-gray-300" />
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white p-2">
              <p className="text-xs truncate">{item.name}</p>
              <div className="flex items-center gap-1 mt-1">
                <span 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color || '#e5e7eb' }}
                />
                <span className="text-xs opacity-70">{item.type}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      
      <CardFooter className="flex justify-between p-4 bg-white border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={onSave}
          className="flex items-center gap-2"
        >
          <Heart size={16} />
          Save
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onGenerate}
          className="flex items-center gap-2"
        >
          <Shuffle size={16} />
          New Outfit
        </Button>
      </CardFooter>
    </Card>
  );
};
