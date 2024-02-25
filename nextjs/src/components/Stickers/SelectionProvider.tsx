import React, {createContext, FC, useContext, useState} from 'react';

interface SharedState {
    selectedStickers: any[];
    setSelectedStickers: (stickers: any[]) => void;
    selectedWeapon: any;
    setSelectedWeapon: (weapon: any) => void;
    selectedSticker: any;
    setSelectedSticker: (sticker: any) => void;
}

const SharedStateContext = createContext<SharedState | undefined>(undefined);

export const useItemSelection = () => {
    const context = useContext(SharedStateContext);
    if (!context) {
        throw new Error('useItemSelection must be used within a SharedStateProvider');
    }

    return context;
};

export const ItemSelectionProvider: FC = ({ children }) => {
    const [selectedStickers, setSelectedStickers] = useState([]);
    const [selectedWeapon, setSelectedWeapon] = useState(null);
    const [selectedSticker, setSelectedSticker] = useState(null);

    const sharedState: SharedState = {
        selectedStickers,
        setSelectedStickers,
        selectedWeapon,
        setSelectedWeapon,
        selectedSticker,
        setSelectedSticker,
    };

    return (
        <SharedStateContext.Provider value={sharedState}>
            {children}
        </SharedStateContext.Provider>
    );
};