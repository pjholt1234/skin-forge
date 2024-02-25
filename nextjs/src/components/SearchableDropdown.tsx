import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';

interface Option {
    value: string | number;
    label: string;
}

interface SearchableDropdownProps {
    options: Option[];
    setOption: (options: Option) => void;
}

const SearchableDropdown: FC<SearchableDropdownProps> = ({ options, setOption }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        setSelectedOption(null);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleOptionClick = (option: Option) => {
        setSelectedOption(option);
        setOption(option);
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5);

    return (
        <div className="relative inline-block text-black" ref={dropdownRef}>
            <input
                type="text"
                placeholder="Search..."
                value={selectedOption ? selectedOption.label : searchTerm}
                onChange={handleInputChange}
                onClick={toggleDropdown}
                className="block w-80 py-2 px-4 border border-gray-300 rounded-md focus:outline-none"
            />
            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {filteredOptions.map(option => (
                        <div
                            key={option.value}
                            className={`p-2 cursor-pointer hover:bg-gray-100 ${
                                selectedOption?.value === option.value ? 'bg-gray-100' : ''
                            }`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchableDropdown;