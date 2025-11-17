# Enterprise Project Architecture & Planning System

A comprehensive project planning and documentation system with phase-based governance and visual architecture schemas.

## 🚀 Quick Start

### Local Development (with Bun)

Install dependencies:
```bash
bun install
```

Run development server:
```bash
bun run dev
```

The app will be available at http://localhost:5000

### Docker Setup

See [DOCKER.md](DOCKER.md) for complete Docker documentation.

**Development with Docker (hot reload):**
```bash
docker-compose -f docker-compose.dev.yml up --build
```

**Production with Docker:**
```bash
docker-compose up --build
```

## 📦 Build

Create a production build:
```bash
bun run build
```

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **Runtime**: Bun (local) / Node.js (Docker)
- **Styling**: Tailwind CSS (CDN)
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## 📁 Project Structure

```
.
├── src/
│   ├── App.tsx           # Main application component
│   └── index.tsx         # Application entry point
├── public/
│   └── index.html        # HTML template
├── Dockerfile            # Production Docker image
├── Dockerfile.dev        # Development Docker image
├── docker-compose.yml    # Production compose config
├── docker-compose.dev.yml # Development compose config
└── vite.config.ts        # Vite configuration
```

## 🐳 Docker Files

- **Dockerfile** - Multi-stage production build (optimized)
- **Dockerfile.dev** - Development build with hot reload
- **docker-compose.yml** - Production compose configuration
- **docker-compose.dev.yml** - Development compose configuration

For detailed Docker usage, see [DOCKER.md](DOCKER.md).
