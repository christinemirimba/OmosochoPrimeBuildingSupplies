import { Clock } from 'lucide-react';
import { useBusinessHours, BusinessStatus } from '@/hooks/useBusinessHours';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';

// Get current time in EAT timezone
const getEATTimeString = (): string => {
    const now = new Date();
    const eatOffset = 3 * 60;
    const localOffset = now.getTimezoneOffset();
    const eatTime = new Date(now.getTime() + (eatOffset + localOffset) * 60000);
    return eatTime.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    });
};

const getStatusBadge = (status: BusinessStatus) => {
    switch (status) {
        case 'open':
            return (
                <Badge className="bg-green-500 hover:bg-green-600 text-white uppercase text-xs font-semibold">
                    Open
                </Badge>
            );
        case 'closing-soon':
            return (
                <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white uppercase text-xs font-semibold">
                    Closing Soon
                </Badge>
            );
        case 'closed':
            return (
                <Badge className="bg-red-500 hover:bg-red-600 text-white uppercase text-xs font-semibold">
                    Closed
                </Badge>
            );
    }
};

interface BusinessHoursDisplayProps {
    showIcon?: boolean;
    showCurrentTime?: boolean;
    className?: string;
}

const BusinessHoursDisplay = ({ 
    showIcon = true, 
    showCurrentTime = true,
    className = '' 
}: BusinessHoursDisplayProps) => {
    const { status } = useBusinessHours();
    const [currentTime, setCurrentTime] = useState(getEATTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(getEATTimeString());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`space-y-2 ${className}`}>
            <div className="flex items-center gap-3">
                {showIcon && (
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-primary" />
                    </div>
                )}
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Business Hours</span>
                    {getStatusBadge(status)}
                </div>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground ml-0">
                <p>Mon-Fri: 8:00 AM - 6:00 PM</p>
                <p>Saturday: Closed</p>
                <p>Sunday: 8:00 AM - 6:00 PM</p>
                {showCurrentTime && (
                    <p className="text-xs text-muted-foreground/70 mt-2">
                        Current EAT: {currentTime}
                    </p>
                )}
            </div>
        </div>
    );
};

export default BusinessHoursDisplay;