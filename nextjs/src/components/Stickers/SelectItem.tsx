import React, {FC, useEffect, useState} from 'react';
import SearchableDropdown from "@/components/General/SearchableDropdown";
import { Button } from "@material-tailwind/react";
import Box from "@/components/General/Box";
import getStickers from "@/helpers/getStickers";
import {useItemSelection} from "@/components/Stickers/SelectionProvider";

interface Option {
    value: string | number;
    label: string;
}

interface Props {
    optionFetch: () => Promise<any[]>;
    handleAdd: () => void;
    disabled: boolean;
    getSelectionOption?: (item) => void;
    buttonText: string;
}

const SelectItem: FC<Props> = ({ optionFetch, handleAdd, disabled, getSelectionOption, buttonText}) => {
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const [options, setOptions] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        console.log('selectedOption:', selectedOption);
        if (!selectedOption) {
            return;
        }

        if(getSelectionOption){
            const selectedItem = items.find((item) => item.id === selectedOption.value);
            getSelectionOption(selectedItem);
        }

    }, [selectedOption]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await optionFetch();
                setItems(response);

                const options = response.map((item) => ({
                    value: item.id,
                    label: item.market_name
                }));

                setOptions(options);
            } catch (error) {
                console.error('Error fetching stickers:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <SearchableDropdown options={options} setOption={setSelectedOption} />
            <Button
                type="submit"
                fullWidth
                variant="filled"
                color="blue"
                className="mt-2 w-80"
                disabled={disabled}
                onClick={handleAdd}
            >
                {buttonText}
            </Button>
        </div>
    );
}

export default SelectItem;