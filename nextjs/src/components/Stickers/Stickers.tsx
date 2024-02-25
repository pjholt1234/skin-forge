"use client";

import React, { useState, useEffect } from 'react';
import getStickers from "@/helpers/getStickers";
import SearchableDropdown from "@/components/SearchableDropdown";
import Box from "@/components/General/Box";
import {Button} from "@material-tailwind/react";
import StickerImageBox from "@/components/Stickers/StickerImageBox";

interface Option {
    value: string | number;
    label: string;
}

const Stickers = () => {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const [item, setItem] = useState();
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getStickers();
                setItems(response);

                const stickerOptions = response.map((sticker) => ({
                    value: sticker.id,
                    label: sticker.market_name
                }));

                setOptions(stickerOptions);
            } catch (error) {
                console.error('Error fetching stickers:', error);
            }
        };

        fetchData();
    }, []);

    const handleAdd = () => {
        if (!item) {
            return;
        }

        const itemIndex = selectedItems.findIndex(
            (selectedItem) => selectedItem === null || selectedItem === undefined
        );
        const updatedSelectedItems = [...selectedItems];

        if(itemIndex !== -1) {
            updatedSelectedItems[itemIndex] = item;
            setSelectedItems(updatedSelectedItems);
            return;
        }

        setSelectedItems([...selectedItems, item]);
    }

    const handleRemove = (index) => {
        const updatedSelectedItems = [...selectedItems];
        updatedSelectedItems[index] = null
        setSelectedItems(updatedSelectedItems);
    }

    useEffect(() => {
        if (!selectedOption) {
            return;
        }

        const selectedItem = items.find((item) => item.id === selectedOption.value);
        setItem(selectedItem);
    }, [selectedOption]);

    return (
        <div className="w-full flex items-center">
            <div>
                <div className="flex justify-center">
                    <StickerImageBox selectedItem={selectedItems[0]} handleRemove={handleRemove} index={0}/>
                    <StickerImageBox selectedItem={selectedItems[1]} handleRemove={handleRemove} index={1}/>
                    <StickerImageBox selectedItem={selectedItems[2]} handleRemove={handleRemove} index={2}/>
                </div>
                <div className="flex justify-center">
                    <StickerImageBox selectedItem={selectedItems[3]} handleRemove={handleRemove} index={3}/>
                    <StickerImageBox selectedItem={selectedItems[4]} handleRemove={handleRemove} index={4}/>
                </div>
            </div>
            <div className="justify-center">
                <Box className="my-4">
                    {item && (
                        <img className="w-auto h-[200px]" src={item.image_url} alt={item.market_name} />
                    )}
                </Box>
                <SearchableDropdown options={options} setOption={(option) => setSelectedOption(option)}/>
                <Button
                    type="submit"
                    fullWidth
                    variant="filled"
                    color="blue"
                    className="mt-4"
                    onClick={handleAdd}
                    disabled={!selectedOption || selectedItems.filter((item) => item !== null).length === 5}
                >
                    Add
                </Button>
            </div>
        </div>
    );
}

export default Stickers;
