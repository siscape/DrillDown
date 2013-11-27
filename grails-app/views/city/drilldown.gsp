<%--
  Created by IntelliJ IDEA.
  User: Sri
  Date: 11/15/13
  Time: 4:41 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page import="drilldown.City" %>
<html>
<head>
	<meta name="layout" content="main">
    <g:set var="entityName" value="${message(code: 'city.label', default: 'City')}" />
    <title><g:message code="default.list.label" args="[entityName]" /></title>

    <r:require modules="drilldown_list"/>
    <r:require modules="customSlider"/>
    <r:script>
        $(document).ready(function($){
           // volumeSlider();

            initData();

        });
    </r:script>
</head>
<body>

<p>
    <label for="amount">Volume:</label>
    <input type="text" id="amount" style="border: 0; color: #f6931f; font-weight: bold;" />
</p>
<div id="dd-wrapper-0" class="wrap">


          <div id="demo-container" style="overflow: hidden; width: 1060px;" class="demo-dd demo-container">
              <div style="float: left; width: 960px;">

                  <ul id="drilldown">

                    <li class="dd-parent" style="width: 958px;">
                        <a href="#" class="dd-parent-a">Products
                        <span class="dd-icon"></span>
                    </a>
                        <ul id="Products" style="width: 958px; margin-right:-958px; margin-top: 0pt;">
                            <li class="dd-parent" style="width: 958px;">
                                <a href="#" class="dd-parent-a" style="width: 958px;"></a>
                            </li>
                        </ul>


                    </li>

                </ul>
                  </div>
              <div id="day-selector" style="width: 100px; float: left;">
%{--
                  <div id='prev-day'>Previous</div>
--}%
                  <div id="slider" style="height: 400px; float: left;"></div>
%{--
                  <div id='next-day'>Next</div>
--}%

              </div>
              %{--<div id="day-selector" style="width: 100px; float: left;>
                  <span class="tooltip"></span> <!-- Tooltip -->
                  <div id="slider"></div> <!-- the Slider -->
                  <span class="volume"></span> <!-- Volume -->
              </div>--}%

        </div>


</div>


%{--
<div class="main-container">
    <h1>A very simple example of Infinity.js</h1>

            <div id='list-view'></div>
            <img src="http://airbnb.github.io/infinity/assets/images/icons/spinner.gif" class="spinner" alt="Loading...">
</div>
--}%

</body>
</html>