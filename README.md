# ROMI Calculator

A React static calculator app that performs calculations using ROMI units instead of plain numbers.

## Features

- Standard calculator operations (addition, subtraction, multiplication, division)
- All values displayed with ROMI unit
- Modern, responsive UI with gradient background
- Clean button layout with visual feedback

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

The static files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

1. Click number buttons to input values
2. Select an operation (+, -, ×, ÷)
3. Enter the second value
4. Click equals (=) to see the result
5. All results are displayed with "ROMI" unit
6. Click "C" to clear and start over

## Technology Stack

- React 18
- Vite
- CSS3 (no external CSS frameworks)
