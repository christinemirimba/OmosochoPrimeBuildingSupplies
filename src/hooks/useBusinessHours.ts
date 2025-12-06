
import { useState, useEffect } from 'react';

export type BusinessStatus = 'open' | 'closed' | 'closing-soon';

export const useBusinessHours = () => {
    const [status, setStatus] = useState<BusinessStatus>('closed');

    useEffect(() => {
        const checkBusinessHours = () => {
            const now = new Date();
            // Using East Africa Time (UTC+3)
            const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
            const hour = now.getHours();
            const minute = now.getMinutes();
            const currentTime = hour + minute / 60;

            // Business Hours:
            // Mon-Fri: 8 AM - 6 PM (18:00)
            // Saturday: Closed
            // Sunday: 8 AM - 6 PM (18:00)

            let isOpen = false;
            let closingTime = 0;

            if (day >= 1 && day <= 5) { // Monday - Friday
                if (currentTime >= 8 && currentTime < 18) {
                    isOpen = true;
                    closingTime = 18;
                }
            } else if (day === 0) { // Sunday
                if (currentTime >= 8 && currentTime < 18) {
                    isOpen = true;
                    closingTime = 18;
                }
            }
            // Saturday (day === 6) is closed

            if (!isOpen) {
                setStatus('closed');
            } else {
                // Show "closing soon" when past 4:00 PM (16:00)
                // This means within 2 hours of closing time (6 PM)
                if (currentTime >= 16) {
                    setStatus('closing-soon');
                } else {
                    setStatus('open');
                }
            }
        };

        checkBusinessHours();
        const interval = setInterval(checkBusinessHours, 60000); // Check every minute

        return () => clearInterval(interval);
    }, []);

    return { status };
};
