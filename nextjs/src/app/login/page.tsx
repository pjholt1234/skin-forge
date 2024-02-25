import React, {FC} from 'react';
import Login from '../../components/Auth/Login';

const LoginPage: FC = () => {
    return (
        <div className="w-full justify-center items-center flex h-full">
            <Login />
        </div>
    );
};

export default LoginPage;
