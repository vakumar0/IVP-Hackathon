var LeftMenu = function () {
    this.url = {
        LeftMenuHtml: 'html/core/leftMenu.html'
    }
}

LeftMenu.prototype.init = function () {
    this.loadLeftMenuHtml();
}

LeftMenu.prototype.loadLeftMenuHtml = function () {
    $.ajax({
        url: this.url.LeftMenuHtml, success: function (html) {
            $('#leftMenuMasterDiv').append(html);
            $('#leftMenuMasterDiv').mouseenter(function () {                
                //$('#leftMenuMasterDiv').animate({ width: '200px' });
                //setTimeout(function () {
                    $('#leftMenu #leftMenuHeader label').removeClass('hideLeftMenuLabels');
                    $('#moduleNames ul li label').removeClass('hideLeftMenuLabels');
                    $('#leftMenu #leftMenuFooter').removeClass('hideLeftMenuLabels');
                    $('#leftMenu #leftMenuRightArrow').removeClass('hideLeftMenuLabels');                    
                    $('#leftMenu #leftMenuHeader label').addClass('showLeftMenuLabels');
                    $('#moduleNames ul li label').addClass('showLeftMenuLabels');
                    $('#leftMenu #leftMenuFooter').addClass('showLeftMenuLabels');
                    $('#leftMenu #leftMenuRightArrow').addClass('showLeftMenuLabels');
                //}, 100)                
            });
            $('#leftMenuMasterDiv').mouseleave(function () {
              //  $('#leftMenuMasterDiv').animate({ width: '44px' });
                $('#leftMenu #leftMenuHeader label').removeClass('showLeftMenuLabels');
                $('#moduleNames ul li label').removeClass('showLeftMenuLabels');
                $('#leftMenu #leftMenuFooter').removeClass('showLeftMenuLabels');
                $('#leftMenu #leftMenuRightArrow').removeClass('showLeftMenuLabels');
                $('#moduleNames ul li label').addClass('hideLeftMenuLabels');
                $('#leftMenu #leftMenuHeader label').addClass('hideLeftMenuLabels');
                $('#leftMenu #leftMenuFooter').addClass('hideLeftMenuLabels');
                $('#leftMenu #leftMenuRightArrow').addClass('hideLeftMenuLabels');
            }); 
        }
    });
}

LeftMenu.prototype.hoverLeftMenu = function () {
    $('#moduleNames ul li label').addClass('')
}

const leftMenu = new LeftMenu();
leftMenu.init();