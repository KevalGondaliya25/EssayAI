import { AlertCircle } from 'lucide-react';

interface AlertProps {
  message: string;
  variant: 'warning' | 'error';
}

const variantStyles = {
  warning: 'bg-yellow-50 border-yellow-400 text-yellow-700',
  error: 'bg-red-50 border-red-400 text-red-700'
};

const iconStyles = {
  warning: 'text-yellow-400',
  error: 'text-red-400'
};

export function Alert({ message, variant }: AlertProps) {
  return (
    <div className={`border-l-4 p-4 mb-8 ${variantStyles[variant]}`}>
      <div className="flex">
        <AlertCircle className={`h-5 w-5 ${iconStyles[variant]}`} />
        <div className="ml-3">
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
}