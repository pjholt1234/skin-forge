import React, {ChangeEvent, FC, useState} from 'react';

interface Option {
    value: string | number;
    label: string;
}

interface SearchableDropdownProps {
    options: Option[];
    setOption: (options: Option) => void;
}

const SearchableDropdown: FC<SearchableDropdownProps> = ({ options,  setOption}) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

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

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative inline-block text-black">
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
                    {filteredOptions.map((option) => (
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
