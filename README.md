# ExceliDraw Clone

[![Watch the video](https://img.youtube.com/vi/R-WT-hMO49o/0.jpg)](https://youtu.be/R-WT-hMO49o)

A real-time collaborative drawing application built with modern web technologies, inspired by [Excalidraw](https://excalidraw.com/). This project enables multiple users to draw and collaborate on a shared canvas in real-time.

## 🚀 Features

- **Real-time Collaboration**: Multiple users can draw simultaneously on the same canvas
- **WebSocket Communication**: Instant updates across all connected clients
- **User Authentication**: Secure login and signup system with JWT tokens
- **Room-based Drawing**: Create and join drawing rooms with unique URLs
- **Modern UI**: Built with Next.js, React, and Tailwind CSS
- **Type Safety**: Full TypeScript support throughout the application
- **Database Persistence**: PostgreSQL database with Prisma ORM
- **Monorepo Architecture**: Organized with Turborepo for better development experience

## 🏗️ Architecture

This project follows a monorepo structure using [Turborepo](https://turbo.build/repo) and [pnpm](https://pnpm.io/) workspaces:

```
excelidraw-clone/
├── apps/
│   ├── excelidraw-frontend/    # Main Next.js frontend application
│   ├── web/                    # Additional web application
│   ├── ws-backend/             # WebSocket server for real-time communication
│   └── http-backend/           # HTTP API server
├── packages/
│   ├── ui/                     # Shared UI components
│   ├── db/                     # Database package with Prisma
│   ├── common/                 # Shared utilities and types
│   ├── backend-common/         # Backend-specific utilities
│   ├── typescript-config/      # Shared TypeScript configuration
│   └── eslint-config/          # Shared ESLint configuration
└── turbo.json                  # Turborepo configuration
```

### Technology Stack

**Frontend:**
- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [React 19](https://react.dev/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety

**Backend:**
- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Express.js](https://expressjs.com/) - HTTP server framework
- [WebSocket (ws)](https://github.com/websockets/ws) - Real-time communication
- [JWT](https://jwt.io/) - Authentication tokens

**Database:**
- [PostgreSQL](https://www.postgresql.org/) - Relational database
- [Prisma](https://www.prisma.io/) - Database ORM

**Development Tools:**
- [Turborepo](https://turbo.build/repo) - Monorepo build system
- [pnpm](https://pnpm.io/) - Package manager
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [pnpm](https://pnpm.io/) (version 9.0.0 or higher)
- [PostgreSQL](https://www.postgresql.org/) database

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ExceliDraw-Clone
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create `.env` files in the following directories:
   
   **Root directory:**
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/excelidraw_clone"
   JWT_SECRET="your-jwt-secret-key"
   ```
   
   **apps/excelidraw-frontend:**
   ```env
   NEXT_PUBLIC_WEBSOCKET_URL="ws://localhost:8080"
   NEXT_PUBLIC_HTTP_URL="http://localhost:3001"
   ```

4. **Set up the database**
   ```bash
   cd packages/db
   pnpm prisma generate
   pnpm prisma db push
   ```

5. **Build the project**
   ```bash
   pnpm build
   ```

## 🚀 Running the Application

### Development Mode

Start all services in development mode:
```bash
pnpm dev
```

This will start:
- Frontend: http://localhost:3000
- HTTP Backend: http://localhost:3001
- WebSocket Backend: ws://localhost:8080

### Production Mode

1. **Build all packages:**
   ```bash
   pnpm build
   ```

2. **Start the services:**
   ```bash
   # Start HTTP backend
   cd apps/http-backend
   pnpm start
   
   # Start WebSocket backend
   cd apps/ws-backend
   pnpm start
   
   # Start frontend
   cd apps/excelidraw-frontend
   pnpm start
   ```

## 📱 Usage

1. **Sign Up/Login**: Visit the application and create an account or sign in
2. **Create a Room**: Start a new drawing session
3. **Share the URL**: Share the room URL with others to collaborate
4. **Draw Together**: Multiple users can now draw simultaneously on the same canvas

## 🗄️ Database Schema

The application uses the following database models:

- **User**: Stores user information (id, name, email, password, photo)
- **Room**: Represents drawing rooms (id, slug, createdAt, adminId)
- **Chat**: Stores chat messages in rooms (id, roomId, userId, message)

## 🔧 Available Scripts

- `pnpm dev` - Start all services in development mode
- `pnpm build` - Build all packages
- `pnpm lint` - Run ESLint across all packages
- `pnpm format` - Format code with Prettier
- `pnpm check-types` - Run TypeScript type checking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Inspired by [Excalidraw](https://excalidraw.com/)
- Built with [Next.js](https://nextjs.org/) and [React](https://react.dev/)
- Real-time functionality powered by [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

## 📞 Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.
