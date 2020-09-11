const MediaType = {Episode:'episode', Movie:'movie', Series:'series',};
jQuery( document ).ready( function initialize()
{
	jQuery( '#searchText, #searchYear' )
	.on( 'change', function( _evt )
	{
		let ajaxData = {apikey:'30700e4c', v:1, type:MediaType.Movie,};

		// Gather options.
		let searchText = jQuery('#searchText').val();
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
					}
					// One result.
					else
					{
						const filmDetail = response;
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
						alert( `"${filmDetail.Title}"` );
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
	jQuery( '#searchText' ).val( 'It' );
	jQuery( '#searchYear' ).val( 1996 );
	// Trigger query.
	jQuery( '#searchYear' ).trigger( 'change' );
});
