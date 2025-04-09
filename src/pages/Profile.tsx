
import React, { useEffect, useState } from 'react';
import { Header } from '@/components/navigation/Header';
import { BottomNav } from '@/components/navigation/BottomNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Settings, LogOut, Heart, Info, User, Moon, Bell, Share2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Profile = () => {
  const { user, signOut } = useAuth();
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    if (user?.email) {
      setUserEmail(user.email);
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut();
  };
  
  return (
    <div className="clos8-container bg-gray-50 min-h-screen">
      <Header title="Profile" />
      
      <main className="mt-6">
        <Card className="mb-6 overflow-hidden border-none shadow-md">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-20" />
          <CardContent className="p-0">
            <div className="flex items-center p-4 -mt-10">
              <div className="w-20 h-20 rounded-full bg-clos8-primary text-white flex items-center justify-center text-2xl font-bold border-4 border-white shadow-md">
                <User size={32} />
              </div>
              <div className="ml-4 pt-10">
                <h2 className="font-bold text-xl">{userEmail ? userEmail.split('@')[0] : 'User'}</h2>
                <p className="text-gray-500 text-sm">{userEmail || 'Loading...'}</p>
              </div>
            </div>
            
            <Separator className="my-2" />
            
            <ul className="divide-y divide-gray-100">
              <ProfileMenuItem 
                icon={<Settings size={18} className="text-gray-500" />} 
                label="Settings"
              />
              <ProfileMenuItem 
                icon={<Heart size={18} className="text-gray-500" />} 
                label="Saved Outfits" 
                badge={3}
              />
              <ProfileMenuItem 
                icon={<Bell size={18} className="text-gray-500" />} 
                label="Notifications"
                toggle
              />
              <ProfileMenuItem 
                icon={<Moon size={18} className="text-gray-500" />} 
                label="Dark Mode"
                toggle
              />
              <ProfileMenuItem 
                icon={<Share2 size={18} className="text-gray-500" />} 
                label="Share App"
              />
              <ProfileMenuItem 
                icon={<Info size={18} className="text-gray-500" />} 
                label="Help & Support"
              />
            </ul>
          </CardContent>
        </Card>
        
        <Button 
          variant="outline" 
          className="w-full text-red-500 border-red-200 shadow-sm hover:bg-red-50"
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

interface ProfileMenuItemProps {
  icon: React.ReactNode;
  label: string;
  badge?: number;
  toggle?: boolean;
}

const ProfileMenuItem = ({ icon, label, badge, toggle }: ProfileMenuItemProps) => {
  return (
    <li>
      <Button variant="ghost" className="w-full justify-start h-12 px-4 rounded-none hover:bg-gray-50">
        {icon}
        <span className="ml-3">{label}</span>
        
        {badge && (
          <div className="ml-auto bg-clos8-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {badge}
          </div>
        )}
        
        {toggle && (
          <div className="ml-auto w-10 h-5 bg-gray-200 rounded-full p-1 transition duration-300 ease-in-out">
            <div className="bg-white w-3 h-3 rounded-full shadow-md transform duration-300"></div>
          </div>
        )}
      </Button>
    </li>
  );
};

export default Profile;
