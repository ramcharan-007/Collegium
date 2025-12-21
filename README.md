# Collegium - College Discovery Platform

A React + TypeScript + Vite application for discovering colleges, courses, and educational opportunities.

## 🐳 Docker Setup

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your machine
- [Docker Compose](https://docs.docker.com/compose/install/) (optional, for easier management)

### Quick Start with Docker

#### Option 1: Using Docker Compose (Recommended)

```bash
# Build and run the container
docker-compose up -d

# The app will be available at http://localhost:3000
```

To stop the container:

```bash
docker-compose down
```

#### Option 2: Using Docker directly

```bash
# Build the image
docker build -t collegium-app .

# Run the container
docker run -d -p 3000:80 --name collegium collegium-app

# The app will be available at http://localhost:3000
```

To stop and remove the container:

```bash
docker stop collegium
docker rm collegium
```

### Sharing the Docker Image

#### Export the image to a file:

```bash
# Build the image first
docker build -t collegium-app .

# Save the image to a tar file
docker save -o collegium-app.tar collegium-app

# Compress it (optional, reduces file size)
gzip collegium-app.tar
```

#### Load the image on another machine:

```bash
# If compressed
gunzip collegium-app.tar.gz

# Load the image
docker load -i collegium-app.tar

# Run the container
docker run -d -p 3000:80 --name collegium collegium-app

# Open http://localhost:3000 in your browser
```

### Using Docker Hub (Alternative)

```bash
# Tag the image
docker tag collegium-app your-dockerhub-username/collegium-app:latest

# Push to Docker Hub
docker push your-dockerhub-username/collegium-app:latest

# Client can pull and run:
docker pull your-dockerhub-username/collegium-app:latest
docker run -d -p 3000:80 your-dockerhub-username/collegium-app:latest
```

---

## 💻 Local Development Setup

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Available Scripts

| Script            | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

---

## 📁 Project Structure

```
src/
├── Components/
│   ├── Home/           # Home page components
│   │   ├── SelectStudyGoal.tsx
│   │   ├── ExplorePrograms.tsx
│   │   ├── Top10Colleges.tsx
│   │   ├── TopUniversities.tsx
│   │   ├── CollegeRanking.tsx
│   │   ├── TopExams.tsx
│   │   ├── LatestNews.tsx
│   │   ├── StudyAbroad.tsx
│   │   └── HomePage.tsx
│   ├── Auth/           # Authentication components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── LoginPopup.tsx
├── App.tsx
├── AppLayout.tsx       # Main layout with popup timer
└── main.tsx
```

## 🔧 Configuration

- **Port**: The Docker container runs on port 80 internally, mapped to port 3000 externally
- **Login Popup**: Appears after 1 minute (60000ms), configurable in `main.tsx`

## 📝 License

Private - All rights reserved
