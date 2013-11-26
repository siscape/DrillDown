
<%@ page import="drilldown.Supplier" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'supplier.label', default: 'Supplier')}" />
		<title><g:message code="default.show.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#show-supplier" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="list" action="list"><g:message code="default.list.label" args="[entityName]" /></g:link></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="show-supplier" class="content scaffold-show" role="main">
			<h1><g:message code="default.show.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<ol class="property-list supplier">
			
				<g:if test="${supplierInstance?.agencies}">
				<li class="fieldcontain">
					<span id="agencies-label" class="property-label"><g:message code="supplier.agencies.label" default="Agencies" /></span>
					
						<g:each in="${supplierInstance.agencies}" var="a">
						<span class="property-value" aria-labelledby="agencies-label"><g:link controller="agency" action="show" id="${a.id}">${a?.encodeAsHTML()}</g:link></span>
						</g:each>
					
				</li>
				</g:if>
			
				<g:if test="${supplierInstance?.purchaseOrders}">
				<li class="fieldcontain">
					<span id="purchaseOrders-label" class="property-label"><g:message code="supplier.purchaseOrders.label" default="Purchase Orders" /></span>
					
						<g:each in="${supplierInstance.purchaseOrders}" var="p">
						<span class="property-value" aria-labelledby="purchaseOrders-label"><g:link controller="purchaseOrder" action="show" id="${p.id}">${p?.encodeAsHTML()}</g:link></span>
						</g:each>
					
				</li>
				</g:if>
			
				<g:if test="${supplierInstance?.supplierFullAddress}">
				<li class="fieldcontain">
					<span id="supplierFullAddress-label" class="property-label"><g:message code="supplier.supplierFullAddress.label" default="Supplier Full Address" /></span>
					
						<span class="property-value" aria-labelledby="supplierFullAddress-label"><g:fieldValue bean="${supplierInstance}" field="supplierFullAddress"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${supplierInstance?.supplierName}">
				<li class="fieldcontain">
					<span id="supplierName-label" class="property-label"><g:message code="supplier.supplierName.label" default="Supplier Name" /></span>
					
						<span class="property-value" aria-labelledby="supplierName-label"><g:fieldValue bean="${supplierInstance}" field="supplierName"/></span>
					
				</li>
				</g:if>
			
			</ol>
			<g:form>
				<fieldset class="buttons">
					<g:hiddenField name="id" value="${supplierInstance?.id}" />
					<g:link class="edit" action="edit" id="${supplierInstance?.id}"><g:message code="default.button.edit.label" default="Edit" /></g:link>
					<g:actionSubmit class="delete" action="delete" value="${message(code: 'default.button.delete.label', default: 'Delete')}" onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
				</fieldset>
			</g:form>
		</div>
	</body>
</html>
