<div
	class="sparkle absolute -z-10 bg-cover bg-no-repeat"
	{@attach (context) => {
		const size = Math.random() * 32 + 16;
		context.style.setProperty('width', `${size}px`);
		context.style.setProperty('height', `${size}px`);
		context.style.setProperty('top', `${Math.max(0, Math.random() * window.innerHeight - size)}px`);
		context.style.setProperty('left', `${Math.max(0, Math.random() * window.innerWidth - size)}px`);
		context.style.setProperty('transform', `rotate(${Math.random() * 360}deg)`);
		context.style.setProperty('animation-delay', `${Math.random() * 500}ms`);
		context.style.setProperty('filter', `hue-rotate(${Math.random() * 360}deg)`);
	}}
></div>

<style lang="postcss">
	.sparkle {
		animation: sparkleAnim 1s steps(2) infinite;
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCA1LjEuOBtp6qgAAAC2ZVhJZklJKgAIAAAABQAaAQUAAQAAAEoAAAAbAQUAAQAAAFIAAAAoAQMAAQAAAAIAAAAxAQIAEAAAAFoAAABphwQAAQAAAGoAAAAAAAAA8nYBAOgDAADydgEA6AMAAFBhaW50Lk5FVCA1LjEuOAADAACQBwAEAAAAMDIzMAGgAwABAAAAAQAAAAWgBAABAAAAlAAAAAAAAAACAAEAAgAEAAAAUjk4AAIABwAEAAAAMDEwMAAAAADMbhZ8SlPoHAAAA5pJREFUeF7tmE2LHUUUhp/qO8nKuBB7oQaJEFQQP4iii0JFYnARRAMKQQQDrsQfo0jAwIyKH5Bd1uYH9NqtO1E0ISkXGcfJzKRnbrk5BWfOVM/0TN97585YDxz69rmnu7reqjr1AYVCoVAoFAqFQqFQ+P/hrGMoMfgzwKPAWFypjF9d3ayq0LlgGgK8D5wDWuV2wLeubv5Uvrmgso4JsCWVtxZt4DwwDQGOFEUA65gALfDAdP90P3ccOAnG4J8CnpUxn2iBD4FXMhVeAn4HFuTeSUzj6mbDxM6MIQJ44B1T0Rb4CHhe+RKLwG9GgDXgmqubFRM7M4YMgXEm0yfLYWNaYPOwZ4chAhwLZinAobZ0F0ME2OqwroqOM7Fbasl8KOyZBGPwp4E3M9n+LeCiGfNj4DHgYeVL/AGsqzIdcB+4CiyrxqiAe8DPrm6mLk4fAZ4BLhsBHgBvAxeU7yC0wBcZAe4Ai7MQoM8QiJKtczYU+75NNTRmQh8BjjV9BXAdNhT7vkm+uxd7FhSDPwt8kMkB54F3MwufUYewdtFTAavAl8A/JgfcBb7XOSAGfwF4xBy0bAA3Xd2sp7j90keAk8BDxt0Cb0gS1AJsiijPKV/iJ+AvEQgpe02WyFoAgC1XN8vpJgbvgE+BJ1RDOJlFrg05adpTgC5i8K/KTKAFaIGPgZeVL3FV9gJJgEoEWHJ1c9/EbkMEuAI8nhFgaYgAua7al1GHdYlaiaW49HvINwzmUAvvi6ubKPlDW6Jr5dmLIQI41arWctiYZNt6TAy+isGPlFUxeNvLtlkM3tln9Dt3o6u77kkM/hzweiYHXAZek5kCVcbXciAyUv4N4LoewzH488DTmYXWZ8CTyl8B/wJfAStK+Ar4G7ghPWdXhgiQWkCzCVwCXjLCOOAH2Q/YZ1r9oTH4S8ALqqJRnv9c9hmadVlKWwFuA99MVYAuYvAXRQDbgj+6urllfDuIwb8nJ0o5AU6b8NWMACMR4Ls+AvQeK/tAj+1kO8b6vDANAYayn+Rq/98tNkvvwH1QmSy9INe+PWBdVobJVuS6LF1e+++ZmGS9F0Z9P6o3clp8NrOlvenqJhjfDmLwJ0yiTDngSsdSeFFmA92YY1c3aRbalYkLMC1i8J90CeDqZs2E92YaQ2DiyF6gMolVJ9gDM+jh48BREmABOKHspFwHcZRywIvAKXMg0gK/uLqxhzKFQqFQKBQKhUKhUCgUuvkPgwA46ij2NYYAAAAASUVORK5CYII=');
	}

	@keyframes sparkleAnim {
		0% {
			scale: 1;
		}
		50% {
			scale: 1.1;
		}
		100% {
			scale: 1;
		}
	}
</style>
