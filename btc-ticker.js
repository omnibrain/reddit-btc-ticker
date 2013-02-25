function currencyDropdown(){

  dropdown =
    ['<select id="currency-select">',
      '<option value="USD">USD</option>',
      '<option value="EUR">EUR</option>',
      '<option value="GBP">GBP</option>',
      '<option value="AUD">AUD</option>',
      '<option value="JPY">JPY</option>',
      '<option value="PLN">PLN</option>',
      '<option value="CAD">CAD</option>',
      '<option value="CHF">CHF</option>',
      '<option value="SEK">SEK</option>',
      '<option value="HKD">HKD</option>',
      '<option value="NZD">NZD</option>',
      '<option value="SGD">SGD</option>',
      '<option value="RUB">RUB</option>',
      '<option value="DKK">DKK</option>',
      '<option value="CNY">CNY</option>',
      '<option value="THB">THB</option>',
      '<select>'
      ].join('');

  $(dropdown).insertAfter($('#btc-ticker'))
    .val(localStorage['currency'])
    .change(function(){
      localStorage['currency'] = $(this).val();
      if($(this).val() != 'USD'){
        var url = 'http://rate-exchange.appspot.com/currency?from=USD&to=' + $(this).val();
        $.getJSON(url, function(data) {
            localStorage['multiplier'] = data['rate'];
            tickerUpdate();
          });
      } else {
        localStorage['multiplier'] = 1.0;
        tickerUpdate();
      }
    });
}

function tickerUpdate(currency) {

  var currency = localStorage['currency'];
  var multiplier = localStorage['multiplier'];
  currency = typeof currency !== 'undefinded' ? currency : 'USD';
  multiplier = typeof multiplier !== 'undefined' ? multiplier : 1.0;

  $.getJSON('https://mtgox.com/api/1/BTCUSD/ticker', function(data){

    var last_usd = Number(data['return']['last']['value']);
    var last_converted = (last_usd * multiplier).toFixed(2);

    var text = '1 BTC = ' + last_converted;
    if($('#btc-ticker').length == 0){
      $('<p id="btc-ticker">' + text + '</p>')
        .attr('style','font-size: 15px; display:inline; margin-right: 4px;')
        .wrap('<div></div>').insertAfter($('.submit-text').parent());
      currencyDropdown();
    } else {
      $('#btc-ticker').text(text);
    }
  });
}

tickerUpdate();
setInterval(tickerUpdate, 10000);

