import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from "./pages/LandingPage";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<LandingPage/>}/>
                <Route path='*' element={<p>Página não encontrada</p>}/>
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App;