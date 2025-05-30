import React from 'react'
import { StatusDot } from '../components/StatusDot'
import {HeaderAdmin} from '../components/HeaderAdmin'
import {SideBar} from '../components/SideBar'

type Semielaborado = {
  id: number
  name: string
  cost: number
  available: boolean
}

export const Semielaborados: React.FC = () => {
  const data: Semielaborado[] = [
    { id: 1, name: 'Denominación', cost: 100, available: true },
    { id: 2, name: 'Denominación', cost: 100, available: true },
    { id: 3, name: 'Denominación', cost: 100, available: false },
    { id: 4, name: 'Denominación', cost: 100, available: true },
    { id: 5, name: 'Denominación', cost: 100, available: false },
    { id: 6, name: 'Denominación', cost: 100, available: true }
  ]

  return (
    <div className="flex min-h-screen">
      <SideBar />

      <div className="flex flex-col flex-1">
        <HeaderAdmin />

        <main className="p-6 flex-1 overflow-auto bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Semielaborados</h1>
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
              + Añadir
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-100 text-left text-sm">
                <tr>
                  <th className="px-4 py-2">Imagen</th>
                  <th className="px-4 py-2">Denominación</th>
                  <th className="px-4 py-2">Costo</th>
                  <th className="px-4 py-2">Disponibilidad</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className="border-t text-sm">
                    <td className="px-4 py-2">
                      <div className="w-8 h-8 rounded-full bg-gray-400" />
                    </td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">${item.cost}</td>
                    <td className="px-4 py-2">
                      <StatusDot available={item.available} />
                    </td>
                    <td className="px-4 py-2">
                      <button className="text-xl text-gray-600 hover:text-black">⋮</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end mt-4 text-sm text-gray-600">
              <span>1 - 6 de 25</span>
              <div className="ml-4 space-x-2">
                <button className="hover:underline">&lt;</button>
                <button className="hover:underline">&gt;</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
