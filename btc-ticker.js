function tickerUpdate() {	
	$.getJSON('https://mtgox.com/api/1/BTCUSD/ticker', function(data){
		var last_price = data['return']['last']['display_short'].substr(1);
		var text = '1 BTC = ' + last_price + ' USD';
		if($('#btc-ticker').length == 0){
			$('<h1 id="btc-ticker">' + text + '</h1>').insertAfter($('.submit-text').parent())
		} else {
			$('#btc-ticker').text(text);
		}
	});
}
tickerUpdate();
setInterval(tickerUpdate, 10000);
