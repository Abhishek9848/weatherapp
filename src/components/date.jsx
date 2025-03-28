import { useEffect, useState } from "react";

export default function useDate(fromDate) {
    const locale = 'en';
    const [today, setDate] = useState(fromDate ? new Date(fromDate) : new Date()); // Save the current date to be able to trigger an update

    useEffect(() => {
        const timer = setInterval(() => {
            // This will trigger a rerender every component that uses the useDate hook.
            setDate(fromDate ? new Date(fromDate) : new Date());
        }, 1000);
        return () => {
            clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
        }
    });

    const day = today.toLocaleDateString(locale, { weekday: 'long' });
    const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })}\n\n`;
    const m = today.toLocaleDateString(locale, { month: 'long' });
    const d = today.getDate();
    const hour = today.getHours();
    const wish = `Good ${(hour < 12 && 'Morning') || (hour < 17 && 'Afternoon') || 'Evening'}`;

    const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' });

    return {
        date,
        time,
        wish,
        d,
        m
    };
};