import {FC} from "react";

interface ExitProps {
    className?: string;
}

const Exit:FC<ExitProps> = ({ className }) => {
    return <span className={`${className} material-symbols-outlined`}>close</span>;
}

export default Exit;