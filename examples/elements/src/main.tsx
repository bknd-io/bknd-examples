import { ClientProvider } from "bknd/client";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Routes from "./routes";
import "bknd/dist/main.css"

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <ClientProvider>
         <Routes />
      </ClientProvider>
   </StrictMode>,
)
