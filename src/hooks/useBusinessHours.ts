import { useState, useEffect } from 'react';

export type BusinessStatus = 'open' | 'closed' | 'closing-soon';

// Convert current time to East Africa Time (UTC+3)
const getEATTime = (): Date => {
    const now = new Date();
    const eatOffset = 3 * 60; // EAT is UTC+3
    const localOffset = now.getTimezoneOffset();
    return new Date(now.getTime() + (eatOffset + localOffset) * 60000);
};

export const useBusinessHours = () => {
    const [status, setStatus] = useState<BusinessStatus>('closed');

    useEffect(() => {
        const checkBusinessHours = () => {
            const eatTime = getEATTime();
            const hours = eatTime.getHours();
            const dayOfWeek = eatTime.getDay(); // 0 = Sunday, 6 = Saturday

            // Business Hours (EAT):
            // Saturday: Closed all day
            // Sunday & Mon-Fri: 8 AM - 6 PM
            //   - Open: 8:00 - 16:00
            //   - Closing Soon: 16:00 - 18:00
            //   - Closed: before 8:00 or after 18:00

            if (dayOfWeek === 6) {
                // Saturday - Closed all day
                setStatus('closed');
            } else {
                // Sunday (0) and Monday-Friday (1-5)
                if (hours >= 8 && hours < 16) {
                    setStatus('open');
                } else if (hours >= 16 && hours < 18) {
                    setStatus('closing-soon');
                } else {
                    setStatus('closed');
                }
            }
        };

        checkBusinessHours();
        const interval = setInterval(checkBusinessHours, 60000); // Check every minute

        return () => clearInterval(interval);
    }, []);

    return { status };
};
