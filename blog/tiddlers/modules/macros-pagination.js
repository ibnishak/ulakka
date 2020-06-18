/*\
title: $:/tesseract/ulakka/macros/pagination.js
type: application/javascript
module-type: macro

Macro to return pagination DOMs

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */

exports.name = "pagination";

exports.params = [
   {name: "tot"},
	{name: "cur"}
];

exports.run = function(tot, cur) {

var ul = $tw.fakeDocument.createElement("ul");
var lowlimit = parseInt(cur) - 2;
if (lowlimit <= 0) {
   lowlimit =1;
}
var highlimit = parseInt(cur) + 2;
if (highlimit > tot){
   highlimit = tot;
}

var fli = $tw.fakeDocument.createElement('li');
var fa = $tw.fakeDocument.createElement("a");
fa.attributes.href = "index.html";
var fpagelink = $tw.fakeDocument.createTextNode("«");
fa.appendChild(fpagelink);
fli.appendChild(fa);
ul.appendChild(fli);

for (var i = lowlimit; i <= highlimit; i++) {
    var li = $tw.fakeDocument.createElement('li');
    var a = $tw.fakeDocument.createElement("a");
    if (i == 1) {
      a.attributes.href = "index.html"
    } else {
      var index = "index" + i + ".html";
      a.attributes.href = index;
   }
   if (i == cur) {
      a.className = "active"
   }

   var pagelink = $tw.fakeDocument.createTextNode(i);
   a.appendChild(pagelink);
   li.appendChild(a);
   ul.appendChild(li);
}

var lli = $tw.fakeDocument.createElement('li');
var la = $tw.fakeDocument.createElement("a");
la.attributes.href = "index"+tot+".html";
var lpagelink = $tw.fakeDocument.createTextNode("»");
la.appendChild(lpagelink);
lli.appendChild(la);
ul.appendChild(lli);

return ul.outerHTML;
};

})();
