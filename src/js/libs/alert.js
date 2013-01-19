(function($) {
	$.fn.alert = function(extend) {
		var that = this.first(),
			promise = $.Deferred();
			result = {
				confirmed: promise.promise()
			},
			settings = {
				text: '',
				yes: 'Yes',
				no: false
			},
			elem = $('<div>').addClass('alert'),
			button = $('<button>').addClass('sp-button');
		
		if( typeof extend === 'object' ){
			$.extend(settings, extend);
		}
		else {
			settings.text = arguments[0],
			settings.yes = arguments[1] || false,
			settings.no = arguments[2] || false
		}

		elem
			.append('<p>' + settings.text + '</p>')
			.append(button.clone().addClass('yes').text(settings.yes))
			.append(button.clone().addClass('no').text(settings.no))

			.on('click', '.yes', function () {
				elem.empty().remove();
				promise.resolve();
			})
			.on('click', '.no', function () {
				elem.empty().remove();
				promise.reject();
			})
			.prependTo(this);

		$.extend(result, this);

		return result;
	};
}(jQuery));