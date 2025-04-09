
export interface ClothingItem {
  id: string;
  name: string;
  type: string;
  imageUrl: string;
  color: string;
}

export type OutfitOccasion = 'casual' | 'work' | 'formal' | 'party';
