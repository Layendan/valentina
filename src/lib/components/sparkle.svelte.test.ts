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
		expect(sparkleElement?.classList.contains('-z-10')).toBe(true);
		expect(sparkleElement?.classList.contains('bg-cover')).toBe(true);
		expect(sparkleElement?.classList.contains('bg-no-repeat')).toBe(true);
	});

	it('should apply random positioning when attached', () => {
		const { container } = render(Sparkle);
		const sparkleElement = container.querySelector('.sparkle') as HTMLElement;

		// The @attach directive should set inline styles
		expect(sparkleElement?.style.top).toBeTruthy();
		expect(sparkleElement?.style.left).toBeTruthy();
		expect(sparkleElement?.style.transform).toBeTruthy();
	});

	it('should apply random size', () => {
		const { container } = render(Sparkle);
		const sparkleElement = container.querySelector('.sparkle') as HTMLElement;

		// With Math.random mocked to 0.5, size should be 32px
		expect(sparkleElement?.style.width).toBeTruthy();
		expect(sparkleElement?.style.height).toBeTruthy();
	});

	it('should apply random rotation', () => {
		const { container } = render(Sparkle);
		const sparkleElement = container.querySelector('.sparkle') as HTMLElement;

		const transform = sparkleElement.style.transform;
		expect(transform).toMatch(/rotate\(\d+\.?\d*deg\)/);
	});

	it('should have sparkle animation applied via CSS', () => {
		const { container } = render(Sparkle);
		const sparkleElement = container.querySelector('.sparkle') as HTMLElement;

		// Check if the element has the sparkle class which applies the animation
		expect(sparkleElement?.classList.contains('sparkle')).toBe(true);
	});

	it('should render multiple sparkles with different properties', () => {
		// Mock Math.random to return different values for each call
		let callCount = 0;
		vi.spyOn(Math, 'random').mockImplementation(() => {
			callCount++;
			return callCount * 0.1; // Different value each time
		});

		const { container: container1 } = render(Sparkle);
		const { container: container2 } = render(Sparkle);

		const sparkle1 = container1.querySelector('.sparkle') as HTMLElement;
		const sparkle2 = container2.querySelector('.sparkle') as HTMLElement;

		// They should have different positioning/sizing
		expect(sparkle1.style.top).not.toBe(sparkle2.style.top);
		expect(sparkle1.style.left).not.toBe(sparkle2.style.left);
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
