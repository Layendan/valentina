# Valentina Decision Maker 💕

## [https://valentina.layendan.dev/](https://valentina.layendan.dev/)

A heartfelt decision-making tool built with love for Valentina. This SvelteKit application provides thoughtful, supportive responses to help with decision-making and daily thoughts.

## ✨ Features

- **Interactive Decision Making**: Share your thoughts and receive supportive responses
- **Beautiful UI**: Built with Tailwind CSS and DaisyUI for a modern, elegant experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Typography**: Enhanced with Tailwind Typography for beautiful content presentation
- **Custom Font**: Features the distinctive Silkscreen font for a unique aesthetic
- **Dockerized**: Ready for deployment with Docker and nginx

## 🛠️ Tech Stack

- **Frontend**: SvelteKit 2.16+ with TypeScript
- **Styling**: Tailwind CSS 4.1+ with DaisyUI components
- **Testing**: Vitest with browser testing support
- **Linting**: ESLint with Prettier formatting
- **Deployment**: Docker with nginx reverse proxy
- **Package Manager**: pnpm (recommended)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Layendan/valentina.git
cd valentina
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev

# or open automatically in browser
pnpm dev -- --open
```

The application will be available at `http://localhost:3000`

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Create production build
- `pnpm preview` - Preview production build locally
- `pnpm test` - Run unit tests
- `pnpm test:unit` - Run unit tests in watch mode
- `pnpm lint` - Run linting checks
- `pnpm format` - Format code with Prettier
- `pnpm check` - Type check with svelte-check

## 🐳 Docker Deployment

The project includes Docker configuration for easy deployment:

```bash
# Build and run with docker-compose
docker-compose up --build

# Run in detached mode
docker-compose up -d
```

The application will be served through nginx on the configured port.

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:unit
```

Tests are configured to run in the browser environment using Playwright.

## 🎨 Design System

The project uses:

- **DaisyUI**: For component styling and themes
- **Tailwind Typography**: For beautiful prose styling
- **Silkscreen Font**: For unique character and personality
- **Responsive Design**: Mobile-first approach

## 🔧 Configuration

The project is configured with:

- **SvelteKit**: Full-stack framework with Node.js adapter
- **TypeScript**: For type safety
- **Tailwind CSS**: Utility-first CSS framework
- **ESLint + Prettier**: Code quality and formatting
- **Vitest**: Fast unit testing

## 🤝 Contributing

This is a personal project, but suggestions and improvements are welcome!

## 📄 License

This project is private and created with love for Valentina.
