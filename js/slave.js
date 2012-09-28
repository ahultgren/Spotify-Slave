function Slave(args){
	function Slave(args){
		var that = this;

		that.socket = args.Socket({
			io: args.io
		});
	}

	var slave = new Slave(args);
	return slave;
}

jQuery(function($){
	Slave({
		Socket = Socket,
		io: io
	});
});