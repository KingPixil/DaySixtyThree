var elementWidth, elementHeight;
			var canvasWidth, canvasHeight;
			var elements = [];

			var mouseX, mouseY;

			var container = document.getElementById( 'container' );

			var isMouseDown, isEraseMode;

			var i = 0;

			init();
			createGrid();

			window.addEventListener( 'resize', onWindowResize, false );
			document.addEventListener( 'mousedown', onWindowMouseDown, false );
			document.addEventListener( 'mouseup', onWindowMouseUp, false );
			document.addEventListener( 'mousemove', onWindowMouseMove, false );
			document.addEventListener( 'keydown', onWindowKeyDown, false );
			document.addEventListener( 'keyup', onWindowKeyUp, false );

			function init() {

				while( i < 2 ) {

					elements[ i ] = document.createElement( 'input' );
					elements[ i ].type = 'checkbox';
					elements[ i ].addEventListener( 'click', function( event ) { event.preventDefault(); }, false );
					container.appendChild( elements[ i ] );
					i++;

				}

				elementOffsetTop = elements[ 0 ].offsetTop;

				elementWidth = elements[ 1 ].offsetLeft - elements[ 0 ].offsetLeft;
				elements[ 1 ].style.display = 'block';

				elementHeight = elements[ 1 ].offsetTop - elements[ 0 ].offsetTop;
				elements[ 1 ].style.display = 'inline';
			}

			function createGrid() {

				canvasWidth = Math.floor( window.innerWidth / elementWidth );
				canvasHeight = Math.floor( (window.innerHeight - elementOffsetTop) / elementHeight );

				if (elements.length < canvasWidth * canvasHeight) {

					while( i < canvasWidth * canvasHeight) {

						element = elements[i] = document.createElement( 'input' );
						element.type = 'checkbox';
						element.addEventListener( 'click', function( event ) { event.preventDefault(); }, false );
						container.appendChild( element );
						i++;

					}

				}

				if (window.location.hash) {

					drawImage();

				}
			}

			function onWindowMouseDown( event ) {

				event.preventDefault();
				event.stopPropagation();

				isMouseDown = true;

				mouseX = Math.floor( event.clientX / elementWidth );
				mouseY = Math.floor( ( event.clientY - elementOffsetTop ) / elementHeight );

				drawPixel( mouseX, mouseY, !isEraseMode );

			}

			function onWindowMouseUp( event ) {

				event.preventDefault();
				event.stopPropagation();

				isMouseDown = false;
				window.location.hash = hashGridSize() + ";" + hashData();

			}

			function onWindowMouseMove( event ) {

				if ( !isMouseDown ) {

					return;

				}

				mouseX = Math.floor( event.clientX / elementWidth );
				mouseY = Math.floor( ( event.clientY - elementOffsetTop ) / elementHeight );

				drawPixel( mouseX, mouseY, !isEraseMode );
			}

			function onWindowKeyDown( event ) {

				if ( event.keyCode == 16 ) { // Shift

					isEraseMode = true;

				}

			}

			function onWindowKeyUp( event ) {

				if ( event.keyCode == 16 ) { // Shift

					isEraseMode = false;

				}

			}

			function drawPixel(x, y, visible) {

				if (x + (y * canvasWidth) < elements.length) {

					elements[x + (y * canvasWidth)].checked = visible;

				}

			}

			function drawImage() {

				clear();

				var i = 0;

				var hash = window.location.hash.split( ';' );

				hash[ 0 ] = hash[ 0 ].substr( 1 );

				var drawingWidth = hash[ 0 ].split( ',' )[ 0 ];
				var drawingHeight = hash[ 0 ].split( ',' )[ 1 ];

				var offsetWidth = canvasWidth - drawingWidth;
				var offsetHeight = canvasHeight - drawingHeight;

				var value = hash[ 1 ] == '1';

				var data = hash[ 2 ].split( ',' );

				for ( var j = 0, jl = data.length; j < jl; j++ ) {

					for( var k = 0, kl = parseInt( data[ j ] ); k < kl; k++ ) {

						drawPixel( i % drawingWidth, Math.floor( i / drawingWidth ), value );
						i++;

					}

					value = !value;
				}
			}

			function onWindowResize() {

				createGrid();

			}

			function hashGridSize() {

				return canvasWidth + ',' + canvasHeight;

			}


