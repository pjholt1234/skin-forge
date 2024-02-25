import React, {FC, ReactNode} from "react";

interface BoxProps {
    children: ReactNode;
    variant?: string;
    className?: string;
}

const Box: FC<BoxProps> = ({children, variant, className}) => {

    let size = 'w-80 h-80';

    if(variant === 'sm') {
        size = 'w-40 h-40';
    } else if(variant === 'lg') {
        size = 'w-96 h-96';
    }

    return (
        <div className={`flex border-4 border-blue-700 rounded-md items-center justify-center ${size} ${className}`}>
            {children}
        </div>
    );
}

export default Box;