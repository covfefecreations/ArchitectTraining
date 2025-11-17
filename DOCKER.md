# Docker Setup Guide

This project includes Docker configuration for both development and production environments.

## Files Overview

- `Dockerfile` - Production build (optimized, multi-stage)
- `Dockerfile.dev` - Development build (with hot reload)
- `docker-compose.yml` - Production compose configuration
- `docker-compose.dev.yml` - Development compose configuration
- `.dockerignore` - Files to exclude from Docker builds

## Quick Start

### Development Mode (with hot reload)

```bash
docker-compose -f docker-compose.dev.yml up --build
```

This will:
- Build the development Docker image
- Start the dev server with hot module replacement
- Mount your local code into the container
- Expose the app on http://localhost:5000

### Production Mode

```bash
docker-compose up --build
```

This will:
- Build the optimized production image
- Serve the static build files
- Expose the app on http://localhost:5000

## Detailed Commands

### Build the Docker image

**Development:**
```bash
docker build -f Dockerfile.dev -t project-tracker-dev .
```

**Production:**
```bash
docker build -t project-tracker-prod .
```

### Run the container manually

**Development:**
```bash
docker run -p 5000:5000 -v $(pwd):/app -v /app/node_modules project-tracker-dev
```

**Production:**
```bash
docker run -p 5000:5000 project-tracker-prod
```

### Stop containers

```bash
docker-compose down
```

or for development:

```bash
docker-compose -f docker-compose.dev.yml down
```

### View logs

```bash
docker-compose logs -f
```

### Rebuild without cache

```bash
docker-compose build --no-cache
docker-compose up
```

## Architecture

### Production Dockerfile (Multi-stage build)

1. **Builder stage**: Installs dependencies and builds the app
2. **Runner stage**: Serves the static files with minimal footprint

Benefits:
- Smaller final image size
- Faster deployments
- More secure (fewer dependencies in production)

### Development Dockerfile

- Single-stage build
- Includes full dev dependencies
- Volume mounting for hot reload
- Ideal for local development

## Troubleshooting

### Port already in use
If port 5000 is busy, change the port mapping in docker-compose.yml:
```yaml
ports:
  - "3000:5000"  # Host:Container
```

### Changes not reflecting
For development mode, ensure volumes are mounted correctly in docker-compose.dev.yml.

### Build failures
Clear Docker cache:
```bash
docker system prune -a
```

## Environment Variables

To add environment variables, create a `.env` file in the root directory:

```env
NODE_ENV=production
VITE_API_URL=https://api.example.com
```

Then reference it in docker-compose.yml:

```yaml
services:
  app:
    env_file:
      - .env
```
