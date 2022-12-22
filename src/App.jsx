import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'
import ImagenCripto from './img/imagen-criptos.png'


// STYLED COMPONENTS
const Contenedor = styled.div`
  max-width: 900px;
  width: 90%;
  margin: 0 auto;
  
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`


function App() {

  const [monedas, setMonedas] = useState({})
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)


  useEffect(() => {    
    // Valido que el objeto este completo
    if (Object.keys(monedas).length > 0) {

      const cotizarCripto = async () => {
        setCargando(true) // Prendo Spinner
        setResultado({}) // Limpio resultado previo

        // Llamado API
        const { moneda, criptomoneda } = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`     

        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        setResultado(resultado.DISPLAY[criptomoneda][moneda]);

        setCargando(false) // Apago Spinner
      }

      cotizarCripto()
    }

  }, [monedas]);


  return (
    <div>
      <Contenedor>

        <Imagen 
          src={ImagenCripto}
          alt="Imágen Criptomonedas"
        />

        <div>
          <Heading>Cotizar Criptomonedas al Instante</Heading>

          <Formulario 
            setMonedas={setMonedas}
          />

          { cargando && <Spinner /> }
          { resultado.PRICE && <Resultado resultado={resultado} />}
        </div>

      </Contenedor>
    </div>

  )
}

export default App
