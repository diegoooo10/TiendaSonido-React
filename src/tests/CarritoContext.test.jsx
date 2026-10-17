import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { CarritoProvider, useCarrito } from '../context/CarritoContext'

const guitarra = {
  codigo: 'GA001',
  nombre: 'Guitarra Acustica Folk',
  precio: 129990,
  stock: 3
}

const guitarraStockUno = {
  codigo: 'GA003',
  nombre: 'Guitarra con una unidad',
  precio: 89990,
  stock: 1
}

function CarritoPrueba() {
  const {
    carrito,
    agregarAlCarrito,
    actualizarCantidad,
    eliminarDelCarrito,
    totalUnidades,
    totalPrecio
  } = useCarrito()

  const cantidadGuitarra = carrito.find(
    (item) => item.codigo === 'GA001'
  )?.cantidad ?? 0

  return (
    <div>
      <p data-testid="unidades">{totalUnidades}</p>
      <p data-testid="total">{totalPrecio}</p>
      <p data-testid="cantidad">{cantidadGuitarra}</p>
      <p data-testid="productos-distintos">{carrito.length}</p>

      <button onClick={() => agregarAlCarrito(guitarra)}>
        Agregar guitarra
      </button>

      <button onClick={() => actualizarCantidad('GA001', 2)}>
        Cambiar cantidad a 2
      </button>

      <button onClick={() => eliminarDelCarrito('GA001')}>
        Eliminar guitarra
      </button>

      <button onClick={() => agregarAlCarrito(guitarraStockUno)}>
        Agregar guitarra stock uno
      </button>

      <button onClick={() => actualizarCantidad('GA003', 2)}>
        Superar stock disponible
      </button>
    </div>
  )
}

function renderCarrito() {
  return render(
    <CarritoProvider>
      <CarritoPrueba />
    </CarritoProvider>
  )
}

describe('CarritoContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    cleanup()
    localStorage.clear()
  })

  it('comienza con el carrito vacio', () => {
    renderCarrito()

    expect(screen.getByTestId('unidades').textContent).toBe('0')
    expect(screen.getByTestId('total').textContent).toBe('0')
    expect(screen.getByTestId('productos-distintos').textContent).toBe('0')
  })

  it('agrega un producto y calcula el total', () => {
    renderCarrito()

    fireEvent.click(screen.getByRole('button', { name: 'Agregar guitarra' }))

    expect(screen.getByTestId('unidades').textContent).toBe('1')
    expect(screen.getByTestId('total').textContent).toBe('129990')
    expect(screen.getByTestId('cantidad').textContent).toBe('1')
  })

  it('actualiza la cantidad y recalcula el total', () => {
    renderCarrito()

    fireEvent.click(screen.getByRole('button', { name: 'Agregar guitarra' }))
    fireEvent.click(screen.getByRole('button', { name: 'Cambiar cantidad a 2' }))

    expect(screen.getByTestId('cantidad').textContent).toBe('2')
    expect(screen.getByTestId('unidades').textContent).toBe('2')
    expect(screen.getByTestId('total').textContent).toBe('259980')
  })

  it('elimina un producto del carrito', () => {
    renderCarrito()

    fireEvent.click(screen.getByRole('button', { name: 'Agregar guitarra' }))
    fireEvent.click(screen.getByRole('button', { name: 'Eliminar guitarra' }))

    expect(screen.getByTestId('unidades').textContent).toBe('0')
    expect(screen.getByTestId('cantidad').textContent).toBe('0')
    expect(screen.getByTestId('total').textContent).toBe('0')
  })

  it('persiste los productos en localStorage', () => {
    renderCarrito()

    fireEvent.click(screen.getByRole('button', { name: 'Agregar guitarra' }))

    const guardado = JSON.parse(localStorage.getItem('carritoSonidoVivo'))

    expect(guardado).toHaveLength(1)
    expect(guardado[0].codigo).toBe('GA001')
    expect(guardado[0].cantidad).toBe(1)
  })

  it('rechaza superar el stock disponible', () => {
    renderCarrito()

    fireEvent.click(
      screen.getByRole('button', { name: 'Agregar guitarra stock uno' })
    )

    fireEvent.click(
      screen.getByRole('button', { name: 'Superar stock disponible' })
    )

    expect(screen.getByTestId('unidades').textContent).toBe('1')
    expect(screen.getByTestId('productos-distintos').textContent).toBe('1')
  })
})
