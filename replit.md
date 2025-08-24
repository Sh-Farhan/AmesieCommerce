# Overview

Shopease is a full-featured e-commerce platform built with FastAPI and vanilla JavaScript. The application provides a complete online shopping experience with user authentication, product browsing, cart management, order processing, and payment integration. It features a modern responsive web interface with category-based product organization, search functionality, user profiles, and order tracking capabilities.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Backend Architecture
- **Framework**: FastAPI with Python for REST API development
- **Database**: PostgreSQL with SQLAlchemy ORM for data persistence
- **Authentication**: JWT-based authentication using jose library with bcrypt password hashing
- **API Structure**: Modular router-based organization with separate modules for auth, products, cart, orders, and users
- **Session Management**: SQLAlchemy session handling with dependency injection pattern

## Frontend Architecture
- **Technology Stack**: Server-side rendered HTML templates using Jinja2 with vanilla JavaScript
- **Styling**: Bootstrap 5 framework with custom CSS for responsive design
- **Client-Side State**: Local storage for authentication tokens and cart persistence
- **API Communication**: Fetch-based HTTP client with centralized API calling utilities

## Data Models
- **User Management**: Users, addresses, and authentication data
- **Product Catalog**: Products with categories, pricing, and inventory tracking
- **Shopping Cart**: Session-based cart items linked to users
- **Order System**: Order creation, tracking, and management
- **Additional Features**: Reviews, wishlist functionality

## Security Implementation
- **Password Security**: Bcrypt hashing for password storage
- **Token Authentication**: JWT tokens with configurable expiration
- **Route Protection**: Dependency-based authentication guards
- **Environment Configuration**: Secure handling of secrets via environment variables

## Template Organization
- **Base Template**: Shared layout with navigation and common functionality
- **Page Templates**: Individual pages for home, products, cart, checkout, orders, and user management
- **Component Structure**: Reusable components for product display and user interactions

# External Dependencies

## Payment Processing
- **Razorpay**: Indian payment gateway for order processing and payment capture
- **Configuration**: API key and secret management through environment variables

## Database
- **PostgreSQL**: Primary database with connection string configuration
- **SQLAlchemy**: ORM for database operations and schema management

## Authentication Libraries
- **Jose**: JWT token creation and validation
- **Passlib**: Password hashing and verification with bcrypt

## Frontend Libraries
- **Bootstrap 5**: CSS framework for responsive design
- **Font Awesome**: Icon library for user interface elements
- **Google Fonts**: Inter font family for typography

## Development Dependencies
- **Uvicorn**: ASGI server for FastAPI application deployment
- **Jinja2**: Template engine for server-side rendering