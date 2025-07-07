import { useState } from 'react';

export const useToggle = () => {
    const [on, setOn] = useState(false);
    return [on, () => setOn(!on)];
};