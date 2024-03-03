import React, {FC} from 'react';
import NavBar from "@/components/Navigation/NavBar";
import Image from 'next/image';
import Homepage from '../../public/homepage.jpg';
import Title from "@/components/Homepage/Title";

const Page: FC = () => {
    return (
        <div className="h-screen flex flex-col">
            <NavBar />
            <div className="w-full h-full relative overflow-hidden">
                <Title />
                <Image
                    src={Homepage}
                    alt="homepage"
                    fill={true}
                    style={{objectFit: "cover", zIndex: -1}}
                />
            </div>
        </div>
    );
};

export default Page;