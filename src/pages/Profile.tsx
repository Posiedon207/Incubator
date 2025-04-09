
import React, { useEffect, useState } from 'react';
import { Header } from '@/components/navigation/Header';
import { BottomNav } from '@/components/navigation/BottomNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Settings, LogOut, Heart, Info, User, Moon, Bell, Share2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/lib/toast';
import { supabase } from '@/integrations/supabase/client';

interface SavedOutfit {
  id: string;
  name: string;
  occasion: string | null;
  created_at: string;
}

const Profile = () => {
  const { user, signOut } = useAuth();
  const [userEmail, setUserEmail] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showSavedOutfits, setShowSavedOutfits] = useState<boolean>(false);
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user?.email) {
      setUserEmail(user.email);
    }
    
    // Check if dark mode is stored in localStorage
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(storedDarkMode);
    
    // Apply dark mode class if needed
    if (storedDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Check if notifications setting is stored
    const storedNotifications = localStorage.getItem('notifications') === 'true';
    setNotifications(storedNotifications);
  }, [user]);
  
  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      toast.success('Dark mode enabled');
    } else {
      document.documentElement.classList.remove('dark');
      toast.success('Light mode enabled');
    }
  };
  
  const handleNotificationsToggle = () => {
    const newNotifications = !notifications;
    setNotifications(newNotifications);
    localStorage.setItem('notifications', String(newNotifications));
    
    toast.success(newNotifications ? 'Notifications enabled' : 'Notifications disabled');
  };
  
  const fetchSavedOutfits = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('outfits')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setSavedOutfits(data || []);
    } catch (error) {
      console.error('Error fetching saved outfits:', error);
      toast.error('Failed to load your saved outfits');
    } finally {
      setIsLoading(false);
    }
  };
  
  const openSavedOutfits = () => {
    fetchSavedOutfits();
    setShowSavedOutfits(true);
  };
  
  const handleShareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Clos8 - Your Personal Wardrobe App',
        text: 'Check out Clos8, the app that helps you organize your wardrobe and create amazing outfits!',
        url: window.location.origin,
      }).catch((err) => {
        console.error('Share failed:', err);
        toast.error('Failed to share');
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.origin);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleLogout = async () => {
    await signOut();
  };
  
  return (
    <div className="clos8-container bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Header title="Profile" />
      
      <main className="mt-6">
        <Card className="mb-6 overflow-hidden border-none shadow-md dark:bg-gray-800">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-20" />
          <CardContent className="p-0">
            <div className="flex items-center p-4 -mt-10">
              <div className="w-20 h-20 rounded-full bg-clos8-primary text-white flex items-center justify-center text-2xl font-bold border-4 border-white dark:border-gray-800 shadow-md">
                <User size={32} />
              </div>
              <div className="ml-4 pt-10">
                <h2 className="font-bold text-xl dark:text-white">{userEmail ? userEmail.split('@')[0] : 'User'}</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{userEmail || 'Loading...'}</p>
              </div>
            </div>
            
            <Separator className="my-2" />
            
            <ul className="divide-y divide-gray-100 dark:divide-gray-700">
              <ProfileMenuItem 
                icon={<Settings size={18} className="text-gray-500 dark:text-gray-400" />} 
                label="Settings"
                onClick={() => setShowSettings(true)}
              />
              <ProfileMenuItem 
                icon={<Heart size={18} className="text-gray-500 dark:text-gray-400" />} 
                label="Saved Outfits" 
                badge={savedOutfits.length > 0 ? savedOutfits.length : undefined}
                onClick={openSavedOutfits}
              />
              <ProfileMenuItem 
                icon={<Bell size={18} className="text-gray-500 dark:text-gray-400" />} 
                label="Notifications"
                toggle
                toggled={notifications}
                onToggle={handleNotificationsToggle}
              />
              <ProfileMenuItem 
                icon={<Moon size={18} className="text-gray-500 dark:text-gray-400" />} 
                label="Dark Mode"
                toggle
                toggled={darkMode}
                onToggle={handleDarkModeToggle}
              />
              <ProfileMenuItem 
                icon={<Share2 size={18} className="text-gray-500 dark:text-gray-400" />} 
                label="Share App"
                onClick={handleShareApp}
              />
              <ProfileMenuItem 
                icon={<Info size={18} className="text-gray-500 dark:text-gray-400" />} 
                label="Help & Support"
                onClick={() => toast.info('Help & Support coming soon!')}
              />
            </ul>
          </CardContent>
        </Card>
        
        <Button 
          variant="outline" 
          className="w-full text-red-500 border-red-200 shadow-sm hover:bg-red-50 dark:hover:bg-red-900 dark:border-red-800 dark:text-red-400"
          onClick={handleLogout}
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </Button>
      </main>
      
      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              App settings will be available in a future update. Stay tuned!
            </p>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Saved Outfits Sheet */}
      <Sheet open={showSavedOutfits} onOpenChange={setShowSavedOutfits}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Saved Outfits</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-clos8-primary"></div>
              </div>
            ) : savedOutfits.length > 0 ? (
              <ul className="space-y-3">
                {savedOutfits.map((outfit) => (
                  <li key={outfit.id} className="border rounded-lg p-3 bg-white dark:bg-gray-800 dark:border-gray-700">
                    <h3 className="font-medium dark:text-white">{outfit.name}</h3>
                    {outfit.occasion && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {outfit.occasion}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-1 dark:text-gray-500">
                      {new Date(outfit.created_at).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8">
                <Heart className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
                <p className="mt-4 text-gray-500 dark:text-gray-400">No saved outfits yet</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setShowSavedOutfits(false)}
                >
                  Close
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
      
      <BottomNav />
    </div>
  );
};

interface ProfileMenuItemProps {
  icon: React.ReactNode;
  label: string;
  badge?: number;
  toggle?: boolean;
  toggled?: boolean;
  onClick?: () => void;
  onToggle?: () => void;
}

const ProfileMenuItem = ({ 
  icon, 
  label, 
  badge, 
  toggle, 
  toggled = false,
  onClick, 
  onToggle 
}: ProfileMenuItemProps) => {
  const handleClick = () => {
    if (toggle && onToggle) {
      onToggle();
    } else if (onClick) {
      onClick();
    }
  };
  
  return (
    <li>
      <Button 
        variant="ghost" 
        className="w-full justify-start h-12 px-4 rounded-none hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200"
        onClick={handleClick}
      >
        {icon}
        <span className="ml-3">{label}</span>
        
        {badge !== undefined && (
          <div className="ml-auto bg-clos8-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {badge}
          </div>
        )}
        
        {toggle && (
          <div className="ml-auto">
            <Switch checked={toggled} onCheckedChange={onToggle} />
          </div>
        )}
      </Button>
    </li>
  );
};

export default Profile;
