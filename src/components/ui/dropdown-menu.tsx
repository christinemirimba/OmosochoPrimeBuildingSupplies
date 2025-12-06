import React, { useState, useRef, useEffect, createContext, useContext } from 'react';

// Context for managing dropdown state
interface DropdownContextType {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

const useDropdown = () => {
    const context = useContext(DropdownContext);
    if (!context) {
        throw new Error('Dropdown components must be used within DropdownMenu');
    }
    return context;
};

// Main DropdownMenu component with state management
export const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        // Close dropdown on Escape key
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isOpen]);

    return (
        <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
            <div ref={dropdownRef} className="relative inline-block text-left">
                {children}
            </div>
        </DropdownContext.Provider>
    );
};

// Trigger button with toggle functionality
export const DropdownMenuTrigger = ({ children, className }: any) => {
    const { isOpen, setIsOpen } = useDropdown();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className={className}
            aria-expanded={isOpen}
            aria-haspopup="true"
        >
            {children}
        </button>
    );
};

// Content with smooth transitions
export const DropdownMenuContent = ({ children, align }: any) => {
    const { isOpen } = useDropdown();

    if (!isOpen) return null;

    return (
        <div
            className={`absolute z-50 mt-2 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200 ${align === 'end' ? 'right-0' : 'left-0'
                }`}
            role="menu"
            aria-orientation="vertical"
        >
            {children}
        </div>
    );
};

// Menu item with proper click handling
export const DropdownMenuItem = ({ children, asChild, onClick }: any) => {
    const { setIsOpen } = useDropdown();

    const handleClick = (e: React.MouseEvent) => {
        // Don't prevent default or stop propagation for links
        if (onClick) {
            onClick(e);
        }
        // Close dropdown after clicking an item
        // Use a small delay to ensure navigation happens first
        setTimeout(() => setIsOpen(false), 0);
    };

    // If asChild is true, clone the child element and add click handler
    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<any>, {
            className: `relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground w-full ${(children as any).props.className || ''}`,
            onClick: (e: React.MouseEvent) => {
                // Call original onClick if exists
                if ((children as any).props.onClick) {
                    (children as any).props.onClick(e);
                }
                handleClick(e);
            },
        });
    }

    return (
        <div
            className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            role="menuitem"
            onClick={handleClick}
        >
            {children}
        </div>
    );
};
