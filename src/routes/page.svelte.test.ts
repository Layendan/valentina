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

		const saveButton = page.getByRole('button', { name: 'Save' });
		await expect.element(saveButton).toBeInTheDocument();
	});

	it('should allow typing in the textarea', async () => {
		const textarea = page.getByPlaceholder('What are your thoughts?');
		const testText = 'I need help deciding what to have for dinner';

		await textarea.fill(testText);
		await expect.element(textarea).toHaveValue(testText);
	});
	it('should transition to response view when Save button is clicked', async () => {
		const textarea = page.getByPlaceholder('What are your thoughts?');
		const testText = 'Should I go to the gym today?';

		await textarea.fill(testText);

		const saveButton = page.getByRole('button', { name: 'Save' });
		await saveButton.click();

		// User's input should be displayed in the response view
		await expect.element(page.getByText(testText)).toBeInTheDocument();

		// Input form should be hidden (Save button should not be visible)
		const saveButtonAfterSubmit = page.getByRole('button', { name: 'Save' });
		await expect.element(saveButtonAfterSubmit).not.toBeInTheDocument();

		// Reset button should be visible
		const resetButton = page.getByRole('button', { name: 'Reset' });
		await expect.element(resetButton).toBeInTheDocument();
	});

	it('should display a response immediately after clicking Save', async () => {
		const textarea = page.getByPlaceholder('What are your thoughts?');
		await textarea.fill('Test input');

		const saveButton = page.getByRole('button', { name: 'Save' });
		await saveButton.click();

		// The response should be displayed immediately (no loading state)
		// Check for any text that looks like a girlfriend response
		const responseElements = page.getByText(/love|you|I'm|Let's/i);
		await expect.element(responseElements.first()).toBeInTheDocument();

		// Reset button should be present
		const resetButton = page.getByRole('button', { name: 'Reset' });
		await expect.element(resetButton).toBeInTheDocument();
	});

	it('should show Reset button in response view', async () => {
		const textarea = page.getByPlaceholder('What are your thoughts?');
		await textarea.fill('Test input');

		const saveButton = page.getByRole('button', { name: 'Save' });
		await saveButton.click();

		const resetButton = page.getByRole('button', { name: 'Reset' });
		await expect.element(resetButton).toBeInTheDocument();
	});

	it('should return to input form when Reset button is clicked', async () => {
		const textarea = page.getByPlaceholder('What are your thoughts?');
		const testText = 'Initial input';
		await textarea.fill(testText);

		const saveButton = page.getByRole('button', { name: 'Save' });
		await saveButton.click();

		const resetButton = page.getByRole('button', { name: 'Reset' });
		await resetButton.click();

		// Should be back to input form
		const newTextarea = page.getByPlaceholder('What are your thoughts?');
		await expect.element(newTextarea).toBeInTheDocument();

		// Textarea should still contain the previous text
		await expect.element(newTextarea).toHaveValue(testText);

		// Response view should be hidden - Reset button should not be visible
		await expect.element(page.getByRole('button', { name: 'Reset' })).not.toBeInTheDocument();

		// Save button should be visible again
		const newSaveButton = page.getByRole('button', { name: 'Save' });
		await expect.element(newSaveButton).toBeInTheDocument();
	});

	it('should remain in input view when textarea is empty', async () => {
		const saveButton = page.getByRole('button', { name: 'Save' });
		await saveButton.click();

		// With empty text, request becomes '' (empty string) which is falsy
		// So {#if !request} should still be true, keeping us in input view
		const saveButtonAfterClick = page.getByRole('button', { name: 'Save' });
		await expect.element(saveButtonAfterClick).toBeInTheDocument();

		// Reset button should NOT be visible since we're still in input view
		const resetButton = page.getByRole('button', { name: 'Reset' });
		await expect.element(resetButton).not.toBeInTheDocument();
	});
	it('should preserve whitespace and line breaks in user input', async () => {
		const testText = 'Line 1\nLine 2\n\nLine 4 with spaces   ';
		const textarea = page.getByPlaceholder('What are your thoughts?');

		await textarea.fill(testText);

		const saveButton = page.getByRole('button', { name: 'Save' });
		await saveButton.click();

		// User's input should preserve formatting
		await expect.element(page.getByText(testText)).toBeInTheDocument();
	});
});
