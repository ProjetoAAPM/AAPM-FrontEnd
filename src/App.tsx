import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<div>AAPM</div>}/>
                <Route path='*' element={<p>Página não encontrada</p>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;