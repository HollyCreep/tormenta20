import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './contexts/ThemeContext'
import { CharacterProvider } from './contexts/CharacterContext'
import { DiceProvider } from './contexts/DiceContext'
import { FeedbackProvider } from './components/ui/Feedback'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <FeedbackProvider>
        <CharacterProvider>
          <DiceProvider>
            <App />
          </DiceProvider>
        </CharacterProvider>
      </FeedbackProvider>
    </ThemeProvider>
  </StrictMode>,
)
