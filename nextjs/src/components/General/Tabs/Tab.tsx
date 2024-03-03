import React, { FC } from 'react';

interface TabProps {
    label: string;
    active: boolean;
    onClick: () => void;
}

const Tab: FC<TabProps> = ({ label, active, onClick }) => {
    return (
        <button
            className={`text-md ${active ? 'underline underline-offset-8 decoration-2' : ''}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default Tab;