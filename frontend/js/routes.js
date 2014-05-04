(function Routes() {
    var router,
        routes = {
            '#/' : index,
            '#/:filename(/:section)' : showFile
        },
        APP = null;

    function InitRoutes() {
        initApp();
        for (var i in routes) {
            Path.map(i).to(routes[i]);
        }
        Path.rescue(function() {
            location.hash = '#/';
        });
        Path.root("#/");
        Path.listen();
    }

    function initApp(){
        APP = new App();
    }

    function index(){
        APP.showFirst();
    }

    function showFile(){
        var filename = this.params.filename,
            section = this.params.section;
        APP.show(filename, section);
    }

    window.InitRoutes = InitRoutes;
})();
