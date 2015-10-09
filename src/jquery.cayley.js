/*!
 * jquery.cayley - A jquery plugin for generating cayley tables.
 * (c) 2015 Chris Tabor <dxdstudio@gmail.com>
 * <3
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function($, window, document, undefined) {
	var jq_cayley = {};
	jq_cayley = {
		defaults: {},
		init: function() {
			return this.generateTable(this.element, this.settings);
		},
		td: function(datum) {
			return '<td>' + datum + '</td>';
		},
		generateTable: function(options) {
			var el = this;
			var opts = $.extend({}, this.defaults, options);
			var values = opts.values;
			var operation = opts.operation;
			if(!operation) { operation = function(el1, el2) {return el1 + ' + ' + el2;};}
			var html = '';
			for(var row = 0; row < values.length; row++) {
				html += '<tr>';
				// Show first item like normal,
				// But shift by one inside of inner loop.
				// If top corner, make it blank.
				if(row === 0) {
					html += jq_cayley.td('');
				} else {
					html += jq_cayley.td(values[row]);
				}
				for(var col = 0; col < values.length; col++) {
					// Leave alone if top edge,
					// Otherwise do combination
					// top row, second to first and beyond
					if(row === 0 && col !== 0) {
						html += jq_cayley.td(values[col]);
					} else if(col !== 0) {
						// Allow arbitrary operations for customized tables
						html += jq_cayley.td(operation(values[row], values[col]));
					} else {}
				}
				html += '<tr>';
			}
			return $(el).html(html);
		}
	};
	$.fn.jq_cayley = jq_cayley.generateTable;
})(jQuery, window, document);
