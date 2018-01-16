(function() {
	var multiplex = Reveal.getConfig().multiplex;
	var socketId = multiplex.id;
	var socket = io.connect(multiplex.url);

	socket.on(multiplex.id, function(data) {
		console.log('Client received some data...', data);
		// ignore data from sockets that aren't ours
		if (data.socketId !== socketId) { return; }
		if( window.location.host === 'localhost:1947' ) return;

		console.log('Client Updated data... ', data);
		Reveal.setState(data.state);
	});
}());
