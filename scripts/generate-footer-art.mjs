import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "public/images/footer-landscape.svg");
const width = 1600;
const height = 340;

const colors = {
	parchment: "#ede5dd",
	ink: "#332f2c",
	sky: "#a9cde0",
	skyHorizon: "#e3eff3",
	olive: "#78845d",
	oliveLight: "#9ba77a",
	wheat: "#e6c36a",
	wheatLight: "#f6e7b0",
};

// Deterministic PRNG so the artwork is identical on every run.
function mulberry32(seed) {
	let state = seed;
	return () => {
		state = (state + 0x6d2b79f5) | 0;
		let t = Math.imul(state ^ (state >>> 15), 1 | state);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

const rand = mulberry32(2026);
const rr = (min, max) => min + (max - min) * rand();
const f = (value) => Math.round(value * 10) / 10;
const bump = (t) =>
	Math.abs(t) >= 1 ? 0 : ((1 + Math.cos(Math.PI * t)) / 2) ** 0.9;

function polyline(points) {
	return points
		.map(([x, y], index) => `${index ? "L" : "M"}${f(x)} ${f(y)}`)
		.join("");
}

// Layers go from far to near. Each one is the union of several round hills.
const layers = [
	{
		base: 300,
		hills: [
			{ cx: 90, w: 330, top: 150 },
			{ cx: 560, w: 300, top: 128 },
			{ cx: 1010, w: 340, top: 142 },
			{ cx: 1480, w: 360, top: 120 },
		],
		gradient: ["#dfc9a4", "#cfb48c"],
		blobs: ["#ead8b6", "#b99a6e"],
		contour: "#a88b63",
		crest: "#f4e6c6",
		tree: { count: 10, scale: [0.2, 0.28], foliage: "#a9b17c" },
		trail: { color: "#f4e6c6", opacity: 0.55, edge: "#8b6f48" },
		paths: [{ xs: 520, xc: 575, drop: 30, amp: 8, zig: 3, width: 1.6 }],
		wheat: [],
	},
	{
		base: 300,
		hills: [
			{ cx: 330, w: 330, top: 182 },
			{ cx: 800, w: 300, top: 168 },
			{ cx: 1250, w: 340, top: 176 },
		],
		gradient: ["#d0ae80", "#b98f62"],
		blobs: ["#ddbf92", "#9a7448"],
		contour: "#8f6c46",
		crest: "#ecd3a8",
		tree: { count: 11, scale: [0.28, 0.38], foliage: "#8f9a62" },
		trail: { color: "#f4e6c6", opacity: 0.8, edge: "#5e4228" },
		paths: [
			{ xs: 300, xc: 360, drop: 46, amp: 14, zig: 3, width: 2.4 },
			{ xs: 1230, xc: 1190, drop: 40, amp: 12, zig: 3.5, width: 2.4 },
		],
		wheat: [
			{ x1: 230, x2: 350, scale: 0.55 },
			{ x1: 1180, x2: 1290, scale: 0.55 },
		],
	},
	{
		base: 300,
		hills: [
			{ cx: 90, w: 300, top: 216 },
			{ cx: 560, w: 330, top: 208 },
			{ cx: 1070, w: 320, top: 214 },
			{ cx: 1500, w: 300, top: 204 },
		],
		gradient: ["#b98a5c", "#94693f"],
		blobs: ["#c99c6a", "#7a5230"],
		contour: "#5f4129",
		crest: "#d8b588",
		tree: { count: 9, scale: [0.4, 0.5], foliage: colors.oliveLight },
		trail: { color: "#f4e6c6", opacity: 0.85, edge: "#4a3320" },
		paths: [
			{ xs: 520, xc: 590, drop: 60, amp: 20, zig: 3, width: 3.4 },
			{ xs: 1030, xc: 1100, drop: 58, amp: 18, zig: 2.5, width: 3.4 },
			{ xs: 40, xc: 110, drop: 55, amp: 16, zig: 3, width: 3.2 },
		],
		wheat: [
			{ x1: 420, x2: 540, scale: 0.75 },
			{ x1: 1010, x2: 1130, scale: 0.75 },
		],
	},
	{
		base: 288,
		hills: [
			{ cx: 180, w: 440, top: 248 },
			{ cx: 1420, w: 460, top: 240 },
			{ cx: 640, w: 200, top: 272 },
			{ cx: 980, w: 210, top: 274 },
		],
		gradient: ["#8a6642", "#5e4430"],
		blobs: ["#9c7852", "#46301f"],
		contour: "#3d2a1a",
		crest: "#b58f68",
		tree: { count: 7, scale: [0.55, 0.7], foliage: colors.olive },
		trail: { color: "#f4e6c6", opacity: 0.9, edge: "#33220f" },
		paths: [
			{ xs: 150, xc: 270, drop: 46, amp: 22, zig: 3, width: 5 },
			{ xs: 1380, xc: 1330, drop: 44, amp: 20, zig: 3.5, width: 5 },
			{ xs: 1530, xc: 1470, drop: 40, amp: 14, zig: 2.5, width: 4.5 },
		],
		wheat: [
			{ x1: 1330, x2: 1470, scale: 1 },
			{ x1: 60, x2: 180, scale: 1 },
		],
	},
].map((layer) => ({
	...layer,
	surface: (x) =>
		Math.min(
			layer.base,
			...layer.hills.map(
				({ cx, w, top }) => layer.base - (layer.base - top) * bump((x - cx) / w)
			)
		),
}));

const nearestSurface = (layerIndex, x) =>
	Math.min(
		Infinity,
		...layers.slice(layerIndex + 1).map((layer) => layer.surface(x))
	);

const sampleX = Array.from({ length: 101 }, (_, index) => -10 + index * 16.2);

function tree(x, ground, scale, foliage) {
	return `<use href="#olive" transform="translate(${f(x)} ${f(ground - 28 * scale)}) scale(${f(scale * 100) / 100})" color="${foliage}"/>`;
}

const stalkVariants = { "-1": "#st-l", 0: "#st-c", 1: "#st-r" };

function stalk(x, y, scale, slant, grain) {
	const variant =
		stalkVariants[Math.max(-1, Math.min(1, Math.round(slant / 0.2)))];
	return `<use href="${variant}" transform="translate(${f(x)} ${f(y)}) scale(${scale})" color="${grain}"/>`;
}

const layerMarkup = layers
	.map((layer, index) => {
		const surface = layer.surface;
		const outline = sampleX.map((x) => [x, surface(x)]);
		const silhouette = `${polyline(outline)}L1610 340L-10 340Z`;
		const visibleX = sampleX.filter((x, i) => i % 2 === 0 && surface(x) < 282);

		const blobs = Array.from({ length: 11 }, (_, blobIndex) => {
			const x = rr(0, width);
			const y = surface(x) + rr(14, 52);
			return `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rr(40, 110))}" ry="${f(rr(8, 18))}" fill="${layer.blobs[blobIndex % 2]}" opacity=".3"/>`;
		}).join("");

		const contours = [15, 33]
			.map(
				(offset) =>
					`<path d="${polyline(visibleX.map((x) => [x, surface(x) + offset]))}" stroke="${layer.contour}" stroke-opacity=".22" stroke-width="1.2" stroke-linecap="round"/>`
			)
			.join("");

		const crest = `<path d="${polyline(outline.map(([x, y]) => [x, y + 1]))}" stroke="${layer.crest}" stroke-opacity=".7" stroke-width="1.6" stroke-linecap="round"/>`;

		const trails = layer.paths
			.map(({ xs, xc, drop, amp, zig, width: trailWidth }) => {
				const points = Array.from({ length: 17 }, (_, step) => {
					const t = step / 16;
					const x =
						xs +
						(xc - xs) * t +
						amp * Math.sin(t * zig * Math.PI) * (1 - t * 0.35);
					return [x, surface(x) + 4 + drop * (1 - t) ** 1.1];
				});
				const d = polyline(points);
				return `<path d="${d}" stroke="${layer.trail.edge}" stroke-opacity=".38" stroke-width="${f(trailWidth + 1.6)}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="${layer.trail.color}" stroke-opacity="${layer.trail.opacity}" stroke-width="${trailWidth}" stroke-linecap="round" stroke-linejoin="round"/>`;
			})
			.join("");

		const wheat = layer.wheat
			.map(({ x1, x2, scale }) => {
				const band = Array.from(
					{ length: Math.ceil((x2 - x1) / 8) + 1 },
					(_, step) => {
						const x = x1 + step * 8;
						return [x, surface(x) + 8];
					}
				);
				const bottom = band
					.map(([x, y]) => [x, y + (14 + 5 * Math.sin(x * 0.07)) * scale])
					.reverse();
				const field = `<path d="${polyline(band)}${polyline(bottom).replace("M", "L")}Z" fill="${colors.wheat}" fill-opacity=".55"/>`;
				const stalks = Array.from({ length: 14 }, (_, stalkIndex) => {
					const x = rr(x1, x2);
					const y = surface(x) + 11 + rr(0, 14) * scale;
					return stalk(
						x,
						y,
						scale,
						rr(-0.3, 0.3),
						stalkIndex % 2 ? colors.wheat : colors.wheatLight
					);
				}).join("");
				return `${field}<g>${stalks}</g>`;
			})
			.join("");

		const trees = Array.from({ length: layer.tree.count }, (_, treeIndex) => {
			const slot = width / layer.tree.count;
			const x = slot * (treeIndex + 0.1 + rand() * 0.8);
			const y = surface(x);
			if (y > 275 || y > nearestSurface(index, x) - 6) return "";
			const scale = rr(layer.tree.scale[0], layer.tree.scale[1]);
			return tree(x, y + 5, scale, layer.tree.foliage);
		}).join("");

		return `<clipPath id="clip-${index}"><use href="#sil-${index}"/></clipPath>
<linearGradient id="hill-${index}" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${layer.gradient[0]}"/><stop offset="1" stop-color="${layer.gradient[1]}"/></linearGradient>
<path id="sil-${index}" d="${silhouette}" fill="url(#hill-${index})"/>
<g clip-path="url(#clip-${index})">${blobs}</g>
<g fill="none">${contours}${crest}${trails}</g>
<g fill="none">${wheat}</g>
<g>${trees}</g>`;
	})
	.join("\n");

// Hero olive: one large foreground tree built from overlapping brush-like blobs.
const heroOlive = { x: 236, ground: 308, cy: 172, rx: 98, ry: 52 };

function buildHeroOlive({ x, ground, cy, rx, ry }) {
	const greens = ["#c3cc8b", "#9aa86a", "#6b7a47", "#4f5a38"];
	const blobs = Array.from({ length: 46 }, () => {
		const angle = rand() * Math.PI * 2;
		const radius = Math.sqrt(rand());
		const bx = x + Math.cos(angle) * rx * radius;
		const by = cy + Math.sin(angle) * ry * radius;
		const depth = Math.min(1, Math.max(0, (by - (cy - ry)) / (2 * ry)));
		// Light comes from the right: lean the tone brighter on that side.
		const lean = (bx - x) / rx;
		const tone = Math.min(3, Math.max(0, Math.floor(depth * 3.2 - lean * 0.8)));
		return { bx, by, tone, rxb: rr(15, 28), ryb: rr(10, 16) };
	}).sort((a, b) => b.tone - a.tone || a.by - b.by);

	const canopy = blobs
		.map(
			({ bx, by, tone, rxb, ryb }) =>
				`<ellipse cx="${f(bx)}" cy="${f(by)}" rx="${f(rxb)}" ry="${f(ryb)}" fill="${greens[tone]}"/>`
		)
		.join("");

	const leaves = Array.from({ length: 26 }, () => {
		const angle = rand() * Math.PI * 2;
		const radius = Math.sqrt(rand()) * 0.95;
		const lx = x + Math.cos(angle) * rx * radius;
		const ly = cy + Math.sin(angle) * ry * radius;
		const dir = rr(-0.6, 0.6);
		return `M${f(lx)} ${f(ly)}q${f(8 + dir * 4)} ${f(-5)} ${f(16 + dir * 6)} ${f(dir * 3)}`;
	}).join("");

	const trunk = `<path d="M${x - 9} ${ground}C${x - 15} ${ground - 28} ${x + 7} ${ground - 44} ${x - 4} ${cy + 26}L${x + 14} ${cy + 26}C${x + 6} ${ground - 40} ${x + 24} ${ground - 24} ${x + 17} ${ground}Z" fill="#4a3a24"/><path d="M${x + 8} ${ground - 4}C${x + 12} ${ground - 24} ${x + 4} ${ground - 36} ${x + 8} ${cy + 30}" stroke="#8a7440" stroke-opacity=".6" stroke-width="2" stroke-linecap="round"/>`;
	const branches = `<path d="M${x + 4} ${cy + 34}q-26-6-46-30M${x + 6} ${cy + 36}q22-8 40-34M${x + 2} ${cy + 40}q-4-20 2-36" stroke="#4a3a24" stroke-width="5" stroke-linecap="round"/>`;
	const shadow = `<ellipse cx="${x + 78}" cy="${ground + 6}" rx="108" ry="9" fill="${colors.ink}" opacity=".24"/>`;
	const core = `<ellipse cx="${x}" cy="${cy + 4}" rx="${f(rx * 0.86)}" ry="${f(ry * 0.78)}" fill="#4f5a38"/>`;
	return `${shadow}${trunk}${branches}${core}${canopy}<path d="${leaves}" stroke="#dfe6a8" stroke-opacity=".6" stroke-width="1.6" stroke-linecap="round"/>`;
}

const heroOliveMarkup = buildHeroOlive(heroOlive);

// Olive rows on the front ground, anchored to the nearest hill surface.
const frontSurface = layers[3].surface;
const oliveRows = [
	{ start: 45, count: 8, step: 74, scale: 0.62, drop: 10 },
	{ start: 105, count: 7, step: 91, scale: 0.82, drop: 34 },
	{ start: 294, count: 6, step: 103, scale: 0.56, drop: 8 },
	{ start: 352, count: 7, step: 106, scale: 0.76, drop: 32 },
	{ start: 938, count: 6, step: 104, scale: 0.58, drop: 8 },
	{ start: 1002, count: 7, step: 99, scale: 0.78, drop: 32 },
	{ start: 1386, count: 8, step: 76, scale: 0.65, drop: 12 },
];

const groveMarkup = oliveRows
	.flatMap(({ start, count, step, scale, drop }, row) =>
		Array.from({ length: count }, (_, index) => {
			const x = start + index * step + (index % 2) * 13;
			if (Math.abs(x - heroOlive.x) < 110) return "";
			const ground = frontSurface(x) + drop + ((index * 7 + row * 5) % 11);
			const size = scale * (0.9 + ((index * 3 + row) % 4) * 0.07);
			const foliage =
				(index + row) % 3 === 0 ? colors.oliveLight : colors.olive;
			return tree(x, ground, size, foliage);
		})
	)
	.join("");

const wheatPatches = [
	{ x: 28, y: 280, width: 144, height: 40, count: 9, slant: -0.3 },
	{ x: 250, y: 287, width: 162, height: 35, count: 8, slant: 0.24 },
	{ x: 440, y: 278, width: 158, height: 43, count: 10, slant: -0.2 },
	{ x: 646, y: 290, width: 75, height: 31, count: 5, slant: 0.18 },
	{ x: 958, y: 282, width: 118, height: 39, count: 7, slant: -0.2 },
	{ x: 1130, y: 286, width: 163, height: 36, count: 9, slant: 0.25 },
	{ x: 1420, y: 279, width: 157, height: 43, count: 9, slant: -0.18 },
];

const wheatMarkup = wheatPatches
	.map(({ x, y, width: patchWidth, height: patchHeight, count, slant }, band) =>
		Array.from({ length: count }, (_, index) => {
			const stalkX = x + 5 + ((index * 37 + band * 19) % (patchWidth - 10));
			const stalkY = y + 6 + ((index * 23 + band * 17) % (patchHeight - 12));
			const grain = (index + band) % 2 === 0 ? colors.wheat : colors.wheatLight;
			return stalk(
				stalkX,
				stalkY,
				1,
				slant * (0.8 + (index % 3) * 0.25),
				grain
			);
		}).join("")
	)
	.join("");

const cloudParts = [
	[0, 0, 45, 13],
	[-23, 1, 22, 11],
	[15, -8, 25, 17],
	[41, 1, 19, 10],
];

function cloud(cx, cy, scale, opacity) {
	const parts = (dy, fill, alpha) =>
		`<g fill="${fill}" opacity="${f(alpha)}">${cloudParts
			.map(
				([dx, py, rx, ry]) =>
					`<ellipse cx="${f(cx + dx * scale)}" cy="${f(cy + (py + dy) * scale)}" rx="${f(rx * scale)}" ry="${f(ry * scale)}"/>`
			)
			.join("")}</g>`;
	return `${parts(4, "#e3bd76", opacity * 0.7)}${parts(0, "#fffaf0", opacity)}${parts(-4, "#fff3cc", opacity * 0.35)}`;
}

const clouds = [
	cloud(166, 116, 1, 0.82),
	cloud(427, 82, 0.85, 0.78),
	cloud(617, 135, 0.67, 0.8),
	cloud(1010, 106, 0.96, 0.78),
	cloud(1282, 143, 0.76, 0.82),
	cloud(1484, 91, 0.93, 0.8),
].join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" fill="none">
<defs>
  <g id="olive"><path d="M0 0v28m0-12-9-10m9 6 10-13m-10 4 1-17" fill="none" stroke="${colors.ink}" stroke-opacity=".66" stroke-width="2" stroke-linecap="round"/><path d="M-24-19c1-11 11-17 24-16 13-1 24 6 24 17 0 11-11 17-24 16-14 1-24-6-24-17Z" fill="currentColor"/><path d="M-14-23q14-9 28 0M-17-16q17-8 34 0" fill="none" stroke="${colors.parchment}" stroke-opacity=".5" stroke-width="1.7" stroke-linecap="round"/></g>
  <path id="st-l" d="M0 0l-3 -17m.45 3-4-4m1.1 2 4-5m-5.1 8-4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
  <path id="st-c" d="M0 0l0 -17m0 3-4-4m4 2 4-5m-4 8-4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
  <path id="st-r" d="M0 0l3 -17m-.45 3-4-4m5.1 2 4-5m-2.9 8-4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
  <linearGradient id="sky-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${colors.sky}" stop-opacity="0"/><stop offset=".3" stop-color="${colors.sky}" stop-opacity=".62"/><stop offset=".55" stop-color="#cfe3ea" stop-opacity=".92"/><stop offset=".78" stop-color="#f0e3b8" stop-opacity=".96"/><stop offset="1" stop-color="#f0e3b8"/></linearGradient>
  <radialGradient id="glow"><stop stop-color="#fff4c4" stop-opacity=".95"/><stop offset=".3" stop-color="#f8e8a4" stop-opacity=".6"/><stop offset="1" stop-color="#f6e3a0" stop-opacity="0"/></radialGradient>
</defs>
<path d="M0 0h1600v340H0Z" fill="url(#sky-fill)"/>
<ellipse cx="1130" cy="176" rx="430" ry="140" fill="url(#glow)"/>
${clouds}
${layerMarkup}
<g>${groveMarkup}</g>
<g fill="none">${wheatMarkup}</g>
${heroOliveMarkup}
</svg>`;

await mkdir(dirname(output), { recursive: true });
await writeFile(output, svg);
console.log(`Generated ${output} (${svg.length} bytes)`);
