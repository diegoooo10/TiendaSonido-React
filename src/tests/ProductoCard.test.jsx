
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProductoCard from '../components/ProductoCard'

const productoPrueba = {
  codigo: 'GA001',
  nombre: 'Guitarra Acustica Folk',
  descripcion: 'Guitarra para practicar y tocar en vivo.',
  precio: 129990,
  stock: 5,
  imagen: '/img/guitarra.jpg'
}

function renderProducto() {
  return render(
    <MemoryRouter>
      <ProductoCard producto={productoPrueba} />
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

  it('muestra el precio formateado en pesos chilenos', () => {
    renderProducto()

    expect(
      screen.getByText(/\$129\.990/)
    ).toBeTruthy()
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

    const enlace = screen.getByRole('button', {
      name: 'Ver detalle'
    })

    expect(enlace.tagName).toBe('A')
    expect(enlace.getAttribute('href')).toBe('/productos/GA001')
  })
})
