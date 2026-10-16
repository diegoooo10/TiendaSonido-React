
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
import Inicio from './pages/Inicio'
import Footer from './components/Footer'
import Nosotros from './pages/Nosotros'
import Contacto from './pages/Contacto'
import Blog from './pages/Blog'
import DetalleBlog from './pages/DetalleBlog'
import AdminProductos from './pages/AdminProductos'
import AdminUsuarios from './pages/AdminUsuarios'
import Checkout from './pages/Checkout'
import CompraExitosa from './pages/CompraExitosa'
import CompraFallida from './pages/CompraFallida'

function Login() {
  return <h1 className="text-center mt-5">Iniciar sesión</h1>
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <BarraNavegacion />

      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:codigo" element={<DetalleProducto />} />
          <Route path="/categorias" element={<Categorias />} /> 
          <Route path="/categorias/:categoria" element={<DetalleCategoria />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:articulo" element={<DetalleBlog />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path= "/nosotros" element={<Nosotros />} />          
          <Route path="*" element={<h1 className="text-center">Página no encontrada</h1>} />
          <Route path="/admin-productos" element={<AdminProductos />} />
          <Route path="/admin-usuarios" element={<AdminUsuarios />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/compra/exitosa" element={<CompraExitosa />} />
          <Route path="/compra/fallida" element={<CompraFallida />} />
        </Routes>
      </main>

       <Footer />
    </BrowserRouter>
  )
}

export default App
