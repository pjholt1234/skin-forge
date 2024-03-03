import {FC} from "react";

interface SettingsProps {
    className?: string;
}

const Settings:FC<SettingsProps> = ({ className }) => {
    return <span className={`${className} material-symbols-outlined`}>settings</span>;
}

export default Settings;