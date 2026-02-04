import { useEffect, useState } from "react";

export const useActionLock = ({
    actions,
    duration,
    onComplete,
}: {
    actions?: { celebration: boolean; destroy: boolean };
    duration: number;
    onComplete: () => void;
}) => {
    const [isLocked, setIsLocked] = useState(false);
    const hasAction = !!actions?.celebration || !!actions?.destroy;

    console.log(actions);

    useEffect(() => {
        if (!hasAction) return;

        const lockTimer = setTimeout(() => {
            setIsLocked(true);
        }, 0);

        const unlockTimer = setTimeout(() => {
            setIsLocked(false);
            onComplete();
        }, duration);
        return () => {
            clearTimeout(lockTimer);
            clearTimeout(unlockTimer);
        };
    }, [hasAction, duration, onComplete]);

    return isLocked;
};
