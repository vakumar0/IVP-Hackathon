var TabSchema = function () {
    this.tabsInfo = undefined;
}

TabSchema.prototype.init = function () {
    this.createTabSchema();
}

TabSchema.prototype.createTabSchema = function () {
    this.tabsInfo = {
        'dashboard': [
            {
                'id': 'dashboard',
                'text': 'Dashboard'
            }
        ]
    }
}

const tabSchema = new TabSchema();
tabSchema.init();