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
import EscolhaPlano from './pages/EscolhaPlano';


function App() {
    const location = useLocation();

    const esconderHeader = location.pathname === "/cadastro" || location.pathname === "/login" || location.pathname === "/escolhaplano";

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
                <Route path='/escolhaplano' element={<EscolhaPlano/>}/>
                <Route path="/admin" element={<Admin />}>
                    <Route index element={<LandingPage />} />
                    <Route path="home" element={<Home />} />
                    <Route path="usuario" element={<Home modoAdmin />} />
                </Route>
            </Routes>
            
            <Footer />
        </EditModeProvider>
    );
}

export default App;