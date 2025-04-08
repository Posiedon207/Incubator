
import React from 'react';
import { AuthForm } from '@/components/auth/AuthForm';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-clos8-muted p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-clos8-primary mb-2">Clos8</h1>
          <p className="text-gray-600">Your AI-powered outfit planner</p>
        </div>
        
        <AuthForm />
      </div>
    </div>
  );
};

export default Login;
