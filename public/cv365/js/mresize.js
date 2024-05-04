/* == mresize jQuery plugin == Version: 1.0.1, License: MIT License (MIT) */
!(function (i) {
	'function' == typeof define && define.amd
		? define(['jquery'], i)
		: 'object' == typeof exports
		? (module.exports = i)
		: i(jQuery)
})(function (i) {
	i.event.special.mresize = {
		add: function () {
			var e = i(this)
			e.data('mresize') ||
				('static' === e.css('position') && e.css('position', 'relative'),
				e
					.append(
						"<div class='resize' style='position:absolute; width:auto; height:auto; top:0; right:0; bottom:0; left:0; margin:0; padding:0; overflow:hidden; visibility:hidden; z-index:-1'><iframe style='width:100%; height:0; border:0; visibility:visible; margin:0' /><iframe style='width:0; height:100%; border:0; visibility:visible; margin:0' /></div>"
					)
					.data('mresize', {
						w: e.width(),
						h: e.height(),
						t: null,
						throttle: 100,
					})
					.find('.resize iframe')
					.each(function () {
						i(this.contentWindow || this).on('resize', function () {
							var i = e.data('mresize')
							;(i.w !== e.width() || i.h !== e.height()) &&
								(i.t && clearTimeout(i.t),
								(i.t = setTimeout(function () {
									e.triggerHandler('mresize'), (i.w = e.width()), (i.h = e.height())
								}, i.throttle)))
						})
					}))
		},
		remove: function () {
			i(this).removeData('mresize').find('.resize').remove()
		},
	}
})
