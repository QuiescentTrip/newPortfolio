import projects from '$lib/Projects';

/** Paths used by achievements (keep in sync with achievements-section). */
const ACHIEVEMENT_URLS: string[] = [
	'/images/achievements/01.jpg',
	'/images/achievements/02.jpg',
	'/images/achievements/03.jpg',
	'/images/achievements/04.jpg'
];

const ABOUT_PORTRAIT = '/images/about/me.jpg';

/** Hero title GIF (keep in sync with title.svelte). */
export const TITLE_GIF_PATH = '/images/giphy.gif';

const preloadedOk = new Set<string>();
const preloadedFailed = new Set<string>();

export function normalizeAssetSrc(src: string): string {
	if (src.startsWith('./')) return `/${src.slice(2)}`;
	return src;
}

function recordPreloaded(url: string) {
	preloadedOk.add(url);
	preloadedOk.add(normalizeAssetSrc(url));
	try {
		if (typeof window !== 'undefined') {
			const abs = new URL(url, window.location.origin).pathname;
			preloadedOk.add(abs);
		}
	} catch {
		/* ignore */
	}
}

function recordFailed(url: string) {
	preloadedFailed.add(url);
	preloadedFailed.add(normalizeAssetSrc(url));
	try {
		if (typeof window !== 'undefined') {
			const abs = new URL(url, window.location.origin).pathname;
			preloadedFailed.add(abs);
		}
	} catch {
		/* ignore */
	}
}

/** True after that URL completed preload during the load gate (successful load only). */
export function isPortfolioImagePreloaded(src: string): boolean {
	if (preloadedOk.has(src)) return true;
	const n = normalizeAssetSrc(src);
	if (preloadedOk.has(n)) return true;
	try {
		if (typeof window !== 'undefined') {
			return preloadedOk.has(new URL(src, window.location.origin).pathname);
		}
	} catch {
		return false;
	}
	return false;
}

/** True if preload attempted during the gate and the request failed. */
export function isPortfolioImageFailed(src: string): boolean {
	if (preloadedFailed.has(src)) return true;
	const n = normalizeAssetSrc(src);
	if (preloadedFailed.has(n)) return true;
	try {
		if (typeof window !== 'undefined') {
			return preloadedFailed.has(new URL(src, window.location.origin).pathname);
		}
	} catch {
		return false;
	}
	return false;
}

function collectProjectImageUrls(): string[] {
	const out: string[] = [];
	for (const p of [...projects.important, ...projects.unimportant]) {
		if (p.image) out.push(normalizeAssetSrc(p.image));
	}
	return out;
}

export function getPortfolioImageUrls(): string[] {
	return [
		...new Set([
			...ACHIEVEMENT_URLS,
			ABOUT_PORTRAIT,
			TITLE_GIF_PATH,
			...collectProjectImageUrls()
		])
	];
}

/** Load + decode so bitmaps are ready before the first paint after the gate. */
export function preloadPortfolioImages(): Promise<void> {
	const urls = getPortfolioImageUrls();
	return Promise.all(
		urls.map(
			(url) =>
				new Promise<void>((resolve) => {
					const img = new Image();
					img.onload = () => {
						recordPreloaded(url);
						recordPreloaded(img.src);
						img.decode().then(resolve).catch(resolve);
					};
					img.onerror = () => {
						recordFailed(url);
						resolve();
					};
					img.src = url;
				})
		)
	).then(() => {});
}
