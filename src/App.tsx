import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from "./pages/LandingPage";
import Novidades from "./pages/Novidades"
import Pagamento from "./pages/Pagamento"
import Login from "./pages/Login"
import Cadastro from "./pages/Cadastro"
import HomeAdmin from "./pages/admin/HomeAdmin";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage/>}/>
                <Route path='/novidades' element={<Novidades/>}/>
                <Route path='/pagamento' element={<Pagamento/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/cadastro' element={<Cadastro/>}/>
                <Route path='/admin' element={<HomeAdmin/>}/>
                <Route path='*' element={<p>Página não encontrada</p>}/>
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App;