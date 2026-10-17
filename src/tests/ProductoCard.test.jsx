import { afterEach, describe, it, expect, vi } from 'vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
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
  afterEach(() => {
    cleanup()
    agregarAlCarritoMock.mockClear()
  })

  it('muestra el nombre del producto', () => {
    renderProducto()

    expect(
      screen.getByText('Guitarra Acustica Folk')
    ).toBeTruthy()
  })

  it('muestra el precio normal en pesos chilenos', () => {
    renderProducto()

    expect(
      screen.getByText('$129.990')
    ).toBeTruthy()
  })

  it('agrega el producto al carrito al pulsar el boton', () => {
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
