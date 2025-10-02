# Momentum - Anti Procrastinator App

![Momentum Logo](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTI5em1udW55cW5ubGYyMjI5ajJnMmd0cmkwMW85bHI0NzJma3BuaiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/2aZLNmCeHq29G/giphy.gif)

A web application designed to help users stop procrastinating by breaking down tasks into manageable steps.

## Features

- Break down tasks step-by-step
- Choose desired level of detail (single step, multiple steps, or comprehensive detailed breakdown)
- Edit and refine your action plan easily
- Clean, intuitive interface without distracting elements

## Tech Stack

- **Frontend**: React, Emotion (for styling), React Router
- **Backend**: Node.js, Express
- **AI Integration**: OpenAI API for intelligent task breakdown

## Installation

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- OpenAI API key

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd anti-procrastinator
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   Create a `.env` file in the root directory:

   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

   To get an OpenAI API key:

   - Visit [OpenAI's website](https://platform.openai.com/)
   - Sign up or log in to your account
   - Navigate to API Keys section
   - Create a new API key
   - Copy the key to your `.env` file

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Access the application**

   Open your browser and navigate to `http://localhost:5173`

### Project Structure

```
anti-procrastinator/
├── api/                 # API endpoints
│   ├── edit-plan.js     # Plan editing functionality
│   └── generate-plan.js # Plan generation with AI
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── styles/         # Global styles
│   └── assets/         # Static assets
├── public/             # Public assets
└── index.html          # Main HTML file
```

## Usage

1. Enter the task you need help getting started with
2. Specify when you want to begin
3. Add any additional information about challenges or constraints
4. Choose the desired level of detail for task breakdown:
   - **Single step**: Get one clear next action
   - **Multiple steps**: Get a basic breakdown
   - **Detailed**: Get a comprehensive action plan
5. Click "Generate plan" to get your personalized action plan
6. Use the editing feature if you need to refine or adjust the plan

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues

- **API errors**: Verify your OpenAI API key is correctly set in the `.env` file
- **Build failures**: Make sure all dependencies are installed with `npm install`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [OpenAI](https://openai.com/) for AI backend
- [React](https://reactjs.org/) and [Vite](https://vitejs.dev/) for frontend framework
- [Emotion](https://emotion.sh/) for styling solution
