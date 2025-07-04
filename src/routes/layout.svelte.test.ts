import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Sparkle from '$lib/components/Sparkle.svelte';

// Test sparkles functionality separately since layout has complex children props
describe('Layout sparkles functionality', () => {
	it('should render multiple sparkles as intended in layout', () => {
		// Simulate what the layout does - render 25 sparkles
		const sparkles: HTMLElement[] = [];

		for (let i = 0; i < 25; i++) {
			const { container } = render(Sparkle);
			const sparkleElement = container.querySelector('.sparkle') as HTMLElement;
			if (sparkleElement) {
				sparkles.push(sparkleElement);
			}
		}

		expect(sparkles.length).toBe(25);

		// Check that each sparkle has the proper styling
		sparkles.forEach((sparkle) => {
			expect(sparkle.classList.contains('sparkle')).toBe(true);
			expect(sparkle.classList.contains('absolute')).toBe(true);
			expect(sparkle.classList.contains('top-1/2')).toBe(true);
			expect(sparkle.classList.contains('left-1/2')).toBe(true);
			expect(sparkle.classList.contains('-z-10')).toBe(true);
			expect(sparkle.classList.contains('h-screen')).toBe(true);
			expect(sparkle.classList.contains('w-screen')).toBe(true);
			expect(sparkle.classList.contains('-translate-x-1/2')).toBe(true);
			expect(sparkle.classList.contains('-translate-y-1/2')).toBe(true);
			expect(sparkle.classList.contains('transform')).toBe(true);
			expect(sparkle.classList.contains('bg-cover')).toBe(true);
			expect(sparkle.classList.contains('bg-no-repeat')).toBe(true);
		});
	});

	it('should ensure sparkles have consistent positioning via CSS classes', () => {
		// Render a few sparkles and check they have consistent CSS classes
		const sparkle1 = render(Sparkle);
		const sparkle2 = render(Sparkle);
		const sparkle3 = render(Sparkle);

		const element1 = sparkle1.container.querySelector('.sparkle') as HTMLElement;
		const element2 = sparkle2.container.querySelector('.sparkle') as HTMLElement;
		const element3 = sparkle3.container.querySelector('.sparkle') as HTMLElement;

		// Check that they all have consistent CSS positioning classes
		[element1, element2, element3].forEach((element) => {
			expect(element.classList.contains('top-1/2')).toBe(true);
			expect(element.classList.contains('left-1/2')).toBe(true);
			expect(element.classList.contains('-translate-x-1/2')).toBe(true);
			expect(element.classList.contains('-translate-y-1/2')).toBe(true);
		});

		// All sparkles should have identical class names
		const classNames = [element1, element2, element3].map((el) => el.className);
		const uniqueClassNames = new Set(classNames);
		expect(uniqueClassNames.size).toBe(1);
	});

	it('should verify sparkles are positioned behind content with negative z-index', () => {
		const { container } = render(Sparkle);
		const sparkleElement = container.querySelector('.sparkle');

		expect(sparkleElement?.classList.contains('-z-10')).toBe(true);
		expect(sparkleElement?.classList.contains('absolute')).toBe(true);
	});

	it('should confirm sparkles have animation classes', () => {
		const { container } = render(Sparkle);
		const sparkleElement = container.querySelector('.sparkle');

		// The sparkle class enables the CSS animation
		expect(sparkleElement?.classList.contains('sparkle')).toBe(true);
	});
});
