ScrollReveal().reveal('.atmc-counter', {
	duration: 500,
	reset: false,
	afterReveal: atomic_counter
});

function atomic_counter(el) {
	var $this = $(el).find('.atmc-counter_number'),
			id = $this.attr('id');
			countTo = $this.attr('data-count');
	$({ countNum: $this.text()}).animate({
		countNum: countTo
	},
 {
		duration: 2000,
		easing:'linear',
		step: function() {
			$this.text(Math.floor(this.countNum));
		},
		complete: function() {
			$this.text(this.countNum);
			//alert('finished');
		}
	});
}
