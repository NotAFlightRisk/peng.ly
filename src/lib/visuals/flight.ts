// 'ow a paper plane flies, in the drawin's units. Y goes down the screen, 'eadin's in radians wiv up as positive
export type Point = { x: number; y: number };
export type Box = { left: number; right: number; top: number; bottom: number };
export type Plane = Point & {
	id: number;
	speed: number;
	heading: number;
	start: number;
	trim: number;
	spin: number;
	stun: number;
	age: number;
	free: boolean;
	dud: boolean;
	seen: string[];
};

// it's a glider: it cruises at TRIM, an' goes GLIDE across for every one it drops
export const TRIM = 400;
const GRAVITY = 900;
const GLIDE = 10;
const LIFT = GRAVITY / TRIM ** 2;
const DRAG = LIFT / GLIDE;
// paper bends, so there's only so 'ard the wings can pull
const PULL = 1.8 * GRAVITY;
const STALL = 60;
const GUST = 0.4;
const BOUNCE = 0.45;

// lift pulls it round when it's quick, gravity drops the nose when it's slow, so it swoops
export function glide(p: Plane, dt: number) {
	const lift = Math.min(LIFT * p.trim * p.speed ** 2, PULL) * (p.dud || p.stun > 0 ? 0.2 : 1);
	p.speed = Math.max(p.speed - (GRAVITY * Math.sin(p.heading) + DRAG * p.speed ** 2) * dt, STALL);
	p.heading += ((lift - GRAVITY * Math.cos(p.heading)) / p.speed + GUST * Math.sin(p.age * 2.3 + p.id)) * dt;
	p.x += p.speed * Math.cos(p.heading) * dt;
	p.y -= p.speed * Math.sin(p.heading) * dt;
	p.spin -= p.spin * 3 * dt;
	p.stun -= dt;
	p.age += dt;
}

// knocks it back off the underside or side o' summat, true if it 'it. It just flies past in front o' the tops
export function bonk(p: Plane, was: Point, { left, right, top, bottom }: Box) {
	const inside = (q: Point) => q.x > left && q.x < right && q.y > top && q.y < bottom;
	if (!inside(p) || inside(was) || was.y <= top) return false;
	let vx = p.speed * Math.cos(p.heading);
	let vy = p.speed * Math.sin(p.heading);
	if (was.y >= bottom) {
		vy = -Math.abs(vy) * BOUNCE;
		p.y = bottom;
	} else {
		vx = (was.x < left ? -1 : 1) * Math.abs(vx) * BOUNCE;
		p.x = was.x < left ? left : right;
	}
	p.speed = Math.max(Math.hypot(vx, vy), STALL);
	p.heading = Math.atan2(vy, vx);
	p.spin = Math.random() * 4 - 2;
	p.stun = 0.4;
	return true;
}
