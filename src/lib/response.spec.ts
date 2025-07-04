import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createResponse, girlfriendResponses } from './response';

describe('createResponse', () => {
	beforeEach(() => {
		// Reset any mocks before each test
		vi.clearAllMocks();
	});

	it('should return a defined response', () => {
		const response = createResponse();
		expect(response).toBeDefined();
		expect(typeof response).toBe('string');
		expect(response.length).toBeGreaterThan(0);
	});

	it('should return a string from the girlfriend responses array', () => {
		const response = createResponse();

		// Check that the response is one of the expected girlfriend responses
		expect(girlfriendResponses).toContain(response);
	});

	it('should return responses immediately without delay', () => {
		const startTime = Date.now();
		createResponse();
		const endTime = Date.now();
		const duration = endTime - startTime;

		// Should execute immediately (within a few milliseconds)
		expect(duration).toBeLessThan(50);
	});

	it('should return different responses on multiple calls (randomness test)', () => {
		const responses = new Set();
		const numberOfCalls = 10;

		// Call the function multiple times to test randomness
		for (let i = 0; i < numberOfCalls; i++) {
			responses.add(createResponse());
		}

		// With 92 possible responses, we should get at least some variety in 10 calls
		expect(responses.size).toBeGreaterThan(1);
	});

	it('should return a string directly, not a Promise', () => {
		const result = createResponse();
		expect(typeof result).toBe('string');
		expect(result).not.toBeInstanceOf(Promise);
	});

	it('should handle multiple concurrent calls', () => {
		const responses = [createResponse(), createResponse(), createResponse()];

		// All responses should be valid
		responses.forEach((response) => {
			expect(response).toBeDefined();
			expect(typeof response).toBe('string');
			expect(response.length).toBeGreaterThan(0);
		});
	});

	it('should work with mocked Math.random for deterministic testing', () => {
		// Mock Math.random to return a specific value
		vi.spyOn(Math, 'random').mockReturnValue(0.5);

		const response = createResponse();
		const expectedIndex = Math.floor(0.5 * girlfriendResponses.length);
		const expectedResponse = girlfriendResponses[expectedIndex];

		expect(response).toBe(expectedResponse);

		vi.restoreAllMocks();
	});

	it('should not return undefined or empty string', () => {
		const response = createResponse();

		expect(response).not.toBeUndefined();
		expect(response).not.toBeNull();
		expect(response).not.toBe('');
		expect(response.trim()).not.toBe('');
	});

	it('should always return a valid response from the array', () => {
		// Test multiple times to ensure consistency
		for (let i = 0; i < 50; i++) {
			const response = createResponse();
			expect(girlfriendResponses).toContain(response);
		}
	});
});
