<div align="center">
<img width="1200" height="275" alt="PPBanner" src="public/assets/PASTI PINTAR BANNER.jpg" />
</div>

# Pasti Pintar

> Comprehensive EdTech Platform for Indonesian High School Students - UTBK/SNBT Preparation

Pasti Pintar is an educational technology platform designed to help Indonesian high school students excel in their UTBK/SNBT (university entrance exams). Starting as a landing page, this project is evolving into a full-featured learning management system with AI-powered learning assistance, personalized study paths, and comprehensive exam preparation tools.

## Vision & Mission

### Vision
To become Indonesia's leading EdTech platform that empowers every high school student to achieve their dream of entering top universities through accessible, personalized, and effective learning experiences.

### Mission
- Provide comprehensive UTBK/SNBT preparation materials and practice tests
- Leverage AI technology to create personalized learning paths for each student
- Build a supportive learning community where students can collaborate and grow
- Make quality education accessible to students across Indonesia
- Track student progress with data-driven insights and analytics

## Project Status

**Current Phase**: Landing Page (MVP)
- [DONE] Responsive marketing website
- [DONE] Feature showcase and pricing information
- [DONE] Testimonials and social proof
- [DONE] University partnership display

**Next Phase**: Core Platform Development
- [DONE] User authentication and profile management
- [ON-PROGRESS] Learning dashboard
- [ON-PROGRESS] Content management system for study materials
- [ON-PROGRESS] Practice test engine

## Current Features (Landing Page)

- **Responsive Design**: Mobile-first approach optimized for all devices
- **Interactive Components**:
  - Navbar with scroll effects
  - Accordion-style benefits section
  - Animated university logo ticker
  - Collapsible FAQ section
- **Marketing Sections**:
  - Hero section with primary CTA
  - Why choose us (benefits)
  - Jejaring Pintar (community network)
  - Student testimonials
  - Three-tier pricing plans
  - Comprehensive FAQ
- **Modern UI/UX**: Tailwind CSS with custom Indonesian EdTech branding
- **Type-Safe Development**: TypeScript for better code quality
- **Fast Performance**: Vite for instant hot module replacement

## Planned Features (EdTech Platform)

### For Students

#### Learning Management
- **Study Materials Library**: Comprehensive notes, videos, and resources for TPS, TKA Saintek, and TKA Soshum
- **Practice Tests**: Thousands of UTBK-style questions with detailed explanations
- **Progress Tracking**: Visual analytics showing strengths, weaknesses, and improvement areas
- **Personalized Study Plans**: AI-generated study schedules based on target university and current level
- **Timed Mock Exams**: Full-length simulated UTBK tests with real exam conditions

#### AI-Powered Features
- **Adaptive Learning**: Content difficulty adjusts based on student performance
- **Smart Recommendations**: Personalized topic suggestions based on learning patterns
- **Weak Point Analysis**: AI identifies knowledge gaps and suggests targeted practice

#### Community & Collaboration
- **Study Groups**: Virtual study rooms for collaborative learning
- **Discussion Forums**: Ask questions and help peers
- **Leaderboards**: Friendly competition to motivate learning
- **Social Features**: Share achievements and progress with friends

#### Student Dashboard
- **Performance Analytics**: Detailed insights into quiz scores, time management, and topic mastery
- **Study Calendar**: Schedule management with deadline reminders
- **Achievements & Badges**: Gamification to encourage consistent learning
- **Notifications**: Updates on new content, upcoming tests, and personal milestones

### For Educators/Tutors

- **Content Creation Tools**: Upload and manage study materials
- **Student Management**: Monitor student progress and engagement
- **Live Sessions**: Host virtual classes and Q&A sessions
- **Assignment Management**: Create, distribute, and grade assignments

### For Administrators

- **Admin Dashboard**: Platform-wide analytics and user management
- **Content Management**: Organize and curate educational content
- **Subscription Management**: Handle payments and pricing tiers
- **Marketing Tools**: Email campaigns and user engagement tracking
- **Security & Access Control**: Role-based permissions and data protection

## Tech Stack

### Current Stack
- **Frontend Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 6.2.0
- **Styling**: Tailwind CSS (via CDN)
- **Icons**: Lucide React
- **Font**: Plus Jakarta Sans (Google Fonts)

### Planned Stack (Full Platform)

#### Frontend
- **Core**: React 19+ with TypeScript
- **Build Tool**: Vite 6+ for lightning-fast HMR
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand (simple, performant)
- **Server State**: TanStack Query (React Query) for caching & data fetching
- **Routing**: React Router v7
- **Forms**: React Hook Form + Zod for type-safe validation
- **UI Components**: shadcn/ui (customizable, accessible components)
- **Charts**: Recharts for student progress analytics
- **Icons**: Lucide React
- **Notifications**: Sonner for toast messages
- **Date/Time**: date-fns with Indonesian locale
- **HTTP Client**: Axios with interceptors
- **Real-time**: Socket.io client for live features
- **Utilities**: clsx + tailwind-merge for className management

#### Backend (Planned)
- **Language**: Go (Golang) 1.21+ for high-performance, concurrent backend
- **Web Framework**: Gin (fast, lightweight HTTP framework)
- **Database**: PostgreSQL 15+ for relational data
- **ORM**: GORM for Go-idiomatic database operations
- **Caching**: Redis 7+ for session management and data caching
- **Authentication**: JWT with golang-jwt/jwt library
- **File Storage**: AWS S3 for user uploads and study materials
- **WebSocket**: gorilla/websocket or go-socket.io for real-time features
- **API Documentation**: Swagger/OpenAPI with swaggo/swag
- **Validation**: go-playground/validator for request validation
- **Environment**: godotenv for environment variable management
- **Migration**: golang-migrate for database schema versioning
- **Logging**: logrus or zap for structured logging
- **Testing**: testify for assertions, gomock for mocking

#### AI & ML
- Custom ML models for adaptive learning (TensorFlow.js)
- Natural Language Processing for question analysis
- Recommendation engine for personalized content

#### DevOps & Infrastructure
- Docker for containerization
- GitHub Actions for CI/CD
- AWS/Google Cloud Platform for hosting
- CDN for static assets
- Monitoring: Sentry, LogRocket
- Analytics: Google Analytics, Mixpanel

## Project Structure

```
pasti-pintar/
├── src/
│   ├── components/          # React components
│   │   ├── Navbar.tsx       # Fixed navigation with mobile menu
│   │   ├── Hero.tsx         # Hero section with primary CTA
│   │   ├── CTASection.tsx   # University acceptance section
│   │   ├── WhyUs.tsx        # Accordion-style benefits
│   │   ├── JejaringPintar.tsx  # Network/community section
│   │   ├── LogoTicker.tsx   # Animated university logos
│   │   ├── Testimonials.tsx # Student testimonials grid
│   │   ├── Pricing.tsx      # Three-tier pricing cards
│   │   ├── FAQ.tsx          # Collapsible Q&A
│   │   └── Footer.tsx       # Site footer with links
│   ├── App.tsx              # Main app component
│   ├── index.tsx            # React root entry point
│   └── constants.ts         # Static content and configuration
├── index.html               # HTML template with Tailwind config
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Project dependencies
├── .env.local               # Environment variables (not in git)
└── README.md                # This file
```

### Future Structure (Platform)

```
pasti-pintar/
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── features/        # Feature-based modules
│   │   │   ├── auth/        # Authentication
│   │   │   ├── dashboard/   # Student dashboard
│   │   │   ├── courses/     # Course materials
│   │   │   ├── tests/       # Practice tests & exams
│   │   │   ├── ai-tutor/    # AI assistant
│   │   │   └── analytics/   # Performance tracking
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utility functions
│   │   ├── services/        # API services
│   │   ├── store/           # State management
│   │   └── types/           # TypeScript types
├── backend/                 # Go backend API
│   ├── cmd/
│   │   └── api/             # Main application entry point
│   ├── internal/
│   │   ├── handlers/        # HTTP request handlers
│   │   ├── models/          # Database models/entities
│   │   ├── repository/      # Database access layer
│   │   ├── services/        # Business logic
│   │   ├── middleware/      # HTTP middleware (auth, logging, etc.)
│   │   ├── dto/             # Data Transfer Objects
│   │   └── utils/           # Helper functions
│   ├── pkg/                 # Public packages
│   │   ├── config/          # Configuration management
│   │   ├── database/        # Database connection
│   │   ├── jwt/             # JWT utilities
│   │   └── validator/       # Input validation
│   ├── migrations/          # Database migrations
│   ├── docs/                # Swagger API documentation
│   ├── go.mod               # Go module dependencies
│   └── go.sum               # Dependency checksums
├── shared/                  # Shared code between frontend/backend
│   └── types/               # API contracts and shared types
├── docs/                    # Documentation
└── scripts/                 # Deployment and utility scripts
```

## Getting Started

### Prerequisites

**Frontend (Current):**
- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm package manager
- Git for version control

**Backend (Future):**
- Go 1.21 or higher
- PostgreSQL 14+ or 15+
- Redis 7+ (for caching)
- Docker (optional, for containerization)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd pasti-pintar
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   ```
   http://localhost:3000
   ```

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production (optimized bundle)
npm run build

# Preview production build locally
npm run preview

# Run TypeScript type checking
npm run type-check

# Lint code (if configured)
npm run lint
```

## Development Roadmap

### Phase 1: Foundation (Current - November 2025)
- [DONE] Landing page design and development
- [DONE] Brand identity and design system
- [DONE] Marketing content and messaging
- [DONE] User research and feedback collection
- [DONE] Technical architecture planning

### Phase 2: MVP Platform (January 2025)
- [DONE] User authentication (email, Google OAuth)
- [ON PROGRESS] Student dashboard with basic profile
- [ON PROGRESS] Study materials library (static content)
- [ON PROGRESS] Basic practice quiz engine
- [ON PROGRESS] Payment integration (doku)

### Phase 3: Core Features (January 2025)
- Full mock exam system with timer
- Progress tracking and analytics
- Study plan generator
- Mobile responsive refinement

### Phase 4: Community & Engagement (January 2026)
- Discussion forums
- Study groups and peer collaboration
- Leaderboards and gamification
- Push notifications
- Mobile app (React Native)

### Phase 5: Advanced Features (Feb 2026+)
- Live online classes
- Video content library
- Adaptive learning algorithms
- Advanced analytics and insights
- Educator portal
- Partnerships with schools and tutors

## Design System

### Color Palette

```css
/* Brand Colors */
--primary: #008fd7      /* Blue - Trust, Intelligence */
--accent: #f7b400       /* Orange/Yellow - Energy, Optimism */
--secondary: #2f318a    /* Violet - Creativity, Ambition */
--semantic-red: #a80022 /* Red - Important Actions */

/* Neutral Colors */
--background: #fcfcfc   /* Page Background */
--text: #4e4e4e         /* Body Text */
```

### Typography

**Primary Font**: Plus Jakarta Sans
- Designed for Indonesian readability
- Variable font weights: 400 (Regular), 500 (Medium), 700 (Bold), 800 (Extra Bold)
- Optimized for both Latin and Bahasa Indonesia

### Design Principles

1. **Accessibility First**: WCAG 2.1 AA compliance
2. **Mobile-First**: Optimized for smartphone users (primary device in Indonesia)
3. **Performance**: Fast loading times even on slow connections
4. **Clarity**: Clean, uncluttered interfaces that focus on learning
5. **Cultural Relevance**: Design language that resonates with Indonesian students

## Environment Variables

### Frontend (.env.local)

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GEMINI_API_KEY` | Google Gemini API key for AI features | Yes | - |
| `VITE_API_URL` | Backend API URL | No | `http://localhost:8080` |
| `VITE_APP_ENV` | Environment (dev/staging/prod) | No | `development` |

### Backend (.env)

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | `8080` |
| `ENV` | Environment (development/staging/production) | No | `development` |
| `DATABASE_URL` | PostgreSQL connection string | Yes | - |
| `REDIS_URL` | Redis connection string | Yes | - |
| `JWT_SECRET` | Secret key for JWT tokens | Yes | - |
| `JWT_EXPIRATION` | JWT token expiration time | No | `24h` |
| `ALLOWED_ORIGINS` | CORS allowed origins | No | `http://localhost:3000` |

**Example Backend .env file:**
```env
PORT=8080
ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/pasti_pintar?sslmode=disable
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

## API Integration (Planned)

### Go Backend Best Practices

The backend will follow these Go best practices:

1. **Project Layout**: Follow the [Standard Go Project Layout](https://github.com/golang-standards/project-layout)
   - `cmd/` for application entry points
   - `internal/` for private application code
   - `pkg/` for public reusable packages
   - `migrations/` for database migrations

2. **Error Handling**: Proper error wrapping and context
   ```go
   if err != nil {
       return fmt.Errorf("failed to create user: %w", err)
   }
   ```

3. **Context Usage**: Pass context for cancellation and timeouts
   ```go
   func (s *Service) GetData(ctx context.Context) error {
       ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
       defer cancel()
       // ... operation
   }
   ```

4. **Dependency Injection**: Constructor pattern for testability
   ```go
   func NewUserService(repo repository.UserRepository, logger *log.Logger) *UserService {
       return &UserService{repo: repo, logger: logger}
   }
   ```

5. **Interface Design**: Small, focused interfaces
   ```go
   type Reader interface {
       Read(ctx context.Context, id uint) (*Model, error)
   }
   ```

### Key Go Packages

**Web Framework:**
```bash
go get -u github.com/gin-gonic/gin
# or
go get -u github.com/labstack/echo/v4
```

**Database (GORM):**
```bash
go get -u gorm.io/gorm
go get -u gorm.io/driver/postgres
```

**Redis:**
```bash
go get -u github.com/redis/go-redis/v9
```

**JWT Authentication:**
```bash
go get -u github.com/golang-jwt/jwt/v5
```

**Environment Variables:**
```bash
go get -u github.com/joho/godotenv
```

**Validation:**
```bash
go get -u github.com/go-playground/validator/v10
```

**API Documentation:**
```bash
go get -u github.com/swaggo/swag/cmd/swag
go get -u github.com/swaggo/gin-swagger
```

### Sample Go Backend Commands

```bash
# Initialize Go module
go mod init github.com/yourusername/pasti-pintar-backend

# Run the application
go run cmd/api/main.go

# Build for production
go build -o bin/api cmd/api/main.go

# Run with hot reload (using air)
go install github.com/cosmtrek/air@latest
air

# Run tests
go test ./...

# Run tests with coverage
go test -v -cover ./...

# Generate Swagger documentation
swag init -g cmd/api/main.go

# Run database migrations
migrate -path migrations -database "postgresql://localhost/pasti_pintar" up

# Format code
go fmt ./...

# Lint code (using golangci-lint)
golangci-lint run
```

### Docker Setup (Backend)

**Dockerfile for Go Backend:**
```dockerfile
# Build stage
FROM golang:1.21-alpine AS builder

WORKDIR /app

# Install dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/bin/api ./cmd/api

# Runtime stage
FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copy binary from builder
COPY --from=builder /app/bin/api .

# Copy migrations (if needed)
COPY --from=builder /app/migrations ./migrations

EXPOSE 8080

CMD ["./api"]
```

**docker-compose.yml for Development:**
```yaml
version: '3.8'

services:
  # Go Backend API
  api:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - ENV=development
      - PORT=8080
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/pasti_pintar?sslmode=disable
      - REDIS_URL=redis://redis:6379
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - postgres
      - redis
    volumes:
      - ./backend:/app
    networks:
      - pasti-pintar-network

  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=pasti_pintar
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - pasti-pintar-network

  # Redis Cache
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    networks:
      - pasti-pintar-network

  # React Frontend (Development)
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=http://localhost:8080
    volumes:
      - ./frontend:/app
      - /app/node_modules
    networks:
      - pasti-pintar-network

volumes:
  postgres-data:
  redis-data:

networks:
  pasti-pintar-network:
    driver: bridge
```

**Running with Docker:**
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop all services
docker-compose down

# Rebuild after code changes
docker-compose up -d --build

# Run database migrations
docker-compose exec api ./api migrate up
```

## Target Audience

### Primary Users
- **High School Students** (Grade 10-12)
  - Age: 15-18 years old
  - Preparing for UTBK/SNBT
  - Tech-savvy, mobile-first generation
  - Motivated to enter top Indonesian universities (UI, ITB, UGM, etc.)

### Secondary Users
- **Parents**: Monitoring student progress and supporting learning
- **Teachers/Tutors**: Supplementing classroom instruction
- **Schools**: Institutional subscriptions for exam preparation

## Contributing

We welcome contributions from developers, educators, and EdTech enthusiasts! Here's how you can help:

### For Developers
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the code style guidelines (TypeScript, ESLint rules)
4. Write tests for new features
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request with detailed description

### For Educators
- Provide feedback on content accuracy and pedagogical approach
- Suggest practice questions and study materials
- Share insights on student learning patterns
- Test the platform and report usability issues

### For Designers
- Improve UI/UX designs
- Create marketing materials and graphics
- Enhance accessibility features
- Design mobile app interfaces

## Testing Strategy (Planned)

### Frontend Testing
- **Unit Tests**: Jest + React Testing Library for component testing
- **Integration Tests**: Testing React components with API mocking
- **E2E Tests**: Playwright for critical user journeys
- **Performance Tests**: Lighthouse CI for speed metrics

### Backend Testing (Go)
- **Unit Tests**: Go's built-in testing package with table-driven tests
  ```go
  func TestUserService_Create(t *testing.T) {
      tests := []struct {
          name    string
          input   *dto.CreateUserRequest
          wantErr bool
      }{
          // test cases
      }
      // run tests
  }
  ```
- **Integration Tests**: Testing database operations with testcontainers
  ```go
  // Use testify for assertions
  import "github.com/stretchr/testify/assert"
  ```
- **API Tests**: HTTP testing with httptest package
  ```go
  func TestHandler_CreateUser(t *testing.T) {
      req := httptest.NewRequest("POST", "/users", body)
      w := httptest.NewRecorder()
      handler.CreateUser(w, req)
      assert.Equal(t, 201, w.Code)
  }
  ```
- **Mocking**: Use mockery or gomock for interface mocks
- **Test Coverage**: Maintain >80% code coverage
  ```bash
  go test -coverprofile=coverage.out ./...
  go tool cover -html=coverage.out
  ```

### Other Testing
- **Load Testing**: k6 or Apache JMeter for API performance
- **Security Testing**: OWASP ZAP for vulnerability scanning
- **User Testing**: Beta testing with real students
- **A/B Testing**: Optimize conversion and engagement

### Testing Best Practices
- Write tests before or alongside code (TDD approach)
- Use table-driven tests in Go for comprehensive coverage
- Mock external dependencies (database, APIs, services)
- Test error cases and edge conditions
- Run tests in CI/CD pipeline (GitHub Actions)
- Maintain test data fixtures for consistent testing

## Security Considerations

- **Authentication**: Secure JWT-based authentication
- **Data Protection**: Encryption at rest and in transit
- **Privacy**: GDPR-like compliance for Indonesian users
- **Input Validation**: Prevent XSS and SQL injection
- **Audit Logs**: Track sensitive operations
- **Payment Security**: PCI DSS compliance for transactions

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance Targets

### Frontend
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Lighthouse Score**: > 90
- **Bundle Size**: < 200KB (gzipped)

### Backend (Go API)
- **API Response Time**: < 100ms (p95)
- **Database Query Time**: < 50ms (p95)
- **Throughput**: > 1000 requests/second
- **Memory Usage**: < 512MB under normal load
- **CPU Usage**: < 50% under normal load
- **Uptime**: > 99.9% availability

## License

This project is proprietary and confidential. All rights reserved.

## Support & Contact

- **Website**: [Coming Soon]
- **Email**: [Coming Soon]
- **Instagram**: [Coming Soon]
## Acknowledgments

- Indonesian high school students and teachers for their invaluable feedback
- Open source community for amazing tools and libraries
- Go community for excellent backend development tools
- React and Vite teams for modern frontend development
- All contributors who help make education accessible

---

<div align="center">

**for Indonesian students dreaming of top universities**

*Pasti Pintar - Pasti Bisa Masuk PTN Impian!*

</div>
