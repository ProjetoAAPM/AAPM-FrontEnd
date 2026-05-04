import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Novidades from "./pages/Novidades";
import Pagamento from "./pages/Pagamento";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Admin from "./pages/admin";
import { EditModeProvider } from "./context_admin/modo_editar";
import GlobalClickHandler from "./components/admin/GlobalClickHandler";

function App() {
    const location = useLocation();

    const esconderHeader = location.pathname === "/cadastro" || location.pathname === "/login";

    return (
        <EditModeProvider>
            <GlobalClickHandler />
            
            {!esconderHeader && <Header />}
            
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/home' element={<Home />} />
                <Route path='/novidades' element={<Novidades />} />
                <Route path='/pagamento' element={<Pagamento />} />
                <Route path='/login' element={<Login />} />
                <Route path='/cadastro' element={<Cadastro />} />
                <Route path='/admin' element={<Admin />} />
                
                {/* Rota para páginas não encontradas */}
                <Route path='*' element={<p>Página não encontrada</p>} />
            </Routes>
            
            <Footer />
        </EditModeProvider>
    );
}

export default App;