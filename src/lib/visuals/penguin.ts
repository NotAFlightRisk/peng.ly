// the one an' only penguin, so every picture of 'im is the same bloke
export const box = { x: -255, w: 510, h: 465 };
export const viewBox = `${box.x} 0 ${box.w} ${box.h}`;
export const body =
	'M0 0 C98 0 119 67 119 134 C119 238 127 259 227 375 C242 393 255 427 255 450 V465 H-255 V450 C-255 427 -242 393 -227 375 C-127 259 -119 238 -119 134 C-119 67 -98 0 0 0 Z';
export const belly = 'M-171 465 V405 A171 171 0 0 1 171 405 V465 Z';
export const beak =
	'M0 176 C55 176 98 184 98 197 C98 221 20 276 0 276 C-20 276 -98 221 -98 197 C-98 184 -55 176 0 176 Z';
export const eyes = ['M-63 160 A37 49 0 1 1 -17 158 Z', 'M17 158 A37 49 0 1 1 63 160 Z'];
// odd eyes, the left one's always been a bit bigger
export const pupils = [
	{ x: -40, y: 128, r: 19 },
	{ x: 40, y: 128, r: 15.5 }
];
// 'is lids come down from the top an' up from the bottom, masked to a socket the shape of each eye
export const lids = eyes.map((socket, i) => ({
	socket,
	top: { x: pupils[i].x - 60, y: -50, width: 120, height: 120 },
	bottom: { cx: pupils[i].x, cy: 212, rx: 40, ry: 49 }
}));

// nice 'n' lazy, an' the damping's matched so 'is eyes don't go all wobbly
export const lazy = { stiffness: 0.04, damping: 0.36 };

// which way 'e's lookin', -1 to 1 each way, at summat x across an' y down from 'is eyes. Span's 'ow far counts as far
export function toward(x: number, y: number, span: number) {
	const angle = Math.atan2(y, x);
	const reach = Math.tanh(Math.hypot(x, y) / span);
	return { x: Math.cos(angle) * reach, y: Math.sin(angle) * reach };
}

// same again, but at the pointer, measured from 'is eye patches on the page
export function gaze(event: PointerEvent, patches: DOMRect) {
	const x = event.clientX - patches.x - patches.width / 2;
	const y = event.clientY - patches.y - patches.height / 2;
	return toward(x, y, patches.width);
}
