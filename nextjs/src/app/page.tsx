import React, {FC} from 'react';
import NavBar from "@/components/Navigation/NavBar";

const Page: FC = () => {
    return (
        <>
            <NavBar />
            <div className="w-full justify-center items-center flex h-full">
                Homepage
            </div>
        </>

    );
};

export default Page;