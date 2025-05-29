# Developer Info

Name: Trongtrong Vanatharnkul

# Pokedex Viewer Application

A Pokedex Viewer Application built with React (Next.js), TypeScript.

## Features

- 📖 Pokedex viewer
- 🔍 Support sorting by both pokemonId and name
- 🐉 Display pokemon name and sprite
- 💻 Responsive design (except for very small screen size)

## Tech Stack

- **Frontend Framework**: React (Next.js) with TypeScript
- **State Management**: Redux Toolkit

## Getting Started

### Prerequisites

- Node.js 20.x (or later)
- npm 10.x (or later) or yarn or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/TrongtrongJ/pokedex-viewer.git
   cd pokedex-viewer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

# Details on AI Tools Used
- Claude to just get general ideas of how modern Redux had evolved, and some component styling, these are the exact prompts I gave:

> Could you help write example of a modern Redux pattern ? 
> Had it changed much in recent years ?

> Could you help write a React Boundery template, just styling, 
> I would like to write component logic by myself.

- I strictly used AI for examples only, <em>I have coded > 95% of this project manually</em>.

# Additional submissions
- My typescript utility examples of how I am generally throurough about type-safety.
- Pure scss no library.
- Modern Redux pattern like createSlice and createAsyncThunk.

# Bugs and features I haven't completed
- Make niche pokemon sprite (like regional form) display properly.
- No auto-redirect if the user navigates to a non-existing page.
- Paginated query, pokeapi don't support paginated search by name.
- Not yet pixel perfect, but pokemon tiles should display responsively as a bonus.
- Some type error from actions created with Redux createAsyncThunk.