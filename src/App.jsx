
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import BarraNavegacion from './components/Navbar'
import Productos from './pages/Productos'
import DetalleProducto from "./pages/DetalleProducto";
import Carrito from "./pages/Carrito";
import Categorias from "./pages/Categorias";
import DetalleCategoria from "./pages/DetalleCategoria";
import Ofertas from "./pages/Ofertas";
import Header from "./components/Header";

function Inicio() {
  return <h1 className="text-center mt-5">Bienvenido a Sonido Vivo</h1>
}




function Blog() {
  return <h1 className="text-center mt-5">Blog</h1>
}

function Contacto() {
  return <h1 className="text-center mt-5">Contacto</h1>
}


function Login() {
  return <h1 className="text-center mt-5">Iniciar sesión</h1>
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <BarraNavegacion />

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<h1 className="text-center mt-5">Bienvenido a Sonido Vivo</h1>} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:codigo" element={<DetalleProducto />} />
          <Route path="/categorias" element={<Categorias />} /> 
          <Route path="/categorias/:categoria" element={<DetalleCategoria />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1 className="text-center">Página no encontrada</h1>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
