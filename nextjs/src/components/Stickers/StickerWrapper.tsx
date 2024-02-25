"use client";

import React, {useState, useEffect, useRef} from "react";
import { fabric } from "fabric";
import Stickers from "@/components/Stickers/Stickers";
import Box from "@/components/General/Box";

const App = () => {
    const [canvas, setCanvas] = useState<fabric.Canvas>();
    const canvasRef = useRef(null);

    useEffect(() => {
        const c = new fabric.Canvas("canvas", {
            backgroundColor: "white",
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
            console.log(img);
            canvas.add(img);
        });
    };

    const removeImageFromCanvas = (index) => {
        if (!canvas) return;

        const image = canvas.getObjects().find((img) => img.id === index);
        canvas.remove(image);
    }

    return (
        <div className="flex w-full grid grid-cols-2 gap-10 p-4">
            <Box className="w-full h-full">
                <canvas id="canvas" ref={canvasRef}/>
            </Box>
            <Stickers addImageToCanvas={addImageToCanvas} removeImageFromCanvas={removeImageFromCanvas}/>
        </div>
    );
};

export default App;