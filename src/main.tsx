import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { store } from './store'

createRoot(document.getElementById('root')!).render(
        <Provider store={store}>
            <BrowserRouter>
                <ToastContainer />
                <App />
            </BrowserRouter>
        </Provider>
)
