
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shirt, Clock, ThumbsUp } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-clos8-muted to-white">
      {/* Hero Section */}
      <div className="pt-12 pb-20 px-6 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 rounded-xl bg-clos8-primary flex items-center justify-center text-white mx-auto mb-4">
            <Shirt size={28} />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-clos8-text mb-4">
            Clos<span className="text-clos8-primary">8</span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Your AI-powered outfit planner that helps you look your best every day
          </p>
          
          <div className="space-y-4">
            <Button 
              className="w-full bg-clos8-primary hover:bg-blue-600 text-lg py-6 rounded-xl transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
              onClick={() => navigate('/login')}
            >
              Get Started
              <ArrowRight className="ml-2" />
            </Button>
            
            <p className="text-sm text-gray-500 mt-4">
              Already have an account?{' '}
              <Button 
                variant="link" 
                onClick={() => navigate('/login')}
                className="text-clos8-accent font-medium p-0"
              >
                Log in
              </Button>
            </p>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">How Clos8 Works</h2>
          
          <div className="space-y-8">
            <FeatureCard 
              icon={<Shirt className="text-clos8-primary" />}
              title="Upload Your Wardrobe"
              description="Take photos of your clothes and our AI will categorize them automatically"
            />
            
            <FeatureCard 
              icon={<ThumbsUp className="text-clos8-primary" />}
              title="Get Perfect Outfit Suggestions"
              description="Our AI creates stylish combinations based on your preferences"
            />
            
            <FeatureCard 
              icon={<Clock className="text-clos8-primary" />}
              title="Save Time Every Day"
              description="Never worry about what to wear again and always look your best"
            />
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              className="bg-clos8-primary hover:bg-blue-600 py-6 px-8 rounded-xl text-lg transition-all transform hover:scale-105"
              onClick={() => navigate('/login')}
            >
              Start Creating Outfits
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="flex items-start p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all">
      <div className="flex-shrink-0 mr-4 w-12 h-12 bg-clos8-secondary rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default Index;
