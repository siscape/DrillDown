
<%@ page import="drilldown.PurchaseOrder" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'purchaseOrder.label', default: 'PurchaseOrder')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#list-purchaseOrder" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="list-purchaseOrder" class="content scaffold-list" role="main">
			<h1><g:message code="default.list.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<table>
				<thead>
					<tr>
					
						<g:sortableColumn property="nigpDescription" title="${message(code: 'purchaseOrder.nigpDescription.label', default: 'Nigp Description')}" />
					
						<g:sortableColumn property="poNumber" title="${message(code: 'purchaseOrder.poNumber.label', default: 'Po Number')}" />
					
						<g:sortableColumn property="poTotalAmount" title="${message(code: 'purchaseOrder.poTotalAmount.label', default: 'Po Total Amount')}" />
					
						<th><g:message code="purchaseOrder.supplier.label" default="Supplier" /></th>
					
					</tr>
				</thead>
				<tbody>
				<g:each in="${purchaseOrderInstanceList}" status="i" var="purchaseOrderInstance">
					<tr class="${(i % 2) == 0 ? 'even' : 'odd'}">
					
						<td><g:link action="show" id="${purchaseOrderInstance.id}">${fieldValue(bean: purchaseOrderInstance, field: "nigpDescription")}</g:link></td>
					
						<td>${fieldValue(bean: purchaseOrderInstance, field: "poNumber")}</td>
					
						<td>${fieldValue(bean: purchaseOrderInstance, field: "poTotalAmount")}</td>
					
						<td>${fieldValue(bean: purchaseOrderInstance, field: "supplier")}</td>
					
					</tr>
				</g:each>
				</tbody>
			</table>
			<div class="pagination">
				<g:paginate total="${purchaseOrderInstanceTotal}" />
			</div>
		</div>
	</body>
</html>
