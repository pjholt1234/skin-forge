import Box from "@/components/General/Box";
import React, {FC} from "react";


interface StickerImageBoxProps {
    selectedItem: any | null;
    handleRemove: (index) => void;
    index: number;
}

const StickerImageBox: FC<StickerImageBoxProps> = ({selectedItem, handleRemove, index}) => {
  return (
      <Box variant="sm" className="m-4 relative">
          <button className="top-0 right-1 absolute" onClick={() => handleRemove(index)}>x</button>
          {selectedItem && (
              <img className="w-auto h-[100px]" src={selectedItem.image_url} alt={selectedItem.market_name} />
          )}
      </Box>
  );
}

export default StickerImageBox;