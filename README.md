# ROMI Calculator 🏛️

A beautiful, modern calculator web application that uses Roman numerals (ROMI) instead of regular numbers. Built with React and Vite for a fast, responsive experience.

## Features ✨

- **Roman Numeral Display**: All calculations displayed in authentic Roman numerals
- **Dual Input Methods**: 
  - Direct Roman symbol input (I, V, X, L, C, D, M)
  - Standard numeric input (0-9) with automatic Roman conversion
- **Basic Operations**: Addition (+), Subtraction (-), Multiplication (×), Division (÷)
- **Modern UI**: Beautiful gradient design with smooth animations
- **Real-time Conversion**: See both Roman and decimal values simultaneously
- **Range Support**: Handles values from I to MMMCMXCIX (1 to 3999)

## Getting Started 🚀

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

Create an optimized production build:
```bash
npm run build
```

The static files will be generated in the `dist/` folder.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## How to Use 📖

1. **Input Numbers**: 
   - Click Roman symbols (I, V, X, L, C, D, M) to build Roman numerals
   - Or use number buttons (0-9) for quick decimal input

2. **Perform Operations**:
   - Click an operation button (+, -, ×, ÷)
   - Enter the second number
   - Press = to see the result in Roman numerals

3. **Additional Functions**:
   - **AC**: Clear all and reset calculator
   - **+/-**: Toggle between positive and negative numbers

## Roman Numeral Reference 📚

| Symbol | Value |
|--------|-------|
| I      | 1     |
| V      | 5     |
| X      | 10    |
| L      | 50    |
| C      | 100   |
| D      | 500   |
| M      | 1000  |

### Common Examples:
- IV = 4
- IX = 9
- XL = 40
- XC = 90
- CD = 400
- CM = 900
- MCMXC = 1990
- MMXXIV = 2024

## Technology Stack 🛠️

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **CSS3** - Styling with gradients and animations
- **JavaScript ES6+** - Modern JavaScript features

## Project Structure 📁

```
/workspace/
├── src/
│   ├── components/
│   │   ├── Calculator.jsx      # Main calculator component
│   │   └── Calculator.css      # Calculator styles
│   ├── utils/
│   │   └── romanNumerals.js    # Roman numeral conversion utilities
│   └── main.jsx                # Application entry point
├── index.html                   # HTML template
├── vite.config.js              # Vite configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## Browser Support 🌐

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License 📄

MIT License - Feel free to use this project for learning or personal use.

## Contributing 🤝

Contributions, issues, and feature requests are welcome!

---

Made with ❤️ and Roman numerals
