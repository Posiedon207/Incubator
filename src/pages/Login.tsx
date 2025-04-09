
import React from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Shirt } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-clos8-muted to-white p-4">
      <div className="pt-4 pb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-600"
          onClick={() => navigate('/')}
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to home
        </Button>
      </div>
      
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-xl bg-clos8-primary flex items-center justify-center text-white mx-auto mb-4">
            <Shirt size={28} />
          </div>
          <h1 className="text-3xl font-bold text-clos8-text mb-1">
            Welcome to <span className="text-clos8-primary">Clos8</span>
          </h1>
          <p className="text-gray-600">Your AI-powered outfit planner</p>
        </div>
        
        <AuthForm />
      </div>
    </div>
  );
};

export default Login;
