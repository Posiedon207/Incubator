
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shirt, Trash } from 'lucide-react';

interface ClothingItemProps {
  id: string;
  name: string;
  type: string;
  imageUrl: string;
  color: string;
  onDelete?: (id: string) => void;
}

export const ClothingItem: React.FC<ClothingItemProps> = ({
  id,
  name,
  type,
  imageUrl,
  color,
  onDelete,
}) => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-100">
            <Shirt size={48} className="text-gray-300" />
          </div>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(id)}
            className="absolute top-2 right-2 bg-white bg-opacity-70 rounded-full p-1"
            aria-label="Delete item"
          >
            <Trash size={16} className="text-red-500" />
          </button>
        )}
      </div>
      <CardContent className="p-3">
        <p className="font-medium text-sm truncate">{name}</p>
        <div className="flex items-center gap-2 mt-1">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color || '#e5e7eb' }}
          />
          <span className="text-xs text-gray-500">{type}</span>
        </div>
      </CardContent>
    </Card>
  );
};
