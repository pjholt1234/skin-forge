"use client";

import React, {useState, useEffect, useRef} from "react";
import { fabric } from "fabric";
import Box from "@/components/General/Box";
import {ItemSelectionProvider} from "@/components/Stickers/SelectionProvider";
import SelectionWrapper from "@/components/Stickers/SelectionWrapper";

const CraftWrapper = () => {
    const [canvas, setCanvas] = useState<fabric.Canvas>();
    const canvasRef = useRef(null);

    useEffect(() => {
        const c = new fabric.Canvas("canvas", {
            backgroundColor: "#383838",
        });

        const container = canvasRef.current.parentNode;

        c.setDimensions({
            width: container.clientWidth,
            height: container.clientHeight
        });

        setCanvas(c);

        return () => {
            c.dispose();
        };
    }, []);

    const addImageToCanvas = (imageUrl, index) => {
        if (!canvas || !imageUrl) return;

        fabric.Image.fromURL(imageUrl, (img) => {
            img.id = index;
            canvas.add(img);
        });
    };

    const removeImageFromCanvas = (search) => {
        if (!canvas) return;

        const image = canvas.getObjects().find((img) => img.id === search);
        canvas.remove(image);
    }

    const addBackgroundImage = (imageUrl) => {
        if (!canvas || !imageUrl) return;

        removeImageFromCanvas('background');

        fabric.Image.fromURL(imageUrl, (img) => {
            img.id = 'background';
            img.selectable = false;

            const aspectRatio = img.width / img.height;
            const height = canvas.width / aspectRatio;

            img.scaleToHeight(height);
            img.scaleToWidth(canvas.width);

            canvas.add(img);
        });

        canvas.on('object:added', function(object) {
            const image = canvas.getObjects().find((img) => img.id === 'background');
            image.sendToBack();
        });
    }

    return (
        <div className="flex w-full grid grid-cols-2 gap-10 p-4">
            <Box className="w-full h-full">
                <canvas id="canvas" ref={canvasRef}/>
            </Box>
            <ItemSelectionProvider>
                <SelectionWrapper addImageToCanvas={addImageToCanvas} removeImageFromCanvas={removeImageFromCanvas} addBackgroundImage={addBackgroundImage}/>
            </ItemSelectionProvider>
        </div>
    );
};

export default CraftWrapper;