import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, ArrowLeft } from 'lucide-react';

interface ExitButtonProps {
    type?: 'close' | 'back';
    onClick?: () => void;
    className?: string;
    showTooltip?: boolean;
}

const ExitButton = ({ type = 'close', onClick, className, showTooltip = true }: ExitButtonProps) => {
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
            // Default behavior: go back or to home
            if (window.history.length > 1) {
                navigate(-1); // Go back
            } else {
                navigate('/'); // Go to home
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

    return (
        <div className={`relative ${className || ''}`}>
            <Button
                variant="ghost"
                size="icon"
                onClick={handleButtonClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                aria-label={type === 'close' ? 'Close' : 'Go back'}
                className={`fixed z-50 ${type === 'close' ? 'top-4 right-4' : 'top-4 left-4'} w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background`}
            >
                {type === 'close' ? (
                    <X className="w-5 h-5 text-foreground hover:text-foreground/80" />
                ) : (
                    <ArrowLeft className="w-5 h-5 text-foreground hover:text-foreground/80" />
                )}
            </Button>

            {/* Tooltip - small, black, modern */}
            {showTooltipState && showTooltip && (
                <div className={`absolute z-50 px-2 py-1 text-xs text-white bg-black/90 rounded-sm transition-opacity duration-200 ${type === 'close' ? 'right-12 top-4' : 'left-12 top-4'}`}>
                    {type === 'close' ? 'Close' : 'Back'}
                </div>
            )}
        </div>
    );
};

export default ExitButton;