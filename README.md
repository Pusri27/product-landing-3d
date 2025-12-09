# Lumina Prime

**Next-Generation E-commerce Experience for High-Fidelity Audio**

Lumina Prime is a production-grade concept application developed to demonstrate the intersection of immersive web design, rigorous software engineering, and business-critical reliability. It mimics a high-end product launch page for a theoretical premium audio brand, utilizing bleeding-edge web technologies to deliver a 60FPS interactive experience.

---

## Executive Summary

This project serves as a comprehensive portfolio piece demonstrating **Senior Frontend Engineering** capabilities. Unlike typical creative demos, Lumina Prime is built on a foundation of scalability and resilience. It adheres to strict architectural patterns (Global State Management), ensures reliability through automated testing (Vitest), and optimizes for business growth via Technical SEO (JSON-LD) and Web Vitals telemetry.

## Key Features & Technical Highlights

### 1. Immersive 3D Product Configurator
- **Technology**: React Three Fiber (Three.js), WebGL Shaders.
- **Functionality**: Real-time 360-degree product visualization with interactive component selection ("Architecture" vs "Core").
- **Engineering**: Decoupled state management allows the UI layer to seamlessly control the WebGL scene without prop drilling.

### 2. High-Performance Interaction Design
- **Physics-Based UI**: Magnetic buttons that realistic attract to the cursor using spring physics.
- **Smooth Scrolling**: Implemented `lenis` for inertial scrolling, preserving the premium "weight" of the experience.
- **Scroll Spy**: Bi-directional navigation syncing; scrolling updates the URL hash and active UI state automatically.

### 3. Enterprise-Grade Resilience
- **Error Boundaries**: Critical 3D components are wrapped in exception catchers. If the WebGL context crashes (e.g., due to GPU memory limits), the application degrades gracefully to a fallback UI, ensuring the sales funnel remains functional.
- **Strict Typing**: Comprehensive TypeScript interfaces for all components and stores.

### 4. Technical SEO & Observability
- **Structured Data**: Automatically injects JSON-LD "Product" schema, making the site eligible for Google Rich Results (Price, Stock Status).
- **Telemetry**: configured to report Core Web Vitals (LCP, CLS, INP) for real-user monitoring.

---

## Technology Stack

- **Framework**: Next.js 16 (App Router) - Using Server Components for SEO and Client Components for interactivity.
- **Styling**: Tailwind CSS v4 - Utilizing a design token system for consistent theming.
- **State Management**: Zustand - Atomic, hook-based state management for the complex 3D configurator.
- **3D Engine**: React Three Fiber / Drei - Declarative 3D scene graph construction.
- **Animation**: Framer Motion - Orchestrating layout transitions and scroll-linked animations.
- **Testing**: Vitest & React Testing Library - Unit and Component testing infrastructure.

---

## Architecture Decision Records (ADRs)

### ADR-001: Hybrid Rendering Strategy
- **Context**: The application requires instant initial load for SEO but complex interactivity for the 3D model.
- **Decision**: Adopt Next.js App Router.
- **Rationale**: This allows us to render the shell and marketing content on the server (low TTI/LCP), while hydrating the heavy 3D "islands" only on the client.

### ADR-002: Decoupled State Management
- **Context**: The 3D Scene and the HTML UI Overlay need to share state (e.g., which earbud component is active).
- **Decision**: Use `zustand` as a global store.
- **Rationale**: React Context would trigger unnecessary re-renders of the entire 3D canvas tree. Zustand allows transient updates and subscribing only to specific slices of state, essential for maintaining 60FPS in the render loop.

### ADR-003: Graceful Degradation Strategy
- **Context**: WebGL is volatile and depends heavily on client hardware.
- **Decision**: Implement Component-level Error Boundaries.
- **Rationale**: A crash in the cosmetic 3D layer must never prevent a user from accessing core information (Pricing, Specs) or completing a purchase.

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Pusri27/product-landing-3d.git

# Install dependencies
npm install
```

### Development
```bash
# Start the development server
npm run dev
```

### Testing
```bash
# Run unit and component tests
npm test
```

### Production Build
```bash
# Create an optimized build
npm run build

# Start the production server
npm start
```
