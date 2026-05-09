type RevealParams = {
	onReveal?: () => void;
	/** Called when the node leaves the viewport so animations can reset and replay. */
	onLeave?: () => void;
	threshold?: number;
	rootMargin?: string;
};

/** Single non-zero thresholds often chatter at the visibility edge; 0 = any overlap counts as visible. */
const DEFAULT_THRESHOLD = 0;
/** Match the real viewport; a negative bottom inset caused `onLeave` while the node was still visible when scrolling up. */
const DEFAULT_ROOT_MARGIN = '0px';

export function revealOnScroll(node: HTMLElement, params: RevealParams = {}) {
	let onReveal = params.onReveal;
	let onLeave = params.onLeave;
	let threshold = params.threshold ?? DEFAULT_THRESHOLD;
	let rootMargin = params.rootMargin ?? DEFAULT_ROOT_MARGIN;

	let observer: IntersectionObserver;

	const connect = () => {
		observer?.disconnect();
		observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) onReveal?.();
					else onLeave?.();
				}
			},
			{ threshold, rootMargin }
		);
		observer.observe(node);
	};

	connect();

	return {
		update(newParams: RevealParams) {
			if (newParams.onReveal !== undefined) onReveal = newParams.onReveal;
			if (newParams.onLeave !== undefined) onLeave = newParams.onLeave;
			const nextT = newParams.threshold ?? threshold;
			const nextR = newParams.rootMargin ?? rootMargin;
			if (nextT !== threshold || nextR !== rootMargin) {
				threshold = nextT;
				rootMargin = nextR;
				connect();
			}
		},
		destroy() {
			observer.disconnect();
		}
	};
}
