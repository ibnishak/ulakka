/*\
title: $:/tesseract/ulakka/commands/renderblogindex.js
type: application/javascript
module-type: command

Render paginated index for ulakka blogs

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var widget = require("$:/core/modules/widgets/widget.js");

exports.info = {
	name: "renderblogindex",
	synchronous: true
};

var Command = function(params,commander,callback) {
	this.params = params;
	this.commander = commander;
	this.callback = callback;
};

Command.prototype.execute = function() {
	if(this.params.length < 1) {
		return "Missing tiddler filter";
	}
	var self = this,
		fs = require("fs"),
		path = require("path"),
		wiki = this.commander.wiki,
		posts = this.params[0],
		templateFilter = this.params[1],
		templates = wiki.filterTiddlers(templateFilter);


	$tw.utils.each(templates,function(title) {
		var tiddlers = $tw.wiki.filterTiddlers(posts);
		var indexpages = [], i = 0, n = tiddlers.length;
		while (i < n) {
			indexpages.push(tiddlers.slice(i, i += 10));
		}


		for (i = 0; i < indexpages.length; i++) { 
			var fname = "";
			if (i == 0) {
				fname = "index.html"
			} else {
				var n = i+1;
				fname = "index" + n + ".html";
			}
			var filename = path.resolve(self.commander.outputPath,fname)
			var tiddler = $tw.wiki.getTiddler(title);
			var newFields = {};
			newFields.list = indexpages[i];
			newFields.totalindexpages = indexpages.length;
			newFields.currentindexpage = i+1;
			$tw.wiki.addTiddler(new $tw.Tiddler(tiddler,newFields));

			var parser = wiki.parseTiddler(title),
				variables = {currentTiddler: title};
	
			var widgetNode = wiki.makeWidget(parser,{variables: variables}),
				container = $tw.fakeDocument.createElement("div");
			widgetNode.render(container,null);
			var text = container.textContent;
		
		
			if(self.commander.verbose) {
				console.log("Rendering \"" + title + "\" to \"" + filename + "\"");
			}
			$tw.utils.createFileDirectories(filename);
			fs.writeFileSync(filename,text,"utf8");
		}
	});

	return null;
};

exports.Command = Command;

})();
