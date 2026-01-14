import React, { useEffect, useRef } from "react"

const AnimatedBackground = () => {
	const blobRefs = useRef([])
	const initialPositions = [
		{ x: -4, y: 0 },
		{ x: -4, y: 0 },
		{ x: 20, y: -8 },
		{ x: 20, y: -8 },
	]

	useEffect(() => {
		const handleScroll = () => {
			if (window.innerWidth < 768) return; // Disable scroll-linked animations on mobile for performance

			const newScroll = window.pageYOffset;

			blobRefs.current.forEach((blob, index) => {
				if (!blob) return;
				const initialPos = initialPositions[index];

				// Calculating movement in both X and Y direction
				const xOffset = Math.sin(newScroll / 100 + index * 0.5) * 340; // Horizontal movement
				const yOffset = Math.cos(newScroll / 100 + index * 0.5) * 40; // Vertical movement

				const x = initialPos.x + xOffset;
				const y = initialPos.y + yOffset;

				// Apply transformation with smooth transition
				blob.style.transform = `translate(${x}px, ${y}px)`;
			});
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="fixed inset-0 ">
			<div className="absolute inset-0 hidden sm:block">
				<div
					ref={(ref) => (blobRefs.current[0] = ref)}
					className="absolute top-0 -left-4 md:w-96 md:h-96 w-72 h-72 bg-rose-500 rounded-full filter blur-[80px] opacity-20 "></div>
				<div
					ref={(ref) => (blobRefs.current[1] = ref)}
					className="absolute top-0 -right-4 w-96 h-96 bg-red-600 rounded-full filter blur-[80px] opacity-20"></div>
				<div
					ref={(ref) => (blobRefs.current[2] = ref)}
					className="absolute -bottom-8 left-20 w-96 h-96 bg-red-500 rounded-full filter blur-[80px] opacity-20 "></div>
				<div
					ref={(ref) => (blobRefs.current[3] = ref)}
					className="absolute -bottom-10 right-20 w-96 h-96 bg-rose-600 rounded-full filter blur-[80px] opacity-10"></div>
			</div>
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#dc262608_1px,transparent_1px),linear-gradient(to_bottom,#dc262608_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:40px_40px]"></div>
		</div>
	)
}

export default AnimatedBackground

