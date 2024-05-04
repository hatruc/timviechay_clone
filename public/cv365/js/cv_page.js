var PagingSeparator = {
	px2mmConversionRatio: 0.264583333,
	pageHeight: 277.54,
	pageContentHeight: 0,
	printOptions: null,
	documentHeight: 0,
	documentContentHeight: 0,
	totalPages: 0,
	pages: [],
	init: function (t) {
		return (
			(this.printOptions = t.printOptions),
			(this.pageContentHeight =
				this.pageHeight - this.printOptions.margins.top - this.printOptions.margins.bottom),
			this.update(),
			this
		)
	},
	px2mm: function (t) {
		return t * this.px2mmConversionRatio
	},
	mm2px: function (t) {
		return t / this.px2mmConversionRatio
	},
	isReady: function () {
		return null != this.printOptions
	},
	update: function () {
		this.isReady(),
			(this.pages = []),
			(this.documentHeight = this.px2mm($('#form-cv').height())),
			(this.documentContentHeight =
				this.documentHeight - this.printOptions.margins.top - this.printOptions.margins.bottom),
			(this.totalPages = Math.ceil(this.documentContentHeight / this.pageContentHeight))
		for (var t = 1; t < this.totalPages; t++) {
			var i
			;(i =
				1 == t
					? this.pageContentHeight + this.printOptions.margins.top
					: this.pages[this.pages.length - 1] + this.pageContentHeight),
				this.pages.push(i)
		}
		return this
	},
	render: function () {
		if (!this.isReady()) return this
		for (this.update(), $('#form-cv .page_end').remove(), i = 0; i < this.pages.length; i++) {
			var t = this.pages[i],
				n = i + 2,
				e = $('#page_end')
					.clone()
					.attr('id', '')
					.css('top', t + 'mm')
			e
				.find('.paging-arrow')
				.text('Trang ' + n)
				.attr('title', 'Bắt đầu trang số ' + n)
				.hover(
					function () {
						$(this).parent().css('width', '100%')
					},
					function () {
						$(this).parent().css('width', '1px')
					}
				),
				e.appendTo($('#form-cv')).show()
		}
		return this
	},
}
