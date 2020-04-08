var Header = function() {
	this.url = {
		headerHtml : 'html/core/header.html'
	}
}

Header.prototype.init = function(){
//	this.loadHeaderHtml();
}

Header.prototype.loadHeaderHtml = function(){
    $.ajax({
        url: this.url.headerHtml, success: function (html) {
            $('#MasterDiv').append(html);
        }
    });
}

const header = new Header();
header.init();