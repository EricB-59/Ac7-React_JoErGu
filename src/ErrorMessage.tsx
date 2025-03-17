import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-md my-2">
      <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
      <p className="text-red-600 font-medium">{message}</p>
    </div>
  );
}