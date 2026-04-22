import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from "./pages/LandingPage";
import Novidades from "./pages/Novidades";
import Pagamento from "./pages/Pagamento";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<LandingPage/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/novidades' element={<Novidades/>}/>
                <Route path='/pagamento' element={<Pagamento/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/cadastro' element={<Cadastro/>}/>
                <Route path='*' element={<p>Página não encontrada</p>}/>
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App;