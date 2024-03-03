import React, { FC } from 'react';
import Exit from "@/components/General/Icons/Exit";

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
    heading?: string;
}

const Modal: FC<ModalProps> = ({ show, onClose, children, heading }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-51"></div>
            <div className="absolute z-52 bg-black p-4 rounded shadow-lg max-w-lg w-[1000px] h-auto border-4 border-blue-700 bg-primaryGrey">
                <div className="flex">
                    <h3 className="text-xl mb-4">{heading}</h3>
                    <button onClick={onClose} className="ml-auto mr-0">
                        <Exit />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;