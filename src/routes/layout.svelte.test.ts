import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Sparkle from '$lib/components/Sparkle.svelte';

// Test sparkles functionality separately since layout has complex children props
describe('Layout sparkles functionality', () => {
	it('should render sparkle component as intended in layout', () => {
		// Test that the Sparkle component renders correctly when used in layout
		const { container } = render(Sparkle);
		const sparkleElement = container.querySelector('div');

		expect(sparkleElement).toBeTruthy();

		// Check that sparkle has the proper styling
		expect(sparkleElement?.classList.contains('absolute')).toBe(true);
		expect(sparkleElement?.classList.contains('inset-0')).toBe(true);
		expect(sparkleElement?.classList.contains('-z-10')).toBe(true);
		expect(sparkleElement?.classList.contains('h-screen')).toBe(true);
		expect(sparkleElement?.classList.contains('w-screen')).toBe(true);
		expect(sparkleElement?.classList.contains('bg-cover')).toBe(true);
		expect(sparkleElement?.classList.contains('bg-no-repeat')).toBe(true);
		expect(sparkleElement?.classList.contains('blur-xs')).toBe(true);
	});

	it('should ensure sparkle has consistent positioning via CSS classes', () => {
		// Render a few sparkles and check they have consistent CSS classes
		const sparkle1 = render(Sparkle);
		const sparkle2 = render(Sparkle);
		const sparkle3 = render(Sparkle);

		const element1 = sparkle1.container.querySelector('div') as HTMLElement;
		const element2 = sparkle2.container.querySelector('div') as HTMLElement;
		const element3 = sparkle3.container.querySelector('div') as HTMLElement;

		// Check that they all have consistent CSS positioning classes
		[element1, element2, element3].forEach((element) => {
			expect(element.classList.contains('absolute')).toBe(true);
			expect(element.classList.contains('inset-0')).toBe(true);
		});

		// All sparkles should have identical class names
		const classNames = [element1, element2, element3].map((el) => el.className);
		const uniqueClassNames = new Set(classNames);
		expect(uniqueClassNames.size).toBe(1);
	});

	it('should verify sparkle is positioned behind content with negative z-index', () => {
		const { container } = render(Sparkle);
		const sparkleElement = container.querySelector('div');

		expect(sparkleElement?.classList.contains('-z-10')).toBe(true);
		expect(sparkleElement?.classList.contains('absolute')).toBe(true);
	});

	it('should confirm sparkle has background styling classes', () => {
		const { container } = render(Sparkle);
		const sparkleElement = container.querySelector('div');

		// The sparkle has background image styling
		expect(sparkleElement?.classList.contains('bg-cover')).toBe(true);
		expect(sparkleElement?.classList.contains('bg-no-repeat')).toBe(true);
	});
});
