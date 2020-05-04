import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header'
import Formulario from './components/Formulario'
import Clima from './components/Clima'
import Error from './components/Error'

function App() {


  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  });

  const { ciudad, pais } = busqueda;


  useEffect(() => {
    const fetchApi = async () => {
      if (consultar) {
        const solicitud = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=002b8159719336cd71d5f140c6df9688`);
        const resultado = await solicitud.json();
        guardarResultado(resultado);
        guardarConsultar(false);
        if (resultado.cod === "404") {
          guardarError(true);
        } else {
          guardarError(false);
        }
      }
    }
    fetchApi();
        // eslint-disable-next-line
  }, [consultar])


  let componente;
  if (error) {
    componente = <Error
      mensaje="No hay resultados"
    />
  } else {
    componente = <Clima
      resultado={resultado}
    />
  }

  return (
    <div className="App">
      <Fragment>
        <Header titulo="Weather" />
        <div className="contenedor-form">
          <div className="container">
            <div className="row">
              <div className="col m6 s12">
                <Formulario
                  busqueda={busqueda}
                  guardarBusqueda={guardarBusqueda}
                  guardarConsultar={guardarConsultar}
                />
              </div>
              <div className="col m6 s12">
                {componente}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </div>
  );
}

export default App;
