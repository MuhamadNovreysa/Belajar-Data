import { ReactNode, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils/helpers';
import { Button } from './Button';

export interface DropdownItem {
  label: ReactNode;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
  divider?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

export interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  align?: 'start' | 'end';
  className?: string;
  menuClassName?: string;
  itemClassName?: string;
  onSelect?: (value: string) => void;
  disabled?: boolean;
}

export function Dropdown({
  trigger,
  items,
  position = 'bottom-left',
  align = 'start',
  className,
  menuClassName,
  itemClassName,
  onSelect,
  disabled = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  const close = () => setIsOpen(false);

  const handleSelect = (item: DropdownItem) => {
    if (item.disabled) return;
    close();
    if (item.onClick) item.onClick();
    if (onSelect) onSelect(item.value);
  };

  const updatePosition = () => {
    if (!triggerRef.current || !menuRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const menuRect = menuRef.current.getBoundingClientRect();
    const padding = 8;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'bottom-left':
        top = triggerRect.bottom + padding;
        left = align === 'start' ? triggerRect.left : triggerRect.right - menuRect.width;
        break;
      case 'bottom-right':
        top = triggerRect.bottom + padding;
        left = align === 'start' ? triggerRect.left : triggerRect.right - menuRect.width;
        break;
      case 'top-left':
        top = triggerRect.top - menuRect.height - padding;
        left = align === 'start' ? triggerRect.left : triggerRect.right - menuRect.width;
        break;
      case 'top-right':
        top = triggerRect.top - menuRect.height - padding;
        left = align === 'start' ? triggerRect.left : triggerRect.right - menuRect.width;
        break;
    }

    // Keep menu in viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < padding) left = padding;
    if (left + menuRect.width > viewportWidth - padding) {
      left = viewportWidth - menuRect.width - padding;
    }
    if (top < padding) top = padding;
    if (top + menuRect.height > viewportHeight - padding) {
      top = triggerRect.top - menuRect.height - padding;
    }

    setCoords({ top, left });
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
      document.addEventListener('click', (e) => {
        if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
          if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
            close();
          }
        }
      });
      return () => {
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isOpen]);

  return (
    <div ref={triggerRef} className={cn('relative inline-block', className)}>
      <div onClick={toggle}>{trigger}</div>
      {isOpen && typeof document !== 'undefined' && createPortal(
        <div
          ref={menuRef}
          className={cn(
            'fixed z-50 min-w-[180px] bg-white rounded-lg shadow-lg border border-gray-200 py-1',
            'animate-in fade-in-0 zoom-in-95 duration-150',
            menuClassName
          )}
          style={{
            top: coords.top,
            left: coords.left,
          }}
          role="menu"
        >
          {items.map((item, index) => {
            if (item.divider) {
              return (
                <div key={index} className="my-1 border-t border-gray-200" />
              );
            }
            return (
              <button
                key={item.value || index}
                onClick={() => handleSelect(item)}
                disabled={item.disabled}
                className={cn(
                  'w-full px-4 py-2 text-sm text-left transition-colors flex items-center gap-2',
                  'hover:bg-gray-100 focus:bg-gray-100 focus:outline-none',
                  item.danger && 'text-red-600 hover:bg-red-50',
                  item.disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent',
                  itemClassName
                )}
                role="menuitem"
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </div>,
        document.body
      )}
    </div>
  );
}

export default Dropdown;
