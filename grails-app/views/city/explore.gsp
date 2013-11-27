<%@ page import="drilldown.City" %>
<html>
<head>
    <meta name="layout" content="main">
    <g:set var="entityName" value="${message(code: 'city.label', default: 'City')}"/>
    <title><g:message code="default.list.label" args="[entityName]"/></title>

    <r:require modules="explore"/>
    <r:script>
        $(document).ready(function ($) {
            init();
        });
    </r:script>
</head>

<body>

<div id="dd-wrapper-0" class="wrap">
    <div id="demo-container" class="demo-dd demo-container">

        <ul id="drilldown">

            <li class="dd-parent" style="width: 958px;">
                <a href="#" class="dd-parent-a">Products
                    <span class="dd-icon"></span>
                </a>
                <ul style="width: 958px; margin-right:-958px; margin-top: 0pt;">
                    <div id="header" class="page">

                    </div>
                    <div id="page1" class="page">
                        <li class="dd-parent"><a href="#" class="dd-parent-a"></a></li>
                    </div>
                    <div id="page2" class="page">
                        <li class="dd-parent"><a href="#" class="dd-parent-a"></a></li>
                    </div>
                    <div id="page3"  class="page">
                        <li class="dd-parent"><a href="#" class="dd-parent-a"></a></li>
                    </div>
                    <div id="page4"  class="page">
                        <li class="dd-parent"><a href="#" class="dd-parent-a"></a></li>
                    </div>
                    <div id="page5"  class="page">
                        <li class="dd-parent"><a href="#" class="dd-parent-a"></a></li>
                    </div>
                    <div id="page6"  class="page">
                        <li class="dd-parent"><a href="#" class="dd-parent-a"></a></li>
                    </div>
                    <div id="page7"  class="page">
                        <li class="dd-parent"><a href="#" class="dd-parent-a"></a></li>
                    </div>
                    <div id="page8"  class="page">
                        <li class="dd-parent"><a href="#" class="dd-parent-a"></a></li>
                    </div>
                    <div id="page9"  class="page">
                        <li class="dd-parent"><a href="#" class="dd-parent-a"></a></li>
                    </div>
                    <div id="footer" class="page">

                    </div>
                </ul>

            </li>

        </ul>
    </div>

</div>
</body>
</html>