import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles.css'
import { SocketProvider } from './Context/SocketContext/SocketContext.tsx' // importerat socketProvider från socket context


ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <SocketProvider>
  <App />
  </SocketProvider>
   
)
