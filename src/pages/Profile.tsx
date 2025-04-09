import React from 'react';
import { Header } from '@/components/navigation/Header';
import { BottomNav } from '@/components/navigation/BottomNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Settings, LogOut, Heart, Info } from 'lucide-react';
import { toast } from '@/lib/toast';

const Profile = () => {
  const handleLogout = () => {
    toast.success('You have been logged out');
    // In a real app, we would handle logout with Supabase Auth
    // And redirect to login page
  };
  
  return (
    <div className="clos8-container">
      <Header title="Profile" />
      
      <main className="mt-6">
        <Card className="mb-6">
          <CardContent className="p-0">
            <div className="flex items-center p-4">
              <div className="w-16 h-16 rounded-full bg-clos8-primary text-white flex items-center justify-center text-xl font-bold">
                JD
              </div>
              <div className="ml-4">
                <h2 className="font-bold text-lg">John Doe</h2>
                <p className="text-gray-500 text-sm">john.doe@example.com</p>
              </div>
            </div>
            
            <Separator className="my-1" />
            
            <ul>
              <li>
                <Button variant="ghost" className="w-full justify-start h-12 px-4">
                  <Settings size={18} className="mr-3 text-gray-500" />
                  Settings
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start h-12 px-4">
                  <Heart size={18} className="mr-3 text-gray-500" />
                  Saved Outfits
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start h-12 px-4">
                  <Info size={18} className="mr-3 text-gray-500" />
                  Help & Support
                </Button>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Button 
          variant="outline" 
          className="w-full text-red-500 border-red-200"
          onClick={handleLogout}
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </Button>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Profile;
