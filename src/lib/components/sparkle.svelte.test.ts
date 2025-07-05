import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Sparkle from './Sparkle.svelte';

describe('Sparkle component', () => {
	it('should render a div with confetti background', () => {
		const { container } = render(Sparkle);
		const sparkleElement = container.querySelector('div');

		expect(sparkleElement).toBeTruthy();
		expect(sparkleElement?.tagName).toBe('DIV');
	});

	it('should have the correct CSS classes', () => {
		const { container } = render(Sparkle);
		const sparkleElement = container.querySelector('div');

		expect(sparkleElement?.classList.contains('absolute')).toBe(true);
		expect(sparkleElement?.classList.contains('inset-0')).toBe(true);
		expect(sparkleElement?.classList.contains('-z-10')).toBe(true);
		expect(sparkleElement?.classList.contains('h-screen')).toBe(true);
		expect(sparkleElement?.classList.contains('w-screen')).toBe(true);
		expect(sparkleElement?.classList.contains('bg-cover')).toBe(true);
		expect(sparkleElement?.classList.contains('bg-no-repeat')).toBe(true);
		expect(sparkleElement?.classList.contains('blur-xs')).toBe(true);
	});

	it('should use CSS classes for positioning instead of inline styles', () => {
		const { container } = render(Sparkle);
		const sparkleElement = container.querySelector('div') as HTMLElement;

		// Should not have inline styles since we're using CSS classes
		expect(sparkleElement?.style.top).toBe('');
		expect(sparkleElement?.style.left).toBe('');
		expect(sparkleElement?.style.transform).toBe('');
	});

	it('should not apply random size anymore', () => {
		const { container } = render(Sparkle);
		const sparkleElement = container.querySelector('div') as HTMLElement;

		// The component uses CSS classes for sizing, not inline styles
		expect(sparkleElement?.style.width).toBe('');
		expect(sparkleElement?.style.height).toBe('');
	});

	it('should have consistent positioning via CSS classes', () => {
		const { container } = render(Sparkle);
		const sparkleElement = container.querySelector('div') as HTMLElement;

		// Positioning is handled by CSS classes
		expect(sparkleElement?.classList.contains('absolute')).toBe(true);
		expect(sparkleElement?.classList.contains('inset-0')).toBe(true);
	});

	it('should have confetti background applied via CSS', () => {
		const { container } = render(Sparkle);
		const sparkleElement = container.querySelector('div') as HTMLElement;

		// Check if the element has the background image classes
		expect(sparkleElement?.classList.contains('bg-cover')).toBe(true);
		expect(sparkleElement?.classList.contains('bg-no-repeat')).toBe(true);
	});

	it('should render multiple components with consistent properties', () => {
		// Since the component uses CSS classes for positioning, all instances will be identical
		const { container: container1 } = render(Sparkle);
		const { container: container2 } = render(Sparkle);

		const sparkle1 = container1.querySelector('div') as HTMLElement;
		const sparkle2 = container2.querySelector('div') as HTMLElement;

		// All sparkles should have the same CSS classes
		expect(sparkle1.className).toBe(sparkle2.className);

		// Both should have the same positioning classes
		expect(sparkle1.classList.contains('absolute')).toBe(sparkle2.classList.contains('absolute'));
		expect(sparkle1.classList.contains('inset-0')).toBe(sparkle2.classList.contains('inset-0'));
	});

	it('should have proper z-index for layering behind content', () => {
		const { container } = render(Sparkle);
		const sparkleElement = container.querySelector('div');

		// Should have negative z-index to appear behind other content
		expect(sparkleElement?.classList.contains('-z-10')).toBe(true);
	});

	it('should have correct basic structure', () => {
		const { container } = render(Sparkle);
		const sparkleElement = container.querySelector('div');

		expect(sparkleElement).toBeTruthy();
		expect(sparkleElement?.tagName).toBe('DIV');
		expect(sparkleElement?.classList.contains('absolute')).toBe(true);
	});
});
