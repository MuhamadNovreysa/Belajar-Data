import { cn } from '@/lib/utils/helpers';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'circle' | 'rounded' | 'square';
  fallback?: string;
  status?: 'online' | 'offline' | 'away' | 'busy' | 'none';
  statusPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  variant = 'circle',
  fallback,
  status = 'none',
  statusPosition = 'bottom-right',
  className,
  ...props
}: AvatarProps) {
  const sizeClasses = {
    xs: 'w-6 h-6 text-[8px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
    '2xl': 'w-24 h-24 text-2xl',
  };

  const variantClasses = {
    circle: 'rounded-full',
    rounded: 'rounded-lg',
    square: 'rounded-none',
  };

  const statusClasses = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
    none: 'hidden',
  };

  const statusSizeClasses = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
    '2xl': 'w-6 h-6',
  };

  const statusPositionClasses = {
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const initials = name ? getInitials(name) : fallback || '?';

  return (
    <div
      className={cn(
        'relative flex-shrink-0',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className={cn('w-full h-full object-cover', variantClasses[variant])}
        />
      ) : (
        <div
          className={cn(
            'w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 text-white font-medium',
            variantClasses[variant]
          )}
        >
          {initials}
        </div>
      )}
      {status !== 'none' && (
        <div
          className={cn(
            'absolute rounded-full border-2 border-white',
            statusClasses[status],
            statusSizeClasses[size],
            statusPositionClasses[statusPosition]
          )}
        />
      )}
    </div>
  );
}

export default Avatar;
