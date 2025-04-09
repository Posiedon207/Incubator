
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';

type FormData = {
  email: string;
  password: string;
};

export const AuthForm = () => {
  const { signIn, signUp, isLoading } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(formData.email, formData.password);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp(formData.email, formData.password);
  };

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Welcome to Clos8</CardTitle>
        <CardDescription>Your AI-powered outfit planner</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <Button type="submit" className="w-full bg-clos8-primary hover:bg-blue-600" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <Button type="submit" className="w-full bg-clos8-primary hover:bg-blue-600" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create account'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
