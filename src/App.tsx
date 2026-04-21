import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<div>AAPM</div>}/>
                <Route path='*' element={<p>Página não encontrada</p>}/>
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App;