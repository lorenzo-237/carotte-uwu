import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

const CrossOverText = ({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div className='relative inline-block'>
      {/* Le texte */}
      <span className={cn(className)}>{children}</span>

      {/* La croix rouge */}
      <span
        className='absolute inset-0 flex justify-center items-center text-red-500 text-3xl opacity-90 cursor-pointer animate-shake-rotate'
        onClick={onClick}
      >
        <X className='h-10 w-10' />
      </span>
    </div>
  );
};

export default CrossOverText;
