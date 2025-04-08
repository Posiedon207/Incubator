
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated and redirect accordingly
    const isAuthenticated = false; // This would check Supabase auth session
    
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-clos8-muted p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-5xl font-bold text-clos8-primary mb-4">Clos8</h1>
        <p className="text-xl mb-8 text-gray-600">
          Your AI-powered outfit planner
        </p>
        
        <div className="space-y-4">
          <Button 
            className="w-full bg-clos8-primary hover:bg-blue-600 text-lg py-6" 
            onClick={() => navigate('/login')}
          >
            Get Started
          </Button>
          
          <div className="text-sm text-gray-500 mt-8">
            <p>Already have an account?</p>
            <Button 
              variant="link" 
              onClick={() => navigate('/login')}
              className="text-clos8-accent"
            >
              Log in
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
