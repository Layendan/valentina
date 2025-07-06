import { page } from '@vitest/browser/context';
import { describe, expect, it, beforeEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	beforeEach(() => {
		render(Page);
	});

	it('should render the main heading', async () => {
		const heading = page.getByRole('heading', { level: 1 });
		await expect.element(heading).toBeInTheDocument();
	});

	it('should render the description', async () => {
		const description = page.getByText('A decision-making tool for my girlfriend Valentina');
		await expect.element(description).toBeInTheDocument();
	});

	it('should initially show the input form', async () => {
		const textarea = page.getByPlaceholder('What are your thoughts?');
		await expect.element(textarea).toBeInTheDocument();

		const decisionButton = page.getByRole('button', { name: 'Make a Decision' });
		await expect.element(decisionButton).toBeInTheDocument();

		const valingButton = page.getByRole('button', { name: "I'm Valing it" });
		await expect.element(valingButton).toBeInTheDocument();
	});

	it('should allow typing in the textarea', async () => {
		const textarea = page.getByPlaceholder('What are your thoughts?');
		const testText = 'I need help deciding what to have for dinner';

		await textarea.fill(testText);
		await expect.element(textarea).toHaveValue(testText);
	});
	it('should transition to response view when Make a Decision button is clicked', async () => {
		const textarea = page.getByPlaceholder('What are your thoughts?');
		const testText = 'Should I go to the gym today?';

		await textarea.fill(testText);

		const decisionButton = page.getByRole('button', { name: 'Make a Decision' });
		await decisionButton.click();

		// User's input should be displayed in the response view
		await expect.element(page.getByText(testText)).toBeInTheDocument();

		// Input form should be hidden (decision button should not be visible)
		const decisionButtonAfterSubmit = page.getByRole('button', { name: 'Make a Decision' });
		await expect.element(decisionButtonAfterSubmit).not.toBeInTheDocument();

		// Reset button should be visible
		const resetButton = page.getByRole('button', { name: 'Reset' });
		await expect.element(resetButton).toBeInTheDocument();
	});

	it('should display a decision response immediately after clicking Make a Decision', async () => {
		const textarea = page.getByPlaceholder('What are your thoughts?');
		await textarea.fill('Test input');

		const decisionButton = page.getByRole('button', { name: 'Make a Decision' });
		await decisionButton.click();

		// The decision response should be displayed immediately (no loading state)
		// Since we're in response view, there should be a reset button
		const responseResetButton = page.getByRole('button', { name: 'Reset' });
		await expect.element(responseResetButton).toBeInTheDocument();

		// The user input should be displayed
		await expect.element(page.getByText('Test input')).toBeInTheDocument();

		// Reset button should be present
		await expect.element(responseResetButton).toBeInTheDocument();
	});

	it('should show Reset button in response view', async () => {
		const textarea = page.getByPlaceholder('What are your thoughts?');
		await textarea.fill('Test input');

		const decisionButton = page.getByRole('button', { name: 'Make a Decision' });
		await decisionButton.click();

		const resetButton = page.getByRole('button', { name: 'Reset' });
		await expect.element(resetButton).toBeInTheDocument();
	});

	it('should return to input form when Reset button is clicked', async () => {
		const textarea = page.getByPlaceholder('What are your thoughts?');
		const testText = 'Initial input';
		await textarea.fill(testText);

		const decisionButton = page.getByRole('button', { name: 'Make a Decision' });
		await decisionButton.click();

		const resetButton = page.getByRole('button', { name: 'Reset' });
		await resetButton.click();

		// Should be back to input form
		const newTextarea = page.getByPlaceholder('What are your thoughts?');
		await expect.element(newTextarea).toBeInTheDocument();

		// Textarea should still contain the previous text
		await expect.element(newTextarea).toHaveValue(testText);

		// Response view should be hidden - Reset button should not be visible
		await expect.element(page.getByRole('button', { name: 'Reset' })).not.toBeInTheDocument();

		// Decision buttons should be visible again
		const newDecisionButton = page.getByRole('button', { name: 'Make a Decision' });
		await expect.element(newDecisionButton).toBeInTheDocument();
	});

	it('should remain in input view when textarea is empty', async () => {
		const decisionButton = page.getByRole('button', { name: 'Make a Decision' });
		await decisionButton.click();

		// With empty text, request becomes '' (empty string) which is falsy
		// So {#if !request} should still be true, keeping us in input view
		const decisionButtonAfterClick = page.getByRole('button', { name: 'Make a Decision' });
		await expect.element(decisionButtonAfterClick).toBeInTheDocument();

		// Reset button should NOT be visible since we're still in input view
		const resetButton = page.getByRole('button', { name: 'Reset' });
		await expect.element(resetButton).not.toBeInTheDocument();
	});
	it('should preserve whitespace and line breaks in user input', async () => {
		const testText = 'Line 1\nLine 2\n\nLine 4 with spaces   ';
		const textarea = page.getByPlaceholder('What are your thoughts?');

		await textarea.fill(testText);

		const decisionButton = page.getByRole('button', { name: 'Make a Decision' });
		await decisionButton.click();

		// User's input should preserve formatting
		await expect.element(page.getByText(testText)).toBeInTheDocument();
	});

	it('should transition to response view when "I\'m Valing it" button is clicked', async () => {
		const textarea = page.getByPlaceholder('What are your thoughts?');
		const testText = 'What should I have for lunch?';

		await textarea.fill(testText);

		const valingButton = page.getByRole('button', { name: "I'm Valing it" });
		await valingButton.click();

		// User's input should be displayed in the response view
		await expect.element(page.getByText(testText)).toBeInTheDocument();

		// Input form should be hidden
		const valingButtonAfterSubmit = page.getByRole('button', { name: "I'm Valing it" });
		await expect.element(valingButtonAfterSubmit).not.toBeInTheDocument();

		// Reset button should be visible
		const resetButton = page.getByRole('button', { name: 'Reset' });
		await expect.element(resetButton).toBeInTheDocument();
	});

	it('should display a girlfriend response when "I\'m Valing it" button is clicked', async () => {
		const textarea = page.getByPlaceholder('What are your thoughts?');
		await textarea.fill('Test input for girlfriend response');

		const valingButton = page.getByRole('button', { name: "I'm Valing it" });
		await valingButton.click();

		// The girlfriend response should be displayed immediately
		// Check for any text that looks like a girlfriend response
		const responseElements = page.getByText(
			/love|you|I'm|Let's|happy|smile|beautiful|proud|trust|grateful|cuddle/i
		);
		await expect.element(responseElements.first()).toBeInTheDocument();

		// Reset button should be present
		const resetButton = page.getByRole('button', { name: 'Reset' });
		await expect.element(resetButton).toBeInTheDocument();
	});

	it('should show different response types based on button clicked', async () => {
		// Test decision response
		const textarea1 = page.getByPlaceholder('What are your thoughts?');
		await textarea1.fill('Decision test');

		const decisionButton = page.getByRole('button', { name: 'Make a Decision' });
		await decisionButton.click();

		// Should have decision-style response
		const decisionResponse = page.getByText(
			/Yes|No|do it|reconsider|gamble|Meow|go for it|trust|judgment|sleep on it/i
		);
		await expect.element(decisionResponse.first()).toBeInTheDocument();

		// Reset and test girlfriend response
		const resetButton1 = page.getByRole('button', { name: 'Reset' });
		await resetButton1.click();

		const textarea2 = page.getByPlaceholder('What are your thoughts?');
		await textarea2.fill('Girlfriend test');

		const valingButton = page.getByRole('button', { name: "I'm Valing it" });
		await valingButton.click();

		// Should have girlfriend-style response
		const girlfriendResponse = page.getByText(
			/love|you|I'm|Let's|happy|smile|beautiful|proud|trust|grateful|cuddle/i
		);
		await expect.element(girlfriendResponse.first()).toBeInTheDocument();
	});
});
