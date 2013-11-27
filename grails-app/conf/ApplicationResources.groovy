modules = {


    application {
        resource url:'js/application.js'
    }


    jqueryUi {
        dependsOn "jquery"
        // resource url: "js/explore-drilldown.js", disposition: 'head'

        resource url: "js/jquery-ui.js", disposition: 'head'
        //resource url: [plugin: "jquery-ui", dir: "css/jquery-ui-themes/smoothness", file: "jquery-ui.css"], disposition: 'head'
    }

    customSlider {
        dependsOn "jqueryUi"
        // resource url: "js/explore-drilldown.js", disposition: 'head'

        resource url: "js/custom-slider.js", disposition: 'head'
        resource url: [plugin: "customSlider", dir: "css", file: "custom-slider.css"], disposition: 'head'
        resource url:'images/bg-track.png', disposition:'inline'
        resource url:'images/volume.png', disposition:'inline'
        resource url:'images/handle.png', disposition:'inline'
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

    explore {
        dependsOn "jquery"
        resource url: "js/infinity.js", disposition: 'head'
        resource url: "js/drilldown/drilldown-util.js", disposition: 'head'
        resource url: "js/drilldown/drilldown-loader.js", disposition: 'head'
        resource url: "js/drilldown/drilldown.js", disposition: 'head'
        resource url: [plugin: "drilldown", dir: "css", file: "dcdrilldown.css"], disposition: 'head'
        resource url: [plugin: "drilldown", dir: "css/skins", file: "demo.css"], disposition: 'head'

    }

}
