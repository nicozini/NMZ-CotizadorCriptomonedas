import styled from "@emotion/styled"

// STYLED COMPONENTS
const ResultadoCotizacion = styled.div`
    color: #fff;
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;
`

const Texto = styled.p`
    font-size: 18px;
    span {
        font-weight: 700;
    }
`

const Imagen = styled.img`
    display: block;
    width: 120px;
`

const Precio = styled.p`
    font-size: 20px;
    span {
        font-weight: 700;
    }
`


const Resultado = ({resultado}) => {

    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = resultado

    return (
        <ResultadoCotizacion>
            <Imagen src={`http://cryptocompare.com/${IMAGEURL}`} alt="Imagen Cripto" />
            <div>
                <Precio>Precio actual: <span>{PRICE}</span></Precio>
                <Texto>Precio más alto del día: <span>{HIGHDAY}</span></Texto>
                <Texto>Precio más bajo del día: <span>{LOWDAY}</span></Texto>
                <Texto>Variación últimas 24 hs: <span>{CHANGEPCT24HOUR * 100} %</span></Texto>
                <Texto>Última actualización: <span>{LASTUPDATE}</span></Texto>
            </div>
        </ResultadoCotizacion>
    )
}

export default Resultado