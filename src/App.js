import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MovieDetails from './components/MovieDetails.jsx';
import './App.css';
import axios from 'axios';
import '../node_modules/foundation-sites/css/foundation.min.css';
import '../node_modules/jquery/jquery.min.js';
import '../node_modules/foundation-sites/js/foundation.min.js';
// http://www.omdbapi.com/?i=tt3896198&apikey=f1b188b6
// http://www.omdbapi.com/?i=tt3896198&apikey=f1b188b6&s=300

//https://api.themoviedb.org/3/search/movie?api_key=38ba154e5240230789a406d6d21913e4&language=en-US&include_adult=false&query=200
//https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=38ba154e5240230789a406d6d21913e4&language=en-US

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
          query: '',
          movies: []
      };
    
      //this.getMovies = this.getMovies.bind(this);
  }



  componentDidMount() {

      if(JSON.parse(sessionStorage.getItem('movies'))) {

          this.setState({
              movies: JSON.parse(sessionStorage.getItem('movies'))
          });

      }
     
  }

  
  setQuery(e) {
     this.setState({
        query: e.target.value
     });
  }

  getMovies(e) {
     
     sessionStorage.clear();

     var that = this;
    // var re = /[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/;
     //var res = this.state.query.search(re);
     //console.log(res);
     //console.log(this.state.movies.length);
     //this.state.query.match(re)
     if(this.state.query !== '') {

         //var api_url = 'http://www.omdbapi.com/?v=1&type=movie&plot=full&i=tt3896198&apikey=f1b188b6&s=' + this.state.query;
         var api_url = 'https://api.themoviedb.org/3/search/movie?api_key=38ba154e5240230789a406d6d21913e4&language=ru-RU&include_adult=false&query=' + this.state.query;
         axios.get(api_url).then(function(response) {
          
             console.log(response.data.results);
             //var res = response.data.Response;
            // console.log(res);
             // if(res === 'True') {

                  sessionStorage.setItem('movies', JSON.stringify(response.data.results));
             //      that.setState({
             //          //movies: response.data.Search
             //          movies: response.data
             //      });
                 
             // }
             // else {
             //      that.setState({
             //         movies: []
             //      });
             // }
             that.setState({
                 movies: response.data.results
             });

         });
         console.log(this.state.movies);

     }
     else {
        this.setState({
            movies: []
        });
     }
     

  }

  render() {
    return (
        <div className="App">
         <div className="row">

          <div className="large-12  columns">
             <div className="input-group">
               <input className="input-group-field" onChange={ (event) => this.setQuery(event) } type="text"/>
               <div className="input-group-button">
                 <input type="button" className="button success" onClick={ (event) => this.getMovies() } value="search"/>
               </div>
             </div>
          </div>

          </div>


          <div className="row" data-equalizer>
            
              {
                
                  this.state.movies.map(function(item, i) {
                       return (

                            <div className="large-4 column" key={Math.random()}>
                               <div className="card" data-equalizer-watch>
                                 <Link to={"/"+item.id}>
                                  <img src={"http://image.tmdb.org/t/p/w185/" + item.poster_path} alt=""/>
                                 </Link>
                                  <div className="card-section">
                                    <h4>{ item.title }</h4>
                                  </div>
                                </div>
                            </div>
                        
                       )
                  })
             }
             
          </div>


        </div>
          
    );
  }
}

export default App;
