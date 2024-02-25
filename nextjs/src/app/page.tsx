import React, {FC} from 'react';
import Stickers from "@/components/Stickers/Stickers";

const HomePage: FC = () => {
    return (
        <div className="w-full justify-center items-center flex h-full">
            <Stickers />
        </div>
    );
};

export default HomePage;