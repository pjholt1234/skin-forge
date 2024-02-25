import React, {FC, useEffect} from "react";
import StickerImageBox from "@/components/Stickers/StickerImageBox";
import {useItemSelection} from "@/components/Stickers/SelectionProvider";
import Box from "@/components/General/Box";
import SelectItem from "@/components/Stickers/SelectItem";
import getStickers from "@/helpers/getStickers";
import getWeapons from "@/helpers/getWeapons";


interface SelectionWrapperProps {
    addImageToCanvas: (imageUrl: string, index: number) => void;
    removeImageFromCanvas: (index: number) => void;
    addBackgroundImage: (imageUrl: string) => void;
}

const SelectionWrapper: FC<SelectionWrapperProps> = ({addImageToCanvas, removeImageFromCanvas, addBackgroundImage}) => {
    const {
        selectedStickers,
        setSelectedStickers,
        selectedWeapon,
        setSelectedWeapon,
        selectedSticker,
        setSelectedSticker,
    } = useItemSelection();

    const handleRemove = (index) => {
        const updatedSelectedStickers = [...selectedStickers];
        updatedSelectedStickers[index] = null
        setSelectedStickers(updatedSelectedStickers);

        removeImageFromCanvas(index);
    }

    const handleAddSticker = () => {
        if (!selectedSticker) {
            return;
        }

        let itemIndex = selectedStickers.findIndex(
            (selectedItem) => selectedItem === null || selectedItem === undefined
        );
        const updatedSelectedItems = [...selectedStickers];

        if(itemIndex !== -1) {
            updatedSelectedItems[itemIndex] = selectedSticker;
            setSelectedStickers(updatedSelectedItems);
        } else {
            itemIndex = selectedStickers.length;
            setSelectedStickers([...selectedStickers, selectedSticker]);
        }

        addImageToCanvas(selectedSticker.image_url, itemIndex);
    }

    const handleAddWeapon = () => {
        if (!selectedWeapon) {
            return;
        }

        addBackgroundImage(selectedWeapon.inspect_url);
    }

    const isAddStickerDisabled = selectedStickers.filter((item) => item !== null).length === 5;


    useEffect(() => {
    }, [selectedSticker]);

    return (
        <div>
            <div className="grid grid-cols-2 mb-4">
                <div className="flex flex-col items-center">
                    <Box className="mb-2">
                        {selectedSticker && (
                            <img className="w-auto h-[200px]" src={selectedSticker.image_url} alt={selectedSticker.market_name} />
                        )}
                    </Box>
                    <SelectItem optionFetch={getStickers} handleAdd={handleAddSticker} disabled={isAddStickerDisabled} getSelectionOption={setSelectedSticker} buttonText="Add Sticker"/>
                </div>
                <div className="flex flex-col items-center">
                    <Box className="mb-2">
                        {selectedWeapon && (
                            <img className="w-auto h-[200px]" src={selectedWeapon.image_url} alt={selectedWeapon.market_name} />
                        )}
                    </Box>
                    <SelectItem optionFetch={getWeapons} handleAdd={handleAddWeapon} disabled={false} getSelectionOption={setSelectedWeapon} buttonText="Add Weapon"/>
                </div>
            </div>
            <div className="mt-10 flex space-x-4 justify-center">
                <StickerImageBox selectedItem={selectedStickers[0]} handleRemove={handleRemove} index={0}/>
                <StickerImageBox selectedItem={selectedStickers[1]} handleRemove={handleRemove} index={1}/>
                <StickerImageBox selectedItem={selectedStickers[2]} handleRemove={handleRemove} index={2}/>
                <StickerImageBox selectedItem={selectedStickers[3]} handleRemove={handleRemove} index={3}/>
                <StickerImageBox selectedItem={selectedStickers[4]} handleRemove={handleRemove} index={4}/>
            </div>
        </div>
    );
}

export default SelectionWrapper;