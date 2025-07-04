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
		const legend = page.getByText('Share your thoughts');
		await expect.element(legend).toBeInTheDocument();

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

		// Response view should be visible
		const responseHeading = page.getByText('Your thoughts');
		await expect.element(responseHeading).toBeInTheDocument();

		// User's input should be displayed
		await expect.element(page.getByText(testText)).toBeInTheDocument();

		// Input form should be hidden (check by looking for response elements instead)
		const saveButtonAfterSubmit = page.getByRole('button', { name: 'Save' });
		await expect.element(saveButtonAfterSubmit).not.toBeInTheDocument();
	});

	it('should show loading state while generating response', async () => {
		const textarea = page.getByPlaceholder('What are your thoughts?');
		await textarea.fill('Test input');

		const saveButton = page.getByRole('button', { name: 'Save' });
		await saveButton.click();

		// Should show loading message
		const loadingMessage = page.getByText('Loading...');
		await expect.element(loadingMessage).toBeInTheDocument();
	});

	it('should display a response after loading completes', async () => {
		const textarea = page.getByPlaceholder('What are your thoughts?');
		await textarea.fill('Test input');

		const saveButton = page.getByRole('button', { name: 'Save' });
		await saveButton.click();

		// Wait for response to load by checking that loading disappears
		await expect.element(page.getByText('Loading...')).not.toBeInTheDocument();

		// Check that we're in the response view
		const responseHeading = page.getByText('Your thoughts');
		await expect.element(responseHeading).toBeInTheDocument();
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
		const inputLegend = page.getByText('Share your thoughts');
		await expect.element(inputLegend).toBeInTheDocument();

		const newTextarea = page.getByPlaceholder('What are your thoughts?');
		await expect.element(newTextarea).toBeInTheDocument();

		// Textarea should still contain the previous text
		await expect.element(newTextarea).toHaveValue(testText);

		// Response view should be hidden - check that Reset button is gone
		await expect.element(page.getByRole('button', { name: 'Reset' })).not.toBeInTheDocument();
	});

	it('should not submit when textarea is empty', async () => {
		const saveButton = page.getByRole('button', { name: 'Save' });
		await saveButton.click();

		// Should not transition to response view with empty input
		const inputLegend = page.getByText('Share your thoughts');
		await expect.element(inputLegend).toBeInTheDocument();
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
