
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Shuffle } from 'lucide-react';

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
  return (
    <Card className="w-full overflow-hidden">
      <div className="p-4 bg-clos8-muted">
        <h3 className="font-medium text-lg">{occasion}</h3>
      </div>
      <CardContent className="p-6 grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="aspect-square relative overflow-hidden rounded-md bg-gray-100">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white p-2">
              <p className="text-xs truncate">{item.name}</p>
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
