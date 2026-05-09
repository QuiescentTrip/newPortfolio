type RevealParams = {
	onReveal?: () => void;
};

export function revealOnScroll(node: HTMLElement, params: RevealParams = {}) {
	let onReveal = params.onReveal;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					onReveal?.();
					observer.unobserve(node);
				}
			}
		},
		{ threshold: 0.12, rootMargin: '0px 0px -5% 0px' }
	);
	observer.observe(node);
	return {
		update(newParams: RevealParams) {
			onReveal = newParams.onReveal;
		},
		destroy() {
			observer.disconnect();
		}
	};
}
