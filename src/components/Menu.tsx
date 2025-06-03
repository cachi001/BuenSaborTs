import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {CardMenu} from "../components/CardMenu";

const categorias = [
  { nombre: "Combos", imagen: "combo" },
  { nombre: "Hamburguesas", imagen: "hamburguesa" },
  { nombre: "Agregados", imagen: "agregados" },
  { nombre: "Papas", imagen: "papas" },
  { nombre: "Bebidas", imagen: "bebidas" },
  { nombre: "Cervezas", imagen: "cerveza" },
];

{/*TUVE UN PROBLEMA CON CARGAR LAS FOTOS DE LOS PRODUCTOS, NO ME SALIO JEJ*/}
const productos = {
  Combos: [...Array(6)].map(() => ({
    info: "Combo de hamburguesa con papas y bebida.",
    titulo: "COMBO PORKTOR",
    precio:"$15.000",
    imagen: "/assets/img/hamburguesaInfo.jpeg", 
  })),
  Hamburguesas: [...Array(6)].map(() => ({
    info: "Hamburguesa doble carne, cheddar, panceta.",
    titulo: "PORKTOR",
    precio:"$10.000",
    imagen: "hamburguesa",
  })),
  Agregados: [...Array(6)].map(() => ({
    info: "Aros de cebolla, nuggets, etc.",
    titulo: "NUGGETS",
    precio:"$6.000",
    imagen: "agregados",
  })),
  Papas: [...Array(6)].map(() => ({
    info: "Papas fritas crocantes con sal.",
    titulo: "PAPAS FRITAS",
    precio:"$5.000",
    imagen: "papas",
  })),
  Bebidas: [...Array(6)].map(() => ({
    info: "Gaseosa Coca-Cola 500cc.",
    titulo: "COCA COLA 500cc",
    precio:"$15.000",
    imagen: "bebidas",
  })),
  Cervezas: [...Array(6)].map(() => ({
    info: "Cerveza artesanal tirada 500cc.",
    titulo: "CERVEZA TIRADA",
    precio:"$15.000",
    imagen: "cerveza",
  })),
};

const Menu = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Combos");

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/img/fondoPrincipal.jpeg')" }}
    >
      <Header />

      {/* Filtros estilo barra visual */}
      <div className="mx-6 md:mx-20 flex flex-wrap justify-center gap-5 py-10 my-10 px-6 md:px-20 bg-white/90 backdrop-blur-md shadow-md rounded-xl">
        {categorias.map((categoria) => (
          <div
            key={categoria.nombre}
            onClick={() => setCategoriaSeleccionada(categoria.nombre)}
            className={`w-30 h-28 rounded-lg cursor-pointer flex flex-col items-center justify-center p-2 border transition-all ${
              categoriaSeleccionada === categoria.nombre
                ? "border-[#C68F4D] bg-zinc-800"
                : "border-transparent hover:bg-zinc-700"
            }`}
          >
            <img
              src={`/assets/img/${categoria.imagen}.jpeg`}
              alt={categoria.nombre}
              className="w-12 h-12 object-cover mb-2 rounded"
            />
            <span className="text-white text-xs text-center">
              {categoria.nombre.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      {/* Cards de productos */}
      <div className="mx-6 md:mx-20 flex flex-wrap justify-center gap-30 py-10 my-10 bg-white/90 backdrop-blur-md shadow-md rounded-xl">
        {/* {productos[categoriaSeleccionada].map((producto, index) => (
          <CardMenu
            key={index}
            info={producto.info}
            titulo={producto.titulo}
            precio={producto.precio}
            imagen={producto.imagen}
          />
        ))} */}
      </div>

      {/* Botón Ver más */}
      <div className="flex justify-center my-12">
        <button className="bg-[#C68F4D] text-white py-3 px-6 rounded-md text-lg hover:bg-[#aa743b] transition-all duration-300">
          Ver más
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Menu;
