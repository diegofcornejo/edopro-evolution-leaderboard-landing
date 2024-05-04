import React, { useEffect, useRef, useState } from "react";
import p5Types from "p5";

type P5jsContainerRef = HTMLDivElement;
type P5jsSketch = (p: p5Types, parentRef: P5jsContainerRef) => void;
type P5jsContainerProps = { sketch: P5jsSketch, timeout?: number};
type P5jsContainer = ({ sketch, timeout }: P5jsContainerProps) => React.ReactElement;

const P5jsContainer: P5jsContainer = ({ sketch, timeout }) => {
	const parentRef = useRef<P5jsContainerRef>(null);
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const UNMOUNT_TIMEOUT = timeout || 20000;

	useEffect(() => {
		setIsMounted(true);
		const timeout = setTimeout(() => {
			setIsMounted(false);
			// Sound.status.STOPPED;
		}, UNMOUNT_TIMEOUT);

		return () => clearTimeout(timeout);
	}, []);

	useEffect(() => {
		if (!isMounted || !parentRef.current) return;

		let p5instance: p5Types;

		const initP5 = async () => {
			try {
				// Import p5 library dynamically
				const p5 = (await import("p5")).default;
				// Create a new p5 instance
				p5instance = new p5((p: p5Types) => {
					// Call the sketch function with the p5 instance and parentRef
					sketch(p, parentRef.current as P5jsContainerRef);
				});
			} catch (error) {
				console.error("Error initializing p5:", error);
			}
		};

		initP5();

		return () => {
			// Clean up p5 instance on unmount
			if (p5instance) p5instance.remove();
		};
	}, [isMounted, sketch]);

	return <div ref={parentRef}></div>;
};

export default P5jsContainer;

// Sketch function for Star Wars effect
export const starWarsSketch: P5jsSketch = (p5, parentRef) => {
	let textFont;
	let titleFont;
	let textX;
	let textY;
	let titleSize;
	let textAlpha;
	let title = 'Evolution Server';
	let summary = 'Join a vibrant community of passionate players whether you are a novice starting in Monster Duel or an experienced duelist seeking new challenges.\n \nMay the force be with you!';

	p5.preload = () => {
		textFont = p5.loadFont("./Starjedi.ttf");
		titleFont = p5.loadFont("./Starjhol.ttf");
	};

	p5.setup = () => {
		p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL).parent(parentRef);
		p5.background(0);
		textX = -p5.width / 2 + p5.width * 0.15;
		textY = p5.height / 2;
		titleSize = p5.width / 3;
		textAlpha = 255;
	};

	p5.draw = () => {
		p5.background(0);
		p5.textFont(titleFont);
		p5.fill(255, 232, 31);
		p5.textSize(titleSize);
		p5.textAlign(p5.CENTER);
		p5.textLeading(titleSize);
		p5.text(title, 0, 0);
		if (titleSize < p5.width / 10) {
			p5.fill(255, 232, 31, textAlpha);
			p5.textFont(textFont);
			p5.textSize(p5.width / 30);
			p5.textAlign(p5.CENTER);
			p5.rotateX(p5.PI / 4);
			p5.textLeading(p5.width / 30);
			p5.text(
				summary,
				textX,
				textY,
				p5.width * 0.7,
				p5.height * 10
			);
			textY -= 1.5;
			if (textY < -p5.width / 1.7) {
				textAlpha -= 0.5;
			}
		}
		if (titleSize > 0) {
			titleSize--;
		}
	};
};
