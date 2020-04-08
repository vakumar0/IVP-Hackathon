var Core = function(moduleName) {
	this.moduleName = moduleName;
}

Core.prototype.init = function() {
    this.loadJs();
 //   this.createTabs(this.moduleName);
}

Core.prototype.loadJs = function(filePath) {
	filePath = 'js/module/dashboard/'
	var jsElm = document.createElement("script");
    jsElm.type = "application/javascript";
    jsElm.src = filePath + this.moduleName;
    document.body.appendChild(jsElm);
}

Core.prototype.createTabs = function (moduleName) {

}

const core = new Core('dashboard.pagescript.js');
core.init();