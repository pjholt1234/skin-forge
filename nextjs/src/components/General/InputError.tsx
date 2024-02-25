import { FC } from 'react';

interface InputErrorProps {
    error: string;
}

const InputError:FC<InputErrorProps> = ({ error }) => {
    if(error === '') return <div className="p-4"></div>;

    return (
        <div className="text-red-500 text-[10px] pb-4">{error}</div>
    );
}

export default InputError;