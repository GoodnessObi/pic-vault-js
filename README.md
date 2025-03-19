# Pic Vault

[Pic Vault]() is a mini Unsplash clone built using Vue 3 and TypeScript. It consumes the Unsplash API to fetch and display high-quality images in a responsive, staggered grid layout. The project follows modern frontend development practices, including API handling, CSS grid layouts, animations, and responsive design.

## Features

- Fetches and displays images from the [Unsplash API](https://unsplash.com/developers).
- Staggered grid layout with overlapping first-row images.
- Displays author names and photo locations.
- Tint overlay for better text contrast on images.
- Loading placeholders for better user experience.
- Fullscreen image modal with smooth animations.
- Image slider with left/right navigation and touch-swipe support.
- Smooth transitions for opening and closing the slider.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/pic-vault.git
   cd pic-vault
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

## Running the Project

### Development Mode

```sh
npm run dev
```

This starts a development server using Vite.

### Build for Production

```sh
npm run build
```

Builds the project for production.

### Preview Production Build

```sh
npm run preview
```

Runs the built project in preview mode.

### Lint and Format Code

```sh
npm run lint   # Fix linting issues
npm run format # Format code using Prettier
```

## Technologies Used

- **Vue 3**: Progressive JavaScript framework.
- **Vue Router**: Handles routing within the application.
- **TypeScript**: Adds type safety and enhances code quality.
- **Axios**: Handles API calls to Unsplash.
- **Sass**: CSS preprocessor for efficient styling.
- **Vite**: Fast and modern build tool.
- **ESLint & Prettier**: Ensures clean and consistent code.

## Project Structure

```
📦 pic-vault
├── 📂 src
│   ├── 📂 components   # Vue components
│   ├── 📂 views        # Page views
│   ├── 📂 assets       # Global styles and scss variables
│   ├── 📂 composables  # Reusable Vue composables
│   ├── App.vue        # Root component
│   ├── main.ts        # Application entry point
│   ├── router.ts      # Vue Router setup
│   └── api.ts         # API client for Unsplash
├── 📂 public          # Static assets
├── .eslintrc.js       # ESLint configuration
├── .prettierrc        # Prettier configuration
├── tsconfig.json      # TypeScript configuration
├── vite.config.ts     # Vite configuration
├── package.json       # Dependencies and scripts
└── README.md          # Project documentation
```

## API Integration

This project uses the Unsplash API to fetch images. To run the project, you need an Unsplash API key.

1. Create a `.env` file in the root directory and add:
   ```sh
   VITE_UNSPLASH_ACCESS_KEY=your_api_key_here
   ```
2. Use `import.meta.env.VITE_UNSPLASH_ACCESS_KEY` to access the API key in Vue components.

## Contribution

Feel free to contribute! Submit pull requests, report bugs, or suggest improvements.

## License

This project is licensed under the MIT License.
