const MediaType = {Episode:'episode', Movie:'movie', Series:'series'};
jQuery( document ).ready( function initialize()
{
  //$("#movieInfoBox").hide();
	jQuery( '#selectionButton' )
	.on( 'click', function movieProc( _evt )
	{
		let ajaxData = {apikey:'30700e4c', v:1, type:MediaType.Movie,};

		// Gather options.
    function makeid(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
   return result;
}
		let searchText = makeid(1);//jQuery('#searchText').val();

		ajaxData.y = jQuery('#searchYear').val();
		ajaxData.page = 1;
		if( searchText.length < 3 )
		{ajaxData.t = searchText;}
		else
		{ajaxData.s = searchText;}
		// ajaxData.i = 'tt3896198';

		// Get movies.
		jQuery.ajax( 'http://www.omdbapi.com/',
		{
			method:'GET',
			dataType:'json',
			data:ajaxData,
		})
		.then( function success( response )
		{
			// Omit ones with `Genre: "Adult"`...
			if( typeof( response ) === 'object' && response !== null )
			{
				if( 'Response' in response && response.Response === 'False' )
				{alert( response.Error );}
				else
				{
					// Multiple results.
					if( 'Search' in response && Array.isArray( response.Search ))
					{
						console.log( "Success!" );
						let formatted = response.Search
            /*
						.filter( function omitResults( filmSummary )
						{
							return !!filmSummary.Poster;
						})
						.map( function( filmSummary, f )
						{
							// each file: {Poster:"", Title:"", Type:"", Year:"", imdbID:""}
							return `${f + 1}. "${filmSummary.Title}"`;
						})
						.join( "\n" );
						alert( formatted );
            */
					}
					// One result.
					else
					{
						const filmDetail = response;
            /*console.log(filmDetail.imdbRating);
            if (filmDetail.imdbRating < 9)
              {
                console.log('oof');
                movieProc( _evt )
              }*/
						// response: {
						// 	Actors: ""
						// 	Awards: ""
						// 	BoxOffice: ""
						// 	Country: ""
						// 	DVD: "DD MMM YYYY"
						// 	Director: ""
						// 	Genre: ""
						// 	Language: ""
						// 	Metascore: ""
						// 	Plot: ""
						// 	Poster: ""
						// 	Production: ""
						// 	Rated: ""
						// 	Ratings: [{Source:"", Value:""}]
						// 	Released: "DD MMM YYYY"
						// 	Response: ""
						// 	Runtime: ""
						// 	Title: ""
						// 	Type: ""
						// 	Website: ""
						// 	Writer: ""
						// 	Year: ""
						// 	imdbID: ""
						// 	imdbRating: ""
						// 	imdbVotes: ""
						// }
						console.log( "Success!" );
						//alert( `Title: ${filmDetail.Title}\r\nPlot: ${filmDetail.Plot}` );
            displayMovieInfo();
            document.getElementById("movieInfoBox").style.display = "flex";
            function displayMovieInfo(){
                document.getElementById('moviePosterPlaceholder').src = filmDetail.Poster;
                document.getElementById('movieTitlePlaceholder').innerHTML = filmDetail.Title;
                document.getElementById('movieRatingPlaceholder').innerHTML = filmDetail.imdbRating;
                document.getElementById('movieBioPlaceholder').innerHTML = filmDetail.Plot;
            }
					}
				}
			}
			else
			{
				console.error( `Response could not be handled: '${response}'.` );
			}
		})
		.catch( function failure( exc )
		{
			console.error( "Failure: ", exc );
		});
	})
	jQuery( '#searchText' ).val( '' );
	jQuery( '#searchYear' ).val( 1996 );
	// Trigger query.
	//jQuery( '#selectionButton' ).on( 'click' );


});
