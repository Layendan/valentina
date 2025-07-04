import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createResponse, girlfriendResponses } from './response';

describe('createResponse', () => {
	beforeEach(() => {
		// Reset any mocks before each test
		vi.clearAllMocks();
	});

	it('should return a defined response', async () => {
		const response = await createResponse();
		expect(response).toBeDefined();
		expect(typeof response).toBe('string');
		expect(response.length).toBeGreaterThan(0);
	});

	it('should return a string from the girlfriend responses array', async () => {
		const response = await createResponse();

		// Check that the response is one of the expected girlfriend responses
		expect(girlfriendResponses).toContain(response);
	});

	it('should have a delay between 1 and 2 seconds', async () => {
		const startTime = Date.now();
		await createResponse();
		const endTime = Date.now();
		const duration = endTime - startTime;

		// Should take at least 1 second (1000ms) and at most 2 seconds (2000ms)
		expect(duration).toBeGreaterThanOrEqual(1000);
		expect(duration).toBeLessThan(2100); // Adding small buffer for execution time
	});

	it('should return different responses on multiple calls (randomness test)', async () => {
		const responses = new Set();
		const numberOfCalls = 5; // Reduced from 10 to make test faster

		// Call the function multiple times to test randomness
		const promises = [];
		for (let i = 0; i < numberOfCalls; i++) {
			promises.push(createResponse());
		}

		const results = await Promise.all(promises);
		results.forEach((response) => responses.add(response));

		// With 92 possible responses, we should get at least some variety in 5 calls
		// This test might occasionally fail due to randomness, but it's very unlikely
		expect(responses.size).toBeGreaterThan(1);
	}, 15000); // 15 second timeout

	it('should return a Promise', () => {
		const result = createResponse();
		expect(result).toBeInstanceOf(Promise);
	});

	it('should handle multiple concurrent calls', async () => {
		const promises = [createResponse(), createResponse(), createResponse()];

		const responses = await Promise.all(promises);

		// All responses should be valid
		responses.forEach((response) => {
			expect(response).toBeDefined();
			expect(typeof response).toBe('string');
			expect(response.length).toBeGreaterThan(0);
		});
	});

	it('should work with mocked setTimeout for faster testing', async () => {
		// Mock setTimeout to make the test run instantly
		vi.useFakeTimers();

		const responsePromise = createResponse();

		// Fast-forward time by 2 seconds
		vi.advanceTimersByTime(2000);

		const response = await responsePromise;

		expect(response).toBeDefined();
		expect(typeof response).toBe('string');

		vi.useRealTimers();
	});

	it('should not return undefined or empty string', async () => {
		const response = await createResponse();

		expect(response).not.toBeUndefined();
		expect(response).not.toBeNull();
		expect(response).not.toBe('');
		expect(response.trim()).not.toBe('');
	});

	it('should simulate realistic response time variance', async () => {
		const numberOfTests = 3; // Reduced from 5 to make test faster
		const promises = [];

		// Start all promises at the same time to run concurrently
		for (let i = 0; i < numberOfTests; i++) {
			const startTime = Date.now();
			const promise = createResponse().then(() => Date.now() - startTime);
			promises.push(promise);
		}

		const times = await Promise.all(promises);

		// Check that we have some variance in response times
		const minTime = Math.min(...times);
		const maxTime = Math.max(...times);

		expect(maxTime - minTime).toBeGreaterThan(0);

		// All times should be within expected range
		times.forEach((time) => {
			expect(time).toBeGreaterThanOrEqual(1000);
			expect(time).toBeLessThan(2100);
		});
	}, 10000); // 10 second timeout
});
