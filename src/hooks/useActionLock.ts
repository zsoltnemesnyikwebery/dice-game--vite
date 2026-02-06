import { useState, useEffect } from "react";

export const useActionLock = ({
    isActive,
    duration,
    onComplete,
}: {
    isActive: boolean;
    duration: number;
    onComplete: () => void;
}) => {
    const [isLocked, setIsLocked] = useState(false);

    useEffect(() => {
        if (!isActive) return;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsLocked(true);

        const timer = setTimeout(() => {
            setIsLocked(false);
            onComplete();
        }, duration);

        return () => clearTimeout(timer);
    }, [isActive, duration, onComplete]);

    return isLocked;
};
