import React, {FC} from 'react';
import Register from '../../components/Auth/Register';

const LoginPage: FC = () => {
    return (
        <div className="w-full justify-center items-center flex h-full">
            <Register />
        </div>
    );
};

export default LoginPage;
