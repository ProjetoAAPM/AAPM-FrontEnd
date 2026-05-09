import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Novidades from "./pages/Novidades";
import Pagamento from "./pages/Pagamento";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Admin from "./pages/admin";
import { EditModeProvider } from "./contexts/modo_editar";
import GlobalClickHandler from "./components/admin/GlobalClickHandler";
import EscolhaPlano from './pages/EscolhaPlano';
import { AuthProvider, useAuth } from "./contexts/admin/AuthContext";

function PrivateRoute({ children }: { children: React.ReactElement }) {
    const { isAdmin } = useAuth();
    return isAdmin ? children : <Navigate to="/login" replace />;
}

function App() {
    const location = useLocation();
    const rotasSemHeader = ["/cadastro", "/login", "/escolhaplano"];
    const esconderHeader = rotasSemHeader.includes(location.pathname);

    return (
        <AuthProvider>
            <EditModeProvider>
                <GlobalClickHandler />
                {!esconderHeader && <Header />}
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/novidades" element={<Novidades />} />
                    <Route path="/pagamento" element={<Pagamento />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/escolhaplano" element={<EscolhaPlano />} />
                    <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>}>
                        <Route index element={<LandingPage />} />
                        <Route path="home" element={<Home />} />
                        <Route path="usuario" element={<Home modoAdmin />} />
                        <Route path="novidades" element={<Novidades />} />
                        <Route path="pagamento" element={<Pagamento isAdmin />} />
                    </Route>
                </Routes>
                <Footer />
            </EditModeProvider>
        </AuthProvider>
    );
}

export default App;