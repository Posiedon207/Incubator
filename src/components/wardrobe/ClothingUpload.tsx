
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Camera, Upload } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

export const ClothingUpload = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [clothingData, setClothingData] = useState({
    name: '',
    type: '',
    color: '#000000',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setSelectedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClothingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: string) => {
    setClothingData((prev) => ({ ...prev, type: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedImage) {
      toast.error('Please select an image');
      return;
    }

    if (!clothingData.name || !clothingData.type) {
      toast.error('Please fill out all fields');
      return;
    }

    setIsUploading(true);

    try {
      // Here we would connect to Supabase storage
      console.log('Uploading clothing item:', { ...clothingData, image: selectedImage });
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success('Clothing item added successfully!');
      
      // Reset form
      setSelectedImage(null);
      setClothingData({
        name: '',
        type: '',
        color: '#000000',
      });
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload clothing item');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col items-center">
        <div
          className="w-48 h-48 mb-4 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden relative"
        >
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Selected clothing"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center p-4">
              <Camera size={48} className="mx-auto text-gray-400" />
              <p className="text-sm text-gray-500 mt-2">Select an image</p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleImageChange}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Input
            name="name"
            placeholder="Item name (e.g., Blue Oxford Shirt)"
            value={clothingData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Select
            value={clothingData.type}
            onValueChange={handleTypeChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tops">Tops</SelectItem>
              <SelectItem value="bottoms">Bottoms</SelectItem>
              <SelectItem value="shoes">Shoes</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
              <SelectItem value="outerwear">Outerwear</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="color" className="text-sm text-gray-500 mb-2">
            Color
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              name="color"
              id="color"
              value={clothingData.color}
              onChange={handleChange}
              className="w-12 h-12 p-1 rounded cursor-pointer"
            />
            <span className="text-sm">{clothingData.color}</span>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-clos8-primary hover:bg-blue-600"
        disabled={isUploading}
      >
        {isUploading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Saving...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Upload size={16} />
            Add to Wardrobe
          </span>
        )}
      </Button>
    </form>
  );
};
