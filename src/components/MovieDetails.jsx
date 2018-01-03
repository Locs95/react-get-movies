
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import App from '../App.js';
import axios from 'axios';

class MovieDetails extends Component {

	constructor(props) {
		super(props);
		this.state = {
			id: this.props.match.params.id,
			movie: ''
		};
	}
    
    componentDidMount() {
        
    	var api_movie = "https://api.themoviedb.org/3/movie/" + this.state.id + "/videos?api_key=38ba154e5240230789a406d6d21913e4&language=ru-RU";
    	var that = this;
    	axios.get(api_movie).then(function(response) {
    		// console.log(response.data.results);
    		 var key = response.data.results.map(function(item, i) {
    		 	  return item.key;
    		 });
    		 console.log(key[0]);
    		 if(key.length > 0) {
    		 	that.setState({
    		 	   movie: key[0]
    		    });
    		 }
    		 else {
    		 	that.setState({
    		 		movie: ''
    		 	});
    		 }
    		 
    	});
    }

	render() {
		return (
			<div className="MovieDetails row">
			  <div className="large-12 column">
			   <Link to="/" className="button default">Go back</Link>
			  </div>
			  <div className="large-12 column">
			   <div className="responsive-embed">
			   	  {
			   	  	 (this.state.movie !== '')
			   	  	 ? <iframe width="1024" height="315" src={"https://www.youtube.com/embed/" + this.state.movie} frameBorder="0" allowFullScreen></iframe>
			   	  	 : <div><h3 className="text-center">Trailer not found</h3></div>
			   	  }
			   </div>
			  </div>
			</div>
		)
	}
	
}

export default MovieDetails;