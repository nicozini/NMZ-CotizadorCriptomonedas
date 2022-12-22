import { useState, useEffect } from 'react';
import styled from '@emotion/styled'
import Error from './Error'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas.js'

// STYLED COMPONENTS
const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover {
        cursor: pointer;
        background-color: #7a7dfe;
    }
`;




const Formulario = ({setMonedas}) => {
    // IMPORTANTE
    // Cuando hago destructuring de una array (NO DE UN OBJETO), el destructuring es por indice de array
    // Entonces para este caso le coloque moneda a lo que de useSelectMonedas.jsx retorne como state
    // Cuando hago destructuring de un objeto (NO DE UN ARRAY), el destructuring debe tener el mismo nombre

    const [ criptos, setCriptos ] = useState([])
    const [ error, setError ] = useState(false)

    const [ moneda, SelectMonedas ] = useSelectMonedas('Elegir Moneda', monedas)
    const [ criptomoneda, SelectCriptomoneda ] = useSelectMonedas('Elegir Criptomoneda', criptos)


    // useEffect para Fetch API
    useEffect(() => {
        const consultarAPI = async () => {
            const cantidadCriptos = 20;
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=${cantidadCriptos}&tsym=USD`

            try {
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()

                const arrayCriptos = resultado.Data.map( cripto => {
                    const objeto = {
                        id: cripto.CoinInfo.Name,
                        nombre: cripto.CoinInfo.FullName
                    }
                    return objeto
                })

                // Coloco el array en el State
                setCriptos(arrayCriptos);

            } catch (error) {
                console.log(error);
            }
        }

        return () => consultarAPI()
    }, []);


    const handleSubmit = e => {
        e.preventDefault();

        if ([moneda, criptomoneda].includes('')) {
            setError(true)
            return
        }

        // Pasó la validación
        setError(false)

        // Constucción de mi objeto
        setMonedas({
            moneda,
            criptomoneda
        })

    }

    return (
        <>
            { error && <Error>Todos los campos son obligatorios</Error>}

            <form
                onSubmit={handleSubmit}
            >
                <SelectMonedas />

                <SelectCriptomoneda />

                <InputSubmit
                    type="submit" 
                    value="Cotizar"
                />
            </form>  
        </>
    )
}

export default Formulario