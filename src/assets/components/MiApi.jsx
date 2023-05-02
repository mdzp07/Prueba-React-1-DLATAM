import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../css/MiApi.css'

const MiApp = () => {

    const [peliculas, setPeliculas] = useState([]);
    const [busqueda, setBusqueda] = useState([]);

    useEffect(() => {
        apiResults();

    }, []);

    const apiResults = async () => {
        const url = "https://api.themoviedb.org/3/movie/now_playing?api_key=ff89b20f3f005d0d7c8f063014a8cc6b&language=es-ES&page=1";
        const response = await fetch(url)
        const data = await response.json()
        console.log(data.results);
        setPeliculas(data.results);
        setBusqueda(data.results);
    };


    const buscador = (e) => {
        e.preventDefault()
        if (e.target.value === "") {
            setPeliculas(busqueda)
        } else {
            let filtroPeliculas = busqueda.filter(p => p.original_title.toLowerCase().includes(e.target.value.toLowerCase()));
            setPeliculas(filtroPeliculas);
        }
    }

    const ordenPopularidad = () => {
        const orden = [...peliculas]
        orden.reverse();
        setPeliculas(orden);
    }

    return (

        <div>
            <div className='Buscador'>
                <input type="text" placeholder="Buscar pelicula" onChange={buscador} />
                <div>
                    <Button variant="secondary" onClick={ordenPopularidad}>Popularidad 🔽🔼 </Button>
                </div>

            </div>
            <div className='conte*nedorPrincipal'>
                {peliculas.map((elemento) =>
                    <Card key={elemento.id} className='cardPelicula'>
                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${elemento.poster_path}`} />
                        <Card.Body>
                            <Card.Title>{elemento.original_title}</Card.Title>
                            <Card.Text>
                                {elemento.overview}
                            </Card.Text>
                            <Button variant="info">Ver película</Button>

                        </Card.Body>
                        <Card.Footer className="text-muted">😍 Popularidad: {elemento.popularity}</Card.Footer>
                    </Card>
                )}
            </div>
        </div>);

}




export default MiApp;