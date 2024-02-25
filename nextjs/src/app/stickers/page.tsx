import React, {FC} from 'react';
import Stickers from "@/components/Stickers/Stickers";

const StickersPage: FC = () => {
    return (
        <div className="w-full h-full flex grid grid-cols-2">
            <Stickers />
        </div>
    );
};

export default StickersPage;