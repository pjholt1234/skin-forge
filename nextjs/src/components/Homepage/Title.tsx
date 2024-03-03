import Image from "next/image";
import anvil from "../../../public/anvil.jpg";
import React from "react";

const Title = () => {
    return (
        <div className="absolute top-[45%] left-[10%] flex items-center">
            <h1 className="text-6xl font-bold text-white mr-4">Skin Forge</h1>
            <div className="bg-white p-4 rounded-full">
                <Image
                    src={anvil}
                    alt="anvil"
                    width={100}
                    height={100}
                    className="rounded-full"
                />
            </div>
        </div>
    )
}

export default Title;