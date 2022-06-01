

document.querySelector('.button').addEventListener('click', getFetchUpdate);


document.querySelector('#refresh').addEventListener('click', getFetchUpdate);

function getFetch(){
  // const code = document.querySelector('input').value
  const url = `https://api.coinstats.app/public/v1/coins?skip=0&currency=USD`;

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data.coins);
        const coins = data.coins;
        if(!(coins == null)){
          let table = document.getElementById('coinTable');
          
          // Deletes Old Rows
          for(let i = 1; i < table.rows.length;){
            table.deleteRow(i);
          }

          for(let i in coins){
            
            
            if(coins[i].price > 0.009){
              // Row Creation methods
            let newRow = table.insertRow(-1);
            let newNCell = newRow.insertCell(0);
            let newSCell = newRow.insertCell(1);
            let newPCell = newRow.insertCell(2);
            let new24Cell = newRow.insertCell(3);
            let new7Cell = newRow.insertCell(4);
          
            // Input Name(N) and Price(P) input DOM methods
            let newNText = document.createTextNode(
              coins[i].name
            )
            let newSText = document.createTextNode(
              coins[i].symbol
            )
            let newPText = document.createTextNode(
              `$${coins[i].price.toFixed(2)}`
            )
            let new24Text = document.createTextNode(
              `${coins[i].priceChange1d}%`
            )
            let new7Text = document.createTextNode(
              `${coins[i].priceChange1w}%`
            )
            
            let dayChangeStatus24 = coins[i].priceChange1d > 0 ? 'positive' : 'negative';
            let dayChangeStatus7 = coins[i].priceChange1w > 0 ? 'positive' : 'negative';
            
            newNCell.appendChild(newNText);
            newSCell.appendChild(newSText);
            newPCell.appendChild(newPText);
            new24Cell.appendChild(new24Text);
            new7Cell.appendChild(new7Text);

            if (dayChangeStatus24 === 'positive') {
              new24Cell.classList.add('green');
             }
            if (dayChangeStatus24 === 'negative' || dayChangeStatus24 == undefined) {
              new24Cell.classList.add('red');
            }
            if (dayChangeStatus7 === 'positive') {
              new7Cell.classList.add('green');
             }
            if (dayChangeStatus7 === 'negative' || dayChangeStatus7 == undefined) {
              new7Cell.classList.add('red');
            }
          }
          }
        }
      })

      .catch(err => {
          console.log(`error ${err}`);
      });
}

function getFetchUpdate(){
  let table = document.getElementById('coinTable');
          
  // Deletes Old Rows
  for(let i = 1; i < table.rows.length;){
    table.deleteRow(i);
  }
  
  setTimeout(function() {
    
    getFetch()
  }, 1000);
}

window.onload = getFetch();


(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#page-wrapper'),
		$banner = $('#banner'),
		$header = $('#header');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-mobile');
		else {

			breakpoints.on('>medium', function() {
				$body.removeClass('is-mobile');
			});

			breakpoints.on('<=medium', function() {
				$body.addClass('is-mobile');
			});

		}

	// Scrolly.
		$('.scrolly')
			.scrolly({
				speed: 1500,
				offset: $header.outerHeight()
			});

	// Menu.
		$('#menu')
			.append('<a href="#menu" class="close"></a>')
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight() + 1,
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

})(jQuery);