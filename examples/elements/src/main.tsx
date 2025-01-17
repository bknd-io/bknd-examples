import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Admin } from "bknd/ui";
import "bknd/dist/styles.css"

function App() {
   return <Admin withProvider />
}

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <App />
   </StrictMode>,
)
