# AstroAlert - Client Application

This directory contains the front-end client application for AstroAlert, an astrology consultation platform. This README provides a comprehensive guide to help you understand and navigate the codebase.

## Table of Contents
- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Key Features](#key-features)
- [Environment Configuration](#environment-configuration)
- [Pages and Routing](#pages-and-routing)
- [Components](#components)
- [State Management](#state-management)
- [Authentication](#authentication)
- [API Integration](#api-integration)
- [Styling](#styling)
- [Testing](#testing)
- [Deployment](#deployment)
- [Performance Optimization](#performance-optimization)
- [Common Issues and Solutions](#common-issues-and-solutions)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Contributing](#contributing)

## Overview

AstroAlert is a comprehensive astrology platform that connects users with professional astrologers through a modern, intuitive interface. The application offers various services including:

- **Personalized Horoscope Readings**: Daily, weekly, and monthly forecasts
- **Match-Making**: Compatibility analysis for relationships
- **Panchang**: Traditional Hindu calendar and astrological calculations
- **Live Consultations**: Real-time chat and video sessions with astrologers
- **E-commerce**: Shop for astrological products and services
- **Blog & Resources**: Educational content on astrology topics

The client application is built with a focus on performance, accessibility, and user experience. It follows modern front-end architecture patterns and best practices.

## Technology Stack

### Core Technologies
- **Framework**: Next.js 15.x (leveraging React 19's latest features)
- **Language**: TypeScript 5.x (with strict type checking)
- **Build System**: Built-in Next.js compiler with Webpack

### UI and Styling
- **CSS Framework**: Tailwind CSS 3.x with utility-first approach
- **Component Libraries**:
  - DaisyUI for enhanced Tailwind components
  - Material UI (MUI) 6.x for complex UI components
  - CSS Modules for component-scoped styling
- **Animation**: Framer Motion for fluid UI transitions

### State Management
- **Local State**: React Hooks (useState, useReducer)
- **Application State**: React Context API with custom providers
- **Form Management**: Native form handling with custom hooks

### Data Fetching & Communication
- **API Client**: Built-in Next.js API routes
- **Data Caching**: SWR for data fetching with caching and revalidation
- **Real-time**: Socket.io client for bidirectional communication
- **Authentication**: NextAuth.js for secure user sessions

### Third-Party Integrations
- **Database**: MongoDB with Mongoose ODM
- **Payment Processing**: Razorpay for secure transactions
- **Date & Time**: date-fns and dayjs for date manipulation
- **Notifications**: react-hot-toast and react-toastify

### Development Tools
- **Linting**: ESLint with Next.js configuration
- **Code Formatting**: Prettier
- **Package Management**: npm

## Project Structure

The project follows a modular, feature-based architecture to ensure maintainability and scalability:

```
client/
├── public/              # Static assets and resources
│   ├── images/          # Image assets (logos, icons, illustrations)
│   ├── fonts/           # Custom font files
│   └── locales/         # i18n translation files
├── src/                 # Source code
│   ├── app/             # Next.js App Router pages and layouts
│   │   ├── api/         # API routes for server-side operations
│   │   │   ├── auth/    # Authentication endpoints
│   │   │   ├── chat/    # Chat message endpoints
│   │   │   └── [...]    # Other API endpoints organized by domain
│   │   ├── dashboard/   # User dashboard pages
│   │   │   ├── page.tsx # Main dashboard page
│   │   │   ├── layout.tsx # Dashboard layout
│   │   │   └── [...]    # Dashboard subpages (settings, profile, etc.)
│   │   ├── chat/        # Chat consultation pages
│   │   ├── call/        # Video consultation pages
│   │   ├── astrologer/  # Astrologer profiles and pages
│   │   ├── horoscope/   # Horoscope related pages
│   │   ├── shop/        # E-commerce shop pages
│   │   ├── match-making/# Match making service pages
│   │   ├── panchang/    # Panchang service pages
│   │   ├── sign-in/     # Authentication pages
│   │   ├── layout.tsx   # Root layout (includes global providers)
│   │   └── page.tsx     # Home page
│   ├── components/      # Reusable UI components
│   │   ├── layout/      # Layout components
│   │   │   ├── Navbar/  # Navigation components
│   │   │   └── Footer/  # Footer components
│   │   ├── ui/          # UI components (organized by purpose)
│   │   │   ├── buttons/ # Button variants
│   │   │   ├── cards/   # Card components
│   │   │   ├── forms/   # Form controls and inputs
│   │   │   └── modals/  # Dialog and modal components
│   │   ├── chat/        # Chat related components
│   │   ├── admin/       # Admin panel components
│   │   └── astrologer/  # Astrologer related components
│   ├── contexts/        # React Context providers
│   │   ├── AuthContext.tsx    # Authentication state context
│   │   ├── ChatContext.tsx    # Chat state management
│   │   └── [...].ts          # Other context providers
│   ├── hooks/           # Custom React hooks
│   │   ├── useAuth.ts         # Authentication hooks
│   │   ├── useChat.ts         # Chat functionality hooks
│   │   ├── useForm.ts         # Form handling hooks
│   │   └── [...].ts           # Other custom hooks
│   ├── lib/             # Utility libraries and helpers
│   │   ├── api.ts       # API client configuration
│   │   ├── validation.ts # Form validation utilities
│   │   └── [...].ts     # Other utility functions
│   ├── providers/       # Provider components for global state/features
│   ├── services/        # API service integrations
│   │   ├── authService.ts     # Authentication service
│   │   ├── chatService.ts     # Chat service
│   │   └── [...].ts           # Other service modules
│   ├── styles/          # Global styles and theme configuration
│   │   ├── globals.css  # Global CSS styles
│   │   └── theme.ts     # Theme configuration
│   ├── types/           # TypeScript type definitions
│   │   ├── user.ts      # User-related types
│   │   ├── astrology.ts # Astrology-related types
│   │   └── [...].ts     # Other type definitions
│   ├── constants/       # Application constants
│   │   ├── routes.ts    # Route definitions
│   │   ├── api.ts       # API endpoint constants
│   │   └── [...].ts     # Other constants
│   └── config/          # Configuration files
│       ├── axios.ts     # Axios configuration
│       └── [...].ts     # Other configurations
├── .env                 # Environment variables (default)
├── .env.local           # Local environment variables (not committed)
├── .env.production      # Production environment variables
├── next.config.ts       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.mjs   # PostCSS configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies and scripts
```

### Key Files and Their Purposes

- **app/layout.tsx**: Root layout that wraps all pages, includes global providers, metadata, and global UI elements
- **app/page.tsx**: The main landing page component
- **components/layout/Navbar.tsx**: Main navigation component with responsive design
- **components/ProtectedRoute.tsx**: HOC for route protection based on authentication
- **contexts/AuthContext.tsx**: Manages authentication state across the application
- **hooks/useAuth.ts**: Custom hook for authentication operations
- **lib/api.ts**: Utility functions for API requests
- **services/authService.ts**: Service for authentication-related API calls

### Directory Structure Conventions

- **Pages**: Follow Next.js App Router conventions with `page.tsx` as the main component
- **Components**: Organized by feature area and then by component type
- **Hooks**: Custom hooks are prefixed with `use` following React conventions
- **Context Providers**: Named with the convention `[Feature]Context.tsx`
- **Services**: Organized by domain with the convention `[domain]Service.ts`

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or later (recommended: LTS version)
- **npm** (v9+) or **yarn** (v1.22+)
- **Git**: For version control
- Text editor with TypeScript support (VSCode recommended)

### Installation

```bash
# Clone the repository (if not done already)

# Navigate to the client directory
cd astroalert/client

# Install dependencies
npm install
# or
yarn install

# Setup environment variables
cp .env.example .env.local
```

Edit the `.env.local` file with your specific configuration values.

### Development Workflow

```bash
# Start the development server
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`. The development server includes:
- Hot Module Replacement (HMR) for instant updates
- Error overlay for debugging
- Source maps for easier debugging

#### Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run lint` | Run ESLint for code quality checks |
| `npm run lint:fix` | Fix automatically fixable ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Run TypeScript type checking |

### Building for Production

```bash
# Create a production build
npm run build

# Start the production server
npm run start
```

For a production deployment, configure environment variables appropriate for your deployment environment.

## Key Features

### 1. User Authentication & Profiles

#### Authentication Methods
- Email/password authentication
- Social login (Google, Facebook)
- OTP-based mobile verification

#### Profile Management
- Profile editing
- Upload/change profile picture
- View consultation history
- Manage payment methods
- Preference settings

#### Security Features
- JWT token-based authentication
- Secure password hashing
- Session management
- Role-based access control

### 2. Astrologer Consultations

#### Chat Consultations
- Real-time messaging
- Media sharing capabilities
- Chat history
- Quick prompt suggestions
- Offline message notifications

#### Video Call Consultations
- WebRTC-based video calls
- Screen sharing capabilities
- Text chat during calls
- Call recording (with consent)
- Network quality indicators

#### Appointment Scheduling
- Calendar integration
- Astrologer availability display
- Timezone handling
- Reminder notifications
- Rescheduling options

### 3. Astrology Services

#### Horoscope Features
- Daily/weekly/monthly forecasts
- Birth chart analysis
- Transit predictions
- Custom planetary reports
- Personalized recommendations

#### Match Making
- Comprehensive compatibility reports
- Guna Milan calculation
- Astrological compatibility metrics
- Relationship forecasts
- Dosha analysis and remedies

#### Panchang
- Daily panchang details
- Muhurta calculations
- Auspicious timings
- Festival calendar
- Nakshatra predictions

### 4. E-commerce

#### Shop Features
- Product catalog with categories
- Product detail pages
- Shopping cart functionality
- Wishlist capability
- Order history

#### Payment Processing
- Razorpay integration
- Multiple payment methods
- Secure checkout
- Order tracking
- Invoice generation

### 5. Content & Engagement

#### Blog Platform
- Category-based articles
- Featured posts
- Author profiles
- Related articles recommendations
- Social sharing capabilities

#### Community Features
- User reviews and testimonials
- Rating system
- Comment sections
- Featured testimonials
- Social proof elements

### 6. Administrative Features

#### Admin Dashboard
- Analytics overview
- User management
- Content management
- Order processing
- System configuration

#### Astrologer Management
- Onboarding workflow
- Performance metrics
- Schedule management
- Payout processing
- Rating monitoring

## Environment Configuration

The application uses environment variables for configuration across different deployment environments. Here's a detailed breakdown of the required variables:

### Core Configuration

```
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=AstroAlert
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NODE_ENV=development

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXT_PUBLIC_ENABLE_SOCIAL_LOGIN=true

# Database
MONGODB_URI=mongodb://localhost:27017/astroalert
MONGODB_DB_NAME=astroalert

# Communication
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
NEXT_PUBLIC_SOCKET_PATH=/socket.io

# Payment Gateway
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_PAYMENT_GATEWAY=razorpay

# Media Storage
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# External Services
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your_ga_id
```

### Environment-Specific Files

- **.env**: Default values, committed to repository (without secrets)
- **.env.local**: Local development, not committed (contains secrets)
- **.env.development**: Development environment settings
- **.env.production**: Production environment settings
- **.env.test**: Testing environment settings

### Accessing Environment Variables

Within your codebase, access environment variables as follows:

```typescript
// Server-side (accessible to both client and server)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Server-side only (not exposed to client)
const mongoUri = process.env.MONGODB_URI;
```

> **IMPORTANT**: Variables that should be accessible in browser code must be prefixed with `NEXT_PUBLIC_`

## Pages and Routing

The application uses Next.js App Router for page routing, which follows a file-system based routing approach. Understanding this structure is crucial for navigating the codebase.

### Main Routes

| Route | Description | Key Components | Access Control |
|-------|-------------|----------------|---------------|
| `/` | Home page with featured services | `app/page.tsx` | Public |
| `/sign-in` | Authentication page | `app/sign-in/page.tsx` | Public |
| `/dashboard` | User dashboard | `app/dashboard/page.tsx` | Protected |
| `/dashboard/profile` | User profile management | `app/dashboard/profile/page.tsx` | Protected |
| `/dashboard/appointments` | Appointment management | `app/dashboard/appointments/page.tsx` | Protected |
| `/dashboard/orders` | Order history | `app/dashboard/orders/page.tsx` | Protected |
| `/chat` | Chat consultation interface | `app/chat/page.tsx` | Protected |
| `/chat/[astrologerId]` | Specific astrologer chat | `app/chat/[astrologerId]/page.tsx` | Protected |
| `/call` | Video call consultation | `app/call/page.tsx` | Protected |
| `/call/[sessionId]` | Specific video call session | `app/call/[sessionId]/page.tsx` | Protected |
| `/astrologer` | Astrologer listings | `app/astrologer/page.tsx` | Public |
| `/astrologer/[id]` | Specific astrologer profile | `app/astrologer/[id]/page.tsx` | Public |
| `/horoscope` | Horoscope services | `app/horoscope/page.tsx` | Public |
| `/horoscope/daily` | Daily horoscope | `app/horoscope/daily/page.tsx` | Public |
| `/match-making` | Match making services | `app/match-making/page.tsx` | Public |
| `/panchang` | Panchang services | `app/panchang/page.tsx` | Public |
| `/shop` | E-commerce shop | `app/shop/page.tsx` | Public |
| `/shop/product/[id]` | Product detail page | `app/shop/product/[id]/page.tsx` | Public |
| `/orders` | Order history | `app/orders/page.tsx` | Protected |
| `/orders/[id]` | Order detail page | `app/orders/[id]/page.tsx` | Protected |
| `/blog` | Blog articles | `app/blog/page.tsx` | Public |
| `/blog/[slug]` | Blog article page | `app/blog/[slug]/page.tsx` | Public |
| `/about` | About page | `app/about/page.tsx` | Public |
| `/contact` | Contact page | `app/contact/page.tsx` | Public |
| `/careers` | Career opportunities | `app/careers/page.tsx` | Public |

### Routing Architecture

The Next.js App Router implements:

- **Layouts**: Shared UI across routes (see `app/layout.tsx`, `app/dashboard/layout.tsx`)
- **Loading States**: Via `loading.tsx` files in each directory
- **Error Handling**: Via `error.tsx` files in each directory
- **Dynamic Routes**: For handling parameterized paths
- **Route Groups**: For organizing routes without affecting the URL path

### Route Protection

Routes are protected using:

1. **Middleware**: Next.js middleware for initial auth checking
2. **ProtectedRoute Component**: Higher-order component that redirects unauthenticated users
3. **Role-Based Access**: Checks user roles (e.g., admin, astrologer, user) for appropriate access

Code example from `middleware.ts`:

```typescript
// This is a simplified example of the middleware
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PROTECTED_ROUTES = ['/dashboard', '/chat', '/call', '/orders'];
const AUTH_ROUTES = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );
  const isAuthRoute = AUTH_ROUTES.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}
```

## Components

The application uses a component-based architecture for reusability and maintainability. Understanding the key components will help you navigate the codebase efficiently.

### Core Component Categories

#### Layout Components

These components define the structure of the application:

- **Navbar.tsx**: Main navigation component
  - Features responsive design, user menu, and navigation links
  - Handles authentication state display
  - Implements mobile menu for smaller screens

- **Footer.tsx**: Site footer component
  - Contains links, copyright information, and social media connections
  - Organized in sections with responsive design

- **ProtectedRoute.tsx**: HOC for route protection
  - Example usage:
  ```tsx
  // Example of how ProtectedRoute is used
  export default function DashboardPage() {
    return (
      <ProtectedRoute>
        <DashboardContent />
      </ProtectedRoute>
    );
  }
  ```

#### Chat Components

- **Chat.tsx**: Main chat interface component
  - Handles message display, sending, and real-time updates
  - Integrates with Socket.io for real-time functionality
  - Manages chat history and message types

- **ChatInterface.tsx**: UI component for chat display
  - Implements message bubbles, typing indicators, and timestamps
  - Handles scroll behavior and new message notifications

- **Sender.tsx** & **Receiver.tsx**: Message components
  - Style and display messages differently based on sender
  - Handle different message content types (text, media, etc.)
  - Display metadata like read receipts and timestamps

- **QuickPromptButtons.tsx**: Predefined message shortcuts
  - Provides commonly used questions or responses
  - Implements click-to-send functionality

#### Call Components

- **VideoCall.tsx**: Video call interface
  - Integrates WebRTC for peer connections
  - Handles media streams, device selection
  - Implements UI for call controls

- **CallControls.tsx**: Call action buttons
  - Contains mute, camera toggle, screen sharing, and end call controls
  - Handles call state changes

#### Home Page Components

- **AstrologyTypes.tsx**: Service category display
  - Showcases different astrology services with images and descriptions
  - Implements interactive elements and navigation to service pages

- **CustomerReviews.tsx**: Testimonials carousel
  - Displays user reviews and ratings
  - Implements carousel navigation and automatic rotation

- **BlogSection.tsx**: Featured blog posts
  - Displays recent or featured blog articles
  - Links to full blog posts

- **FAQ.tsx**: Frequently asked questions
  - Collapsible Q&A sections
  - Searchable FAQ content

### Component Design Patterns

The application implements several React design patterns:

1. **Composition**: Components are composed of smaller, focused components
2. **Container/Presentational**: Separation of data fetching and UI rendering
3. **Render Props**: For sharing code between components
4. **Custom Hooks**: For reusable logic

Example of a presentational component:

```tsx
// Example of a presentational component
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  onClick, 
  disabled 
}: ButtonProps) {
  const baseClasses = 'rounded font-medium transition-colors';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark',
    outline: 'border border-primary text-primary hover:bg-primary-light'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
  
  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
```

## State Management

The application uses a combination of local component state and React Context API for global state management. Understanding the state management approach is crucial for working with the codebase effectively.

### State Management Architecture

The state management is organized into different domains:

1. **Local Component State**: Using React's `useState` and `useReducer` hooks
2. **Global Application State**: Using React Context API
3. **Form State**: Using custom hooks and form libraries
4. **Server State**: Using SWR for data fetching, caching, and synchronization

### Key Context Providers

- **AuthContext**: Manages authentication state
  ```tsx
  // AuthContext simplified example
  interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
  }
  
  interface AuthContextType extends AuthState {
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    register: (userData: RegisterData) => Promise<void>;
    updateProfile: (profileData: ProfileUpdate) => Promise<void>;
  }
  
  export const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);
    
    // Implement auth methods
    const login = async (credentials: LoginCredentials) => {/* ... */};
    const logout = async () => {/* ... */};
    const register = async (userData: RegisterData) => {/* ... */};
    const updateProfile = async (profileData: ProfileUpdate) => {/* ... */};
    
    useEffect(() => {
      // Check for existing session
    }, []);
    
    return (
      <AuthContext.Provider value={{ 
        ...state, 
        login, 
        logout, 
        register, 
        updateProfile 
      }}>
        {children}
      </AuthContext.Provider>
    );
  }
  ```

- **ChatContext**: Manages chat state and functionality
  - Handles active chats, message history, and typing indicators
  - Maintains socket connections and event handlers
  - Provides message sending and receiving methods

- **ConsultationContext**: Manages consultation sessions
  - Tracks active consultation status
  - Handles consultation timing and billing
  - Manages session metadata and history

- **CartContext**: Manages shopping cart state
  - Handles product addition, removal, and quantity updates
  - Calculates totals and discounts
  - Persists cart data in local storage

### Custom Hooks for State Access

The application provides custom hooks for accessing state contexts:

```tsx
// useAuth hook example
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

// Usage example
function ProfileButton() {
  const { user, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <LoginButton />;
  }
  
  return (
    <div className="dropdown">
      <button>{user.name}</button>
      <div className="dropdown-content">
        <Link href="/profile">My Profile</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
```

### Form State Management

Forms are managed using:

1. **Controlled Components**: React state for form values
2. **Custom Form Hooks**: For validation and submission logic
3. **Form Libraries**: For complex forms (react-hook-form)

## Authentication

Authentication is a critical aspect of the application, managed through NextAuth.js with MongoDB for data storage. Understanding this system is essential for working with user accounts and protected routes.

### Authentication Flow

1. **User Registration**:
   - User submits registration form
   - Server validates data and creates new user record
   - Password is hashed securely using bcrypt
   - Email verification (optional) is sent
   - User is redirected to login or onboarding

2. **User Login**:
   - User submits credentials
   - Server validates against stored records
   - JWT session token is generated
   - Token is stored in HTTP-only cookie
   - User is redirected to dashboard or previous page

3. **Session Management**:
   - Sessions are validated on each request
   - Expired tokens trigger re-authentication
   - Refresh token mechanism extends session duration
   - Session data is stored in JWT and/or database

4. **Logout Process**:
   - Session is invalidated on server
   - Cookies are cleared
   - User is redirected to home or login page

### NextAuth.js Configuration

The application uses NextAuth.js with custom adapters for MongoDB. Here's a simplified example of the configuration:

```typescript
// pages/api/auth/[...nextauth].ts simplified example
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from 'lib/mongodb';
import { verifyPassword } from 'lib/auth';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Validate credentials against database
        const user = await getUserByEmail(credentials.email);
        
        if (!user) {
          throw new Error('No user found with this email');
        }
        
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        
        if (!isValid) {
          throw new Error('Invalid password');
        }
        
        return { 
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add custom claims to JWT
      if (user) {
        token.role = user.role;
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Make claims available to client
      session.user.role = token.role;
      session.user.id = token.userId;
      return session;
    }
  },
  pages: {
    signIn: '/sign-in',
    error: '/auth/error',
    newUser: '/onboarding'
  }
});
```

### User Roles and Permissions

The application implements role-based access control:

| Role | Description | Permissions |
|------|-------------|-------------|
| User | Regular customer | Access personal dashboard, make consultations, shop |
| Astrologer | Service provider | Manage profile, accept consultations, receive payments |
| Admin | System administrator | Full access to admin panel, user management, content management |
| SuperAdmin | Owner-level access | System configuration, role management, financial operations |

### Protected Components

The `ProtectedRoute` component ensures that only authenticated users can access certain routes:

```typescript
// components/ProtectedRoute.tsx
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'astrologer' | 'admin' | 'superadmin';
}

export default function ProtectedRoute({ 
  children, 
  requiredRole 
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuth();
  
  // Handle loading state
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    router.push('/sign-in?redirect=' + window.location.pathname);
    return null;
  }
  
  // Check role if required
  if (requiredRole && user.role !== requiredRole) {
    router.push('/unauthorized');
    return null;
  }
  
  // User is authenticated and has required role
  return <>{children}</>;
}
```

## API Integration

The application communicates with backend services through several mechanisms. Understanding these patterns will help you add new features that require data fetching or submission.

### API Architecture

1. **Next.js API Routes**: Server-side endpoints in the `app/api` directory
2. **External API Calls**: Direct calls to third-party services
3. **Socket.io**: Real-time communication for chat and notifications

### Next.js API Routes

API routes are organized by domain within the `app/api` directory:

```
app/api/
├── auth/              # Authentication endpoints
│   ├── register/      # User registration
│   ├── login/         # User login (fallback for NextAuth)
│   └── [...nextauth]/ # NextAuth.js endpoints
├── user/              # User-related endpoints
│   ├── profile/       # Profile management
│   └── preferences/   # User preferences
├── consultations/     # Consultation management
│   ├── book/          # Booking endpoints
│   ├── cancel/        # Cancellation endpoints
│   └── [id]/          # Specific consultation operations
├── chat/              # Chat-related endpoints
│   ├── messages/      # Message operations
│   ├── history/       # Chat history retrieval
│   └── [userId]/      # User-specific chat operations
├── astrologer/        # Astrologer-related endpoints
├── payment/           # Payment processing endpoints
├── shop/              # E-commerce endpoints
└── admin/             # Admin-only endpoints
```

### API Service Layer

The application implements a service layer pattern for API communication:

```typescript
// services/authService.ts example
import axios from 'axios';
import { LoginCredentials, RegistrationData, User } from '@/types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authService = {
  async register(data: RegistrationData): Promise<User> {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  },
  
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  },
  
  async getProfile(): Promise<User> {
    const response = await axios.get(`${API_URL}/user/profile`);
    return response.data;
  },
  
  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await axios.put(`${API_URL}/user/profile`, data);
    return response.data;
  },
  
  async logout(): Promise<void> {
    await axios.post(`${API_URL}/auth/logout`);
  }
};
```

### Data Fetching with SWR

The application uses SWR for data fetching with built-in caching and revalidation:

```typescript
// Example of using SWR for data fetching
import useSWR from 'swr';
import { fetcher } from '@/lib/api';

export function useUserProfile() {
  const { data, error, isLoading, mutate } = useSWR('/api/user/profile', fetcher);
  
  return {
    user: data,
    isLoading,
    isError: error,
    updateProfile: async (profileData) => {
      // Optimistic update
      mutate({ ...data, ...profileData }, false);
      
      // Send actual update to server
      try {
        const updatedUser = await authService.updateProfile(profileData);
        mutate(updatedUser);
        return updatedUser;
      } catch (error) {
        // Revert optimistic update on error
        mutate(data);
        throw error;
      }
    }
  };
}
```

### Real-time Communication with Socket.io

The application implements Socket.io for real-time features:

```typescript
// hooks/useSocket.ts example
import { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { useAuth } from './useAuth';

export function useSocket() {
  const { user, isAuthenticated } = useAuth();
  const socketRef = useRef<Socket | null>(null);
  
  useEffect(() => {
    if (!isAuthenticated || !user) return;
    
    // Connect to socket server
    socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      query: { userId: user.id },
      path: process.env.NEXT_PUBLIC_SOCKET_PATH || '/socket.io',
      transports: ['websocket', 'polling']
    });
    
    // Setup event listeners
    const socket = socketRef.current;
    
    socket.on('connect', () => {
      console.log('Socket connected');
    });
    
    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
    
    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.disconnect();
        socketRef.current = null;
      }
    };
  }, [isAuthenticated, user]);
  
  return socketRef.current;
}
```

## Styling

The application uses a sophisticated styling approach combining multiple techniques for maintainable, responsive design.

### Styling Architecture

1. **Tailwind CSS**: Utility-first CSS framework for rapid styling
2. **CSS Modules**: Component-scoped styles to prevent conflicts
3. **Material UI (MUI)**: Component library with customizable theming
4. **Global Styles**: Base styles and CSS variables

### Tailwind CSS Configuration

The Tailwind configuration is extended to support the application's design system:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5E17EB',
          light: '#7F3FFF',
          dark: '#4A11C3'
        },
        secondary: {
          DEFAULT: '#FF5733',
          light: '#FF7F5F',
          dark: '#D43D1F'
        },
        background: {
          light: '#F8F9FC',
          dark: '#121212'
        },
        text: {
          primary: '#1F2937',
          secondary: '#6B7280',
          light: '#F9FAFB'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        'sm': '0.25rem',
        DEFAULT: '0.375rem',
        'md': '0.5rem',
        'lg': '1rem',
        'xl': '1.5rem'
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }
    }
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
};
```

### CSS Modules

Component-specific styles use CSS Modules to avoid conflicts:

```css
/* ChatInterface.module.css */
.chatContainer {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 160px);
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.messagesList {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background-color: var(--bg-secondary);
}

.inputArea {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: var(--bg-primary);
  border-top: 1px solid var(--border-color);
}

/* More styles... */
```

### Material UI Theme Customization

The Material UI theme is customized to match the application design system:

```typescript
// src/config/muiTheme.ts
import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#5E17EB',
      light: '#7F3FFF',
      dark: '#4A11C3',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#FF5733',
      light: '#FF7F5F',
      dark: '#D43D1F',
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#F8F9FC',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#1F2937',
      secondary: '#6B7280'
    }
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    h1: {
      fontFamily: 'Poppins, system-ui, sans-serif',
      fontWeight: 700
    },
    // Other typography settings
  },
  shape: {
    borderRadius: 8
  },
  // Other theme customizations
});
```

### Responsive Design

The application implements responsive design using:

1. **Tailwind Breakpoints**: For screen-size-based styling
2. **Mobile-First Approach**: Designing for mobile and scaling up
3. **Component-Level Responsiveness**: Components adapt based on container size
4. **Media Queries**: For complex responsive behavior
5. **Flexbox and Grid**: For flexible layouts

## Testing

Testing is an essential part of the development workflow. Understanding the testing strategy will help you contribute quality code.

### Testing Strategy

The application follows a comprehensive testing approach:

1. **Unit Tests**: For testing individual functions and components
2. **Integration Tests**: For testing component interactions
3. **End-to-End Tests**: For testing complete user flows

### Unit Testing

Unit tests focus on testing individual components and functions:

```typescript
// Example unit test for a Button component
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button component', () => {
  test('renders correctly', () => {
    render(<Button variant="primary">Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary');
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button variant="primary" onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders disabled state correctly', () => {
    render(<Button variant="primary" disabled>Click me</Button>);
    
    const button = screen.getByText('Click me');
    expect(button).toBeDisabled();
  });
});
```

### Integration Testing

Integration tests verify that components work together correctly:

```typescript
// Example integration test for login functionality
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SignInPage } from '@/app/sign-in/page';
import { AuthProvider } from '@/contexts/AuthContext';
import { mockAuthService } from '@/mocks/authService';

// Mock the auth service
jest.mock('@/services/authService', () => mockAuthService);

describe('Sign In Page', () => {
  test('successful login redirects to dashboard', async () => {
    // Setup mocks
    mockAuthService.login.mockResolvedValueOnce({ user: { id: '123', name: 'Test User' } });
    const mockRouter = { push: jest.fn() };
    jest.mock('next/navigation', () => ({
      useRouter: () => mockRouter
    }));
    
    // Render component with context
    render(
      <AuthProvider>
        <SignInPage />
      </AuthProvider>
    );
    
    // Fill the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Verify redirection
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/dashboard');
    });
  });
});
```

### End-to-End Testing

End-to-end tests simulate real user interactions:

```typescript
// Example Cypress E2E test
describe('Authentication Flow', () => {
  it('allows a user to sign in and access the dashboard', () => {
    // Visit the sign-in page
    cy.visit('/sign-in');
    
    // Fill in the login form
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('Password123!');
    
    // Submit the form
    cy.get('button[type="submit"]').click();
    
    // Verify redirect to dashboard
    cy.url().should('include', '/dashboard');
    
    // Verify user is authenticated
    cy.get('[data-testid="user-menu"]').should('be.visible');
    cy.get('[data-testid="user-name"]').should('contain', 'Test User');
  });
});
```

## Performance Optimization

The application implements various performance optimization techniques:

### Code Optimization

- **Code Splitting**: Using Next.js dynamic imports and lazy loading
- **Tree Shaking**: Eliminating unused code in production builds
- **Memoization**: Using React.memo, useMemo, and useCallback
- **Virtualization**: For rendering large lists efficiently

### Asset Optimization

- **Image Optimization**: Using Next.js Image component
- **Font Optimization**: With font display swap and preloading
- **Icon Optimization**: Using optimized SVG icons

### Build Optimization

- **Minification**: JavaScript and CSS minification
- **Compression**: Gzip/Brotli compression
- **Cache Optimization**: Setting appropriate cache headers

## Development Workflow

### Git Workflow

1. **Branch Strategy**:
   - `main`: Production-ready code
   - `development`: Integration branch for feature development
   - `feature/*`: Feature branches for specific development
   - `bugfix/*`: Branches for bug fixes
   - `hotfix/*`: Urgent fixes for production issues

2. **Commit Guidelines**:
   - Use conventional commit messages (e.g., `feat:`, `fix:`, `docs:`)
   - Include issue references where applicable
   - Keep commits focused and atomic

3. **Pull Request Process**:
   - Create PRs against the `development` branch
   - Include a clear description of changes
   - Ensure all tests pass
   - Request reviews from appropriate team members

### Code Standards

The application follows industry best practices and standards:

1. **ESLint Configuration**: Enforces code quality rules
2. **Prettier**: Ensures consistent code formatting
3. **TypeScript**: Strict type checking enabled
4. **Accessibility**: WCAG 2.1 compliance
5. **Performance Budgets**: Monitoring bundle sizes and load times

## Contributing

To contribute to the application effectively:

1. **Setup Environment**:
   - Follow the installation guide in the Getting Started section
   - Configure the appropriate environment variables

2. **Understand Architecture**:
   - Review the project structure and key components
   - Understand the state management approach
   - Learn the routing system

3. **Follow Development Guidelines**:
   - Write clean, maintainable code
   - Include appropriate tests
   - Document new features or changes
   - Follow the established code style

4. **Submit Changes**:
   - Create feature branches for new work
   - Make focused, well-tested changes
   - Submit pull requests with clear descriptions
   - Address review feedback promptly

5. **Communication**:
   - Discuss major changes before implementation
   - Document your work thoroughly
   - Help maintain and improve documentation