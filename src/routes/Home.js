import React from "react";
import axios from "axios";
import Movie from "../components/Movie";
import "./Home.css"

const restoreMovie =[];
class Home extends React.Component{
  state = {
    isLoding: true,
    movies: []
  };
  getMovies = async () => {
    const {
      data: {
        data: {movies}
      }
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    movies.forEach(item =>{restoreMovie.push(item)});
    this.setState({movies, isLoding:false});
  };
  applyFilter = (genre) => {
    if (genre === "ALL") {
      return this.setState({movies:restoreMovie})
    };
    const filteredMovies = restoreMovie.filter((movie)=>{
      return movie.genres.indexOf(genre) >=0
    });
    this.setState({movies:filteredMovies})
  }

  componentDidMount(){
    this.getMovies();
  };
  render(){
    const {isLoding, movies} = this.state;
    const genres = ["ALL","Documentary", "Action", "Drama","Adventure", "Mystery","Comedy", "Musical", "Crime"]
    return (
    <section className="container">
      {isLoding ? (
      <div className="Loader">
        <span className="Loader_text">"Loading. . ."</span>
        </div>
        ) : (
          <div className="movies">
            <div className ="filters">
              {genres.map(genre => (
                <button className = "filterButton" onClick={()=> this.applyFilter(genre)}>{genre}</button>
              ))}
            </div>
            {movies.map(movie => (
              <Movie
              key={movie.id}
              id={movie.id}
              year={movie.year}
              title={movie.title}
              summary={movie.summary}
              poster={movie.medium_cover_image}
              genres={movie.genres}
              

              />
            ))}
          </div>
          )}
          </section>
        )
  }
}

export default Home;

