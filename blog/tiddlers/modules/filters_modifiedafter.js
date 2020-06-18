/*\
title: $:/tesseract/ulakka/filters/modifiedafter.js
type: application/javascript
module-type: filteroperator

Filter operator that selects tiddlers with a specified date field within a specified date interval.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Export our filter function
*/

exports.modifiedafter = function(source,operator,options) {
	var results = [],
		fdate = $tw.utils.parseDate(operator.operand);
		
	source(function(tiddler,title) {
		if(tiddler && tiddler.fields["modified"]) {
			var tdate = $tw.utils.parseDate(tiddler.fields["modified"]);
			if(tdate > fdate) {
				results.push(title);
			}
		}
	});
	return results;
};

})();
