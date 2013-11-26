modules = {


    application {
        resource url:'js/application.js'
    }


    jqueryUi {
        dependsOn "jquery"
        // resource url: "js/explore-drilldown.js", disposition: 'head'

        resource url: "js/jquery-ui.js", disposition: 'head'
        resource url: [plugin: "jquery-ui", dir: "css/jquery-ui-themes/smoothness", file: "jquery-ui.css"], disposition: 'head'
    }
    drilldown {
        dependsOn "jqueryUi"
       // resource url: "js/explore-drilldown.js", disposition: 'head'

        resource url: "js/infinity.js", disposition: 'head'
        resource url: "js/jquery.dcdrilldown.1.2.js", disposition: 'head'




    }
    drilldown_list {
        dependsOn "drilldown"
        resource url: [plugin: "drilldown", dir: "css", file: "dcdrilldown.css"], disposition: 'head'
        resource url: [plugin: "drilldown", dir: "css/skins", file: "demo.css"], disposition: 'head'
    }

}
