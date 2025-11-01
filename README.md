# Photo Gallery App

A React TypeScript application that displays a responsive photo gallery using the Lorem Picsum API with infinite scroll functionality.

## Features

- **Responsive Photo Grid**: Display photos in a responsive grid layout that adapts to different screen sizes
- **Infinite Scroll**: Automatically loads more photos as you scroll down the page
- **Photo Details**: Click on any photo to view detailed information including author, dimensions, and description
- **Error Handling**: Comprehensive error handling with user-friendly error messages
- **Loading States**: Loading indicators for better user experience
- **Routing**: Client-side routing between photo list and detail views

## Technologies Used

- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Lorem Picsum API** for photo data

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository or use this project
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── PhotoGrid.tsx   # Main photo grid with infinite scroll
│   ├── PhotoCard.tsx   # Individual photo card component
│   ├── PhotoDetails.tsx # Detailed photo view
│   ├── LoadingSpinner.tsx # Loading spinner component
│   └── ErrorBoundary.tsx # Error boundary for error handling
├── services/           # API services
│   └── photoService.ts # Lorem Picsum API integration
├── types/              # TypeScript type definitions
│   └── Photo.ts        # Photo type definitions
├── App.tsx            # Main application component with routing
└── main.tsx           # Application entry point
```

## API Integration

The application uses the [Lorem Picsum API](https://picsum.photos/) to fetch photo data:

- **Photo List**: `https://picsum.photos/v2/list?page={page}&limit={limit}`
- **Photo Details**: `https://picsum.photos/id/{id}/info`
- **Photo URLs**: `https://picsum.photos/id/{id}/{width}/{height}`

## Features in Detail

### Infinite Scroll
- Automatically loads 20 photos per page
- Triggers when user scrolls within 1000px of the bottom
- Includes loading indicators and end-of-list detection

### Photo Details
- Shows full-size photo
- Displays author information and dimensions
- Includes placeholder descriptions and titles
- Provides download links to original photos

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Grid adapts from 1 column on mobile to 4 columns on desktop
- Optimized for various screen sizes

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

This application supports all modern browsers that support ES2015+ features.
