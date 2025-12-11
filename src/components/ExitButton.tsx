import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, ArrowLeft, ChevronLeft, CornerDownLeft, DoorClosed, LogOut } from 'lucide-react';

interface ExitButtonProps {
    type?: 'close' | 'back' | 'arrow-left' | 'chevron-left' | 'corner-left' | 'door' | 'logout';
    onClick?: () => void;
    className?: string;
    showTooltip?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

const ExitButton = ({ type = 'close', onClick, className, showTooltip = true, size = 'md' }: ExitButtonProps) => {
    const navigate = useNavigate();
    const [showTooltipState, setShowTooltipState] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleExit = () => {
        if (onClick) {
            onClick();
        } else {
            // Default behavior based on button type
            if (type === 'close') {
                // For close buttons, go to home or previous page
                if (window.history.length > 1) {
                    navigate(-1);
                } else {
                    navigate('/');
                }
            } else {
                // For back/navigation buttons, go back
                if (window.history.length > 1) {
                    navigate(-1);
                } else {
                    navigate('/');
                }
            }
        }
    };

    const handleButtonClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleExit();

        // Show tooltip briefly on mobile
        if (isMobile && showTooltip) {
            setShowTooltipState(true);
            setTimeout(() => setShowTooltipState(false), 1500);
        }
    };

    const handleMouseEnter = () => {
        if (!isMobile && showTooltip) {
            setShowTooltipState(true);
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile) {
            setShowTooltipState(false);
        }
    };

    // Get icon size based on size prop
    const getIconSize = () => {
        switch (size) {
            case 'sm': return 4;
            case 'lg': return 6;
            default: return 5;
        }
    };

    // Get button size based on size prop
    const getButtonSize = () => {
        switch (size) {
            case 'sm': return 'w-8 h-8';
            case 'lg': return 'w-12 h-12';
            default: return 'w-10 h-10';
        }
    };

    // Get tooltip text based on button type
    const getTooltipText = () => {
        switch (type) {
            case 'close': return 'Close';
            case 'back': return 'Go Back';
            case 'arrow-left': return 'Back';
            case 'chevron-left': return 'Previous';
            case 'corner-left': return 'Return';
            case 'door': return 'Exit';
            case 'logout': return 'Sign Out';
            default: return 'Exit';
        }
    };

    // Get icon based on button type
    const getIcon = () => {
        const iconSize = getIconSize();
        switch (type) {
            case 'close': return <X className={`w-${iconSize} h-${iconSize} text-foreground hover:text-foreground/80`} />;
            case 'back': return <ArrowLeft className={`w-${iconSize} h-${iconSize} text-foreground hover:text-foreground/80`} />;
            case 'arrow-left': return <ArrowLeft className={`w-${iconSize} h-${iconSize} text-foreground hover:text-foreground/80`} />;
            case 'chevron-left': return <ChevronLeft className={`w-${iconSize} h-${iconSize} text-foreground hover:text-foreground/80`} />;
            case 'corner-left': return <CornerDownLeft className={`w-${iconSize} h-${iconSize} text-foreground hover:text-foreground/80`} />;
            case 'door': return <DoorClosed className={`w-${iconSize} h-${iconSize} text-foreground hover:text-foreground/80`} />;
            case 'logout': return <LogOut className={`w-${iconSize} h-${iconSize} text-foreground hover:text-foreground/80`} />;
            default: return <X className={`w-${iconSize} h-${iconSize} text-foreground hover:text-foreground/80`} />;
        }
    };

    // Determine button position based on type
    const getPositionClass = () => {
        if (type === 'close' || type === 'door' || type === 'logout') {
            return 'top-4 right-4';
        } else {
            return 'top-4 left-4';
        }
    };

    return (
        <div className={`relative ${className || ''}`}>
            <Button
                variant="ghost"
                size="icon"
                onClick={handleButtonClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                aria-label={getTooltipText()}
                className={`fixed z-50 ${getPositionClass()} ${getButtonSize()} rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background`}
            >
                {getIcon()}
            </Button>

            {/* Tooltip - small, black, modern */}
            {showTooltipState && showTooltip && (
                <div className={`absolute z-50 px-2 py-1 text-xs text-white bg-black/90 rounded-sm transition-opacity duration-200 ${type === 'close' || type === 'door' || type === 'logout' ? 'right-12 top-4' : 'left-12 top-4'}`}>
                    {getTooltipText()}
                </div>
            )}
        </div>
    );
};

export default ExitButton;