var Tabs = function () {
    this.url = {
        TabsHtml: 'html/core/tabs.html'
    }
}

Tabs.prototype.init = function () {
    this.loadTabsHtml();
}

Tabs.prototype.loadTabsHtml = function () {
    $.ajax({
        url: this.url.TabsHtml, success: function (html) {
            $('#headerBody').append(html);
            Tabs.prototype.bindActionButtons();
        }
    });
}

Tabs.prototype.bindActionButtons = function () {
    $('#rightHeaders #rightFilterControl').unbind('click').bind('click', function () {
        Tabs.prototype.hideShowRightMenu();
    });
    $('.checkBoxClick').unbind('click').bind('click', function (event) {
        Tabs.prototype.checkBoxClick(event);
    });
    $('.rightFilterRadioClick').unbind('click').bind('click', function (event) {
        Tabs.prototype.rightFilterRadioClick(event);
    });
    $('#searchButton').unbind('click').bind('click', function (event) {
        var target = $(event.target);
        $('#coverAll').show();
        $('#searchBoxArea').show();
        //$('#contentBody').css({ 'opacity': '0.5' });
        //$('#leftMenuMasterDiv').css({ 'opacity': '0.5' });
    });

    $(document).mouseup(function (event) {
        var container = $("#searchBoxArea");
        if (!container.is(event.target) && container.has(event.target).length === 0) {
            container.hide();
            $('#coverAll').hide();
        }
    });

    $('#backArrow').unbind('click').bind('click', function (event) {
        var target = $(event.target);
        $('#coverAll').hide();
        $('#searchBoxArea').hide();
    });
}

Tabs.prototype.hideShowRightMenu = function () {
    if ($('#rightHeaders #rightFilterMenu').css('display') == 'block') {
        $('#rightHeaders #rightFilterMenu').slideUp();
        //$('#rightHeaders #rightFilterMenu').hide();
    } else {
        $('#rightHeaders #rightFilterMenu').slideDown();
        //$('#rightHeaders #rightFilterMenu').show();
    }
}

Tabs.prototype.checkBoxClick = function (event) {
    var $target = $(event.target);
    if ($target[0].firstElementChild.checked == true) {
        $target[0].firstElementChild.checked = false;
        $($target[0]).removeClass('checked');
    } else {
        $target[0].firstElementChild.checked = true;
        $($target[0]).addClass('checked');
    }
}

Tabs.prototype.rightFilterRadioClick = function (event) {
    var $target = $(event.target);
    $.each($target.parents()[0].children, function (key, value) {
        $(value).removeClass();
    });
    $target[0].firstElementChild.checked = true;
    $($target[0]).addClass('checked');
}

const tabs = new Tabs();
tabs.init();