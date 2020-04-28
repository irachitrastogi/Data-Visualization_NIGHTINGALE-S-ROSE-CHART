function draw()
		{
			var rose = Chart.rose(),
				height = 900,
				format = d3.time.format('%m/%Y'),
				causes = ['disease', 'wounds', 'other'],
				labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

			d3.select('body').append('h2')
				.attr('class', 'title')
				.html('Nightingale Rose');

			d3.select('body').append('h3')
				.attr('class', 'subtitle left')
				.html('April 1855 - March 1856');

			d3.select('body').append('h3')
				.attr('class', 'subtitle right')
				.html('April 1854 - March 1855');

			d3.json( 'data.json', function( data ) {
                console.log(data);
				var scalar;
				data.forEach( function(d) { 
					d.date = format.parse(d.date);
					d.label = labels[d.date.getMonth()];
					scalar = 1000*12 / d.army_size;
					d.disease = d.disease * scalar;
					d.wounds  = d.wounds  * scalar;
					d.other   = d.other   * scalar;
				} );

				var maxVal = d3.max( data, function(d) {
					return d3.max( [d.disease, d.wounds, d.other] );
				});

				var maxRadius = Math.sqrt(maxVal*12 / Math.PI);

				var dataset2 = data.slice(12,24),
					dataset1 = data.slice(0,12);
				
				figure = d3.select( 'body' )
					.append( 'figure' );

				width = parseInt( figure.style( 'width' ), 10 );

				rose.legend( causes )
					.width( width )
					.height( height )
					.delay( 0 )
					.duration( 500 )
					.domain( [0, maxRadius] )
					.angle( function(d) { return d.date.getMonth(); } )
					.area( function(d, i) { return [d.disease, d.wounds, d.other]; } );							

				figure.datum( dataset1 )
					.attr('class', 'chart figure1')
					.call( rose );	

				figure = d3.select( 'body' )
					.append( 'figure' );

				width = parseInt( figure.style( 'width' ), 10 );

				rose.width( width )
					.delay( 3000 );

				figure.datum( dataset2 )
					.attr('class', 'chart figure2')
					.call( rose );	
			});	
		}