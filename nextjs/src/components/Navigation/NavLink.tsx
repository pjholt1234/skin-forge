import {FC} from "react";

interface NavLinkProps {
    href: string;
    label: string;
    className?: string;
}

const NavLink: FC<NavLinkProps> = ({ href, label, className }) => {
    return (
        <div className={className}>
            <a href={href}>{label}</a>
        </div>
    );
}

export default NavLink;