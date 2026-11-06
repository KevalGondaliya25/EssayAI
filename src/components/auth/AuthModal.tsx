import { useState } from 'react';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { Button } from '../ui/button';

export function AuthModal() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          {isSignIn ? 'Sign in to your account' : 'Create a new account'}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}
          <Button
            variant="ghost"
            className="ml-1 text-blue-600 hover:text-blue-500"
            onClick={() => setIsSignIn(!isSignIn)}
          >
            {isSignIn ? 'Sign up' : 'Sign in'}
          </Button>
        </p>
      </div>

      {isSignIn ? <SignInForm /> : <SignUpForm />}
    </div>
  );
}