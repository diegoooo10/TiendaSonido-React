import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProductoCard from '../components/ProductoCard'

const { agregarAlCarritoMock } = vi.hoisted(() => ({
  agregarAlCarritoMock: vi.fn()
}))

vi.mock('../context/CarritoContext', () => ({
  useCarrito: () => ({
    agregarAlCarrito: agregarAlCarritoMock
  })
}))

const productoPrueba = {
  codigo: 'GA001',
  nombre: 'Guitarra Acustica Folk',
  descripcion: 'Guitarra para practicar y tocar en vivo.',
  precio: 129990,
  stock: 5,
  imagen: '/img/guitarra.jpg'
}

function renderProducto(producto = productoPrueba) {
  return render(
    <MemoryRouter>
      <ProductoCard producto={producto} />
    </MemoryRouter>
  )
}

describe('ProductoCard', () => {
  it('muestra el nombre del producto', () => {
    renderProducto()

    expect(
      screen.getByText('Guitarra Acustica Folk')
    ).toBeTruthy()
  })

  it('muestra la descripcion del producto', () => {
    renderProducto()

    expect(
      screen.getByText('Guitarra para practicar y tocar en vivo.')
    ).toBeTruthy()
  })

  it('muestra el precio normal en pesos chilenos', () => {
    renderProducto()

    expect(
      screen.getByText('$129.990')
    ).toBeTruthy()
  })

  it('muestra el precio de oferta para MI001', () => {
    renderProducto({
      ...productoPrueba,
      codigo: 'MI001',
      nombre: 'Microfono Dinamico',
      precio: 149990
    })

    expect(screen.getByText('$149.990')).toBeTruthy()
    expect(screen.getByText('$129.990')).toBeTruthy()
    expect(screen.getByText('Oferta especial')).toBeTruthy()
  })

  it('muestra el stock disponible', () => {
    renderProducto()

    expect(
      screen.getByText('Stock disponible: 5')
    ).toBeTruthy()
  })

  it('muestra la imagen con su texto alternativo', () => {
    renderProducto()

    const imagen = screen.getByRole('img', {
      name: 'Guitarra Acustica Folk'
    })

    expect(imagen.getAttribute('src')).toBe('/img/guitarra.jpg')
  })

  it('incluye un enlace al detalle del producto', () => {
    renderProducto()

    const enlace = screen.getByRole('link', {
      name: 'Ver detalle de Guitarra Acustica Folk'
    })

    expect(enlace.getAttribute('href')).toBe('/productos/GA001')
  })

  it('agrega el producto al carrito al pulsar el boton', () => {
    agregarAlCarritoMock.mockClear()

    renderProducto()

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Agregar al carrito'
      })
    )

    expect(agregarAlCarritoMock).toHaveBeenCalledWith(productoPrueba)
  })

  it('deshabilita el boton cuando no hay stock', () => {
    renderProducto({
      ...productoPrueba,
      stock: 0
    })

    expect(
      screen.getByRole('button', {
        name: 'Sin stock'
      }).disabled
    ).toBe(true)
  })
})