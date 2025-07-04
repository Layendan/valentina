import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Sparkle from './Sparkle.svelte';

describe('Sparkle component', () => {
	beforeEach(() => {
		// Mock Math.random for predictable tests
		vi.spyOn(Math, 'random').mockReturnValue(0.5);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should render a div with sparkle class', () => {
		const { container } = render(Sparkle);
		const sparkleElement = container.querySelector('.sparkle');

		expect(sparkleElement).toBeTruthy();
		expect(sparkleElement?.tagName).toBe('DIV');
	});

	it('should have the correct CSS classes', () => {
		const { container } = render(Sparkle);
		const sparkleElement = container.querySelector('.sparkle');

		expect(sparkleElement?.classList.contains('sparkle')).toBe(true);
		expect(sparkleElement?.classList.contains('absolute')).toBe(true);
		expect(sparkleElement?.classList.contains('top-1/2')).toBe(true);
		expect(sparkleElement?.classList.contains('left-1/2')).toBe(true);
		expect(sparkleElement?.classList.contains('-z-10')).toBe(true);
		expect(sparkleElement?.classList.contains('h-screen')).toBe(true);
		expect(sparkleElement?.classList.contains('w-screen')).toBe(true);
		expect(sparkleElement?.classList.contains('-translate-x-1/2')).toBe(true);
		expect(sparkleElement?.classList.contains('-translate-y-1/2')).toBe(true);
		expect(sparkleElement?.classList.contains('transform')).toBe(true);
		expect(sparkleElement?.classList.contains('bg-cover')).toBe(true);
		expect(sparkleElement?.classList.contains('bg-no-repeat')).toBe(true);
	});

	it('should use CSS classes for positioning instead of inline styles', () => {
		const { container } = render(Sparkle);
		const sparkleElement = container.querySelector('.sparkle') as HTMLElement;

		// Should not have inline styles anymore since we're using CSS classes
		expect(sparkleElement?.style.top).toBe('');
		expect(sparkleElement?.style.left).toBe('');
		expect(sparkleElement?.style.transform).toBe('');
	});

	it('should not apply random size anymore', () => {
		const { container } = render(Sparkle);
		const sparkleElement = container.querySelector('.sparkle') as HTMLElement;

		// The component now uses CSS classes for sizing, not inline styles
		expect(sparkleElement?.style.width).toBe('');
		expect(sparkleElement?.style.height).toBe('');
	});

	it('should have consistent positioning via CSS classes', () => {
		const { container } = render(Sparkle);
		const sparkleElement = container.querySelector('.sparkle') as HTMLElement;

		// All positioning is now handled by CSS classes
		expect(sparkleElement?.classList.contains('top-1/2')).toBe(true);
		expect(sparkleElement?.classList.contains('left-1/2')).toBe(true);
		expect(sparkleElement?.classList.contains('-translate-x-1/2')).toBe(true);
		expect(sparkleElement?.classList.contains('-translate-y-1/2')).toBe(true);
	});

	it('should have sparkle animation applied via CSS', () => {
		const { container } = render(Sparkle);
		const sparkleElement = container.querySelector('.sparkle') as HTMLElement;

		// Check if the element has the sparkle class which applies the animation
		expect(sparkleElement?.classList.contains('sparkle')).toBe(true);
	});

	it('should render multiple sparkles with consistent properties', () => {
		// Since the component now uses CSS classes for positioning, all sparkles will be identical
		const { container: container1 } = render(Sparkle);
		const { container: container2 } = render(Sparkle);

		const sparkle1 = container1.querySelector('.sparkle') as HTMLElement;
		const sparkle2 = container2.querySelector('.sparkle') as HTMLElement;

		// All sparkles should have the same CSS classes
		expect(sparkle1.className).toBe(sparkle2.className);

		// Both should have the same positioning classes
		expect(sparkle1.classList.contains('top-1/2')).toBe(sparkle2.classList.contains('top-1/2'));
		expect(sparkle1.classList.contains('left-1/2')).toBe(sparkle2.classList.contains('left-1/2'));
	});

	it('should have proper z-index for layering behind content', () => {
		const { container } = render(Sparkle);
		const sparkleElement = container.querySelector('.sparkle');

		// Should have negative z-index to appear behind other content
		expect(sparkleElement?.classList.contains('-z-10')).toBe(true);
	});

	it('should have correct basic structure', () => {
		const { container } = render(Sparkle);
		const sparkleElement = container.querySelector('.sparkle');

		expect(sparkleElement).toBeTruthy();
		expect(sparkleElement?.tagName).toBe('DIV');
		expect(sparkleElement?.classList.contains('absolute')).toBe(true);
	});
});
