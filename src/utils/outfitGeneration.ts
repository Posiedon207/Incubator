
// Outfit Generation Utility
// This file contains logic for generating outfits based on occasion, color theory, and texture

import { ClothingItem } from "@/types/wardrobe";

type OutfitOccasion = 'casual' | 'work' | 'formal' | 'party';

// Color palettes appropriate for different occasions
const occasionColorSchemes = {
  casual: {
    primaryColors: ['#3b82f6', '#0ea5e9', '#10b981', '#f97316', '#8b5cf6'], // blues, greens, orange, purple
    neutralColors: ['#ffffff', '#f3f4f6', '#d1d5db', '#1e293b', '#000000'], // whites, grays, black
    avoidColors: [] // casual is flexible
  },
  work: {
    primaryColors: ['#1e3a8a', '#1e40af', '#0f766e', '#374151', '#44403c'], // navy, dark blue, dark teal, grays
    neutralColors: ['#ffffff', '#f9fafb', '#f5f5f4', '#e7e5e4'], // whites, light gray
    avoidColors: ['#f97316', '#f43f5e', '#d946ef'] // avoid bright orange, pink, magenta
  },
  formal: {
    primaryColors: ['#0c0a09', '#1c1917', '#0f172a', '#0c4a6e', '#1e1b4b'], // blacks, dark navy, dark purple
    neutralColors: ['#ffffff', '#f8fafc'], // whites
    avoidColors: ['#84cc16', '#eab308', '#f97316', '#ec4899'] // avoid bright greens, yellows, oranges, pinks
  },
  party: {
    primaryColors: ['#7c3aed', '#d946ef', '#f43f5e', '#f97316', '#0ea5e9', '#14b8a6'], // purples, pinks, reds, oranges, blues, teals
    neutralColors: ['#000000', '#0f172a', '#ffffff'], // black, dark navy, white
    avoidColors: ['#d1d5db', '#9ca3af'] // avoid dull grays
  }
};

// Texture compatibility rules
const textureCompatibility = {
  casual: ['denim', 'cotton', 'linen', 'knit', 'fleece', 'canvas'],
  work: ['cotton', 'wool', 'polyester', 'silk', 'chiffon', 'twill'],
  formal: ['silk', 'satin', 'velvet', 'wool', 'chiffon', 'lace'],
  party: ['sequin', 'silk', 'satin', 'leather', 'lace', 'metallic']
};

// Check color compatibility based on occasion
const isColorCompatibleWithOccasion = (color: string, occasion: OutfitOccasion): boolean => {
  if (!color) return true; // If no color is specified, consider it compatible
  
  // Convert to lowercase for comparison
  const lowerColor = color.toLowerCase();
  
  // Check if the color is explicitly avoided for this occasion
  for (const avoidColor of occasionColorSchemes[occasion].avoidColors) {
    if (lowerColor.includes(avoidColor.toLowerCase())) {
      return false;
    }
  }
  
  // For formal occasions, bright colors may not be appropriate
  if (occasion === 'formal' && 
      (lowerColor.includes('bright') || 
       lowerColor.includes('neon'))) {
    return false;
  }
  
  return true;
};

// Score items for an occasion (higher is better)
const scoreItemForOccasion = (item: ClothingItem, occasion: OutfitOccasion): number => {
  let score = 0;
  
  // Base score based on item type and occasion
  switch (occasion) {
    case 'casual':
      if (['t-shirt', 'jeans', 'sneakers', 'hoodie'].some(keyword => 
          item.name.toLowerCase().includes(keyword))) {
        score += 3;
      }
      break;
    case 'work':
      if (['button', 'blouse', 'chinos', 'slacks', 'loafer', 'oxford'].some(keyword => 
          item.name.toLowerCase().includes(keyword))) {
        score += 3;
      }
      break;
    case 'formal':
      if (['suit', 'dress', 'tuxedo', 'gown', 'oxford'].some(keyword => 
          item.name.toLowerCase().includes(keyword))) {
        score += 3;
      }
      break;
    case 'party':
      if (['dress', 'blazer', 'heels', 'sequin', 'glitter'].some(keyword => 
          item.name.toLowerCase().includes(keyword))) {
        score += 3;
      }
      break;
  }
  
  // Color compatibility score
  if (isColorCompatibleWithOccasion(item.color, occasion)) {
    score += 2;
  } else {
    score -= 2;
  }
  
  return score;
};

// Check if items complement each other by color
const areColorsComplementary = (item1: ClothingItem, item2: ClothingItem): boolean => {
  // This is a very simplified color matching - in reality would need a more sophisticated approach
  if (!item1.color || !item2.color) return true;
  
  // Simple rule: Neutrals (black, white, gray, navy) go with everything
  const neutralColors = ['black', 'white', 'gray', 'navy'];
  if (neutralColors.some(color => item1.color.toLowerCase().includes(color)) ||
      neutralColors.some(color => item2.color.toLowerCase().includes(color))) {
    return true;
  }
  
  // Basic complementary colors (very simplified)
  const complementaryPairs = [
    ['blue', 'orange'],
    ['red', 'green'],
    ['yellow', 'purple']
  ];
  
  for (const [color1, color2] of complementaryPairs) {
    if ((item1.color.toLowerCase().includes(color1) && item2.color.toLowerCase().includes(color2)) ||
        (item1.color.toLowerCase().includes(color2) && item2.color.toLowerCase().includes(color1))) {
      return true;
    }
  }
  
  // Analogous colors - check if they're the same color family
  const sameColor = Object.keys(item1.color).some(color => 
    item2.color.toLowerCase().includes(color.toLowerCase())
  );
  
  return sameColor;
};

// Generate an outfit based on occasion
export const generateOutfitForOccasion = (
  wardrobe: Record<string, ClothingItem[]>, 
  occasion: OutfitOccasion
): ClothingItem[] => {
  const outfit: ClothingItem[] = [];
  
  // Types of items we want in the outfit
  const requiredTypes = {
    casual: ['tops', 'bottoms', 'shoes'],
    work: ['tops', 'bottoms', 'shoes'],
    formal: ['tops', 'bottoms', 'shoes', 'accessories'],
    party: ['tops', 'bottoms', 'shoes', 'accessories']
  };
  
  // Sort items by score for this occasion
  const scoredWardrobe: Record<string, {item: ClothingItem, score: number}[]> = {};
  
  for (const type in wardrobe) {
    if (!scoredWardrobe[type]) scoredWardrobe[type] = [];
    
    wardrobe[type].forEach(item => {
      scoredWardrobe[type].push({
        item,
        score: scoreItemForOccasion(item, occasion)
      });
    });
    
    // Sort by score, highest first
    scoredWardrobe[type].sort((a, b) => b.score - a.score);
  }
  
  // Helper function to get best item from each category
  const getBestItem = (type: string): ClothingItem | null => {
    if (!scoredWardrobe[type] || scoredWardrobe[type].length === 0) return null;
    
    // Get top 3 items if available
    const topItems = scoredWardrobe[type].slice(0, Math.min(3, scoredWardrobe[type].length));
    
    // Randomly pick from top items to add some variety
    return topItems[Math.floor(Math.random() * topItems.length)].item;
  };
  
  // Build the outfit with required items for this occasion
  for (const type of requiredTypes[occasion]) {
    if (wardrobe[type] && wardrobe[type].length > 0) {
      const bestItem = getBestItem(type);
      if (bestItem) {
        outfit.push(bestItem);
      }
    }
  }
  
  return outfit;
};
