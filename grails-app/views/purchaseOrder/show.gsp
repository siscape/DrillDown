
<%@ page import="drilldown.PurchaseOrder" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'purchaseOrder.label', default: 'PurchaseOrder')}" />
		<title><g:message code="default.show.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#show-purchaseOrder" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="list" action="list"><g:message code="default.list.label" args="[entityName]" /></g:link></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="show-purchaseOrder" class="content scaffold-show" role="main">
			<h1><g:message code="default.show.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<ol class="property-list purchaseOrder">
			
				<g:if test="${purchaseOrderInstance?.nigpDescription}">
				<li class="fieldcontain">
					<span id="nigpDescription-label" class="property-label"><g:message code="purchaseOrder.nigpDescription.label" default="Nigp Description" /></span>
					
						<span class="property-value" aria-labelledby="nigpDescription-label"><g:fieldValue bean="${purchaseOrderInstance}" field="nigpDescription"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${purchaseOrderInstance?.poNumber}">
				<li class="fieldcontain">
					<span id="poNumber-label" class="property-label"><g:message code="purchaseOrder.poNumber.label" default="Po Number" /></span>
					
						<span class="property-value" aria-labelledby="poNumber-label"><g:fieldValue bean="${purchaseOrderInstance}" field="poNumber"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${purchaseOrderInstance?.poTotalAmount}">
				<li class="fieldcontain">
					<span id="poTotalAmount-label" class="property-label"><g:message code="purchaseOrder.poTotalAmount.label" default="Po Total Amount" /></span>
					
						<span class="property-value" aria-labelledby="poTotalAmount-label"><g:fieldValue bean="${purchaseOrderInstance}" field="poTotalAmount"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${purchaseOrderInstance?.supplier}">
				<li class="fieldcontain">
					<span id="supplier-label" class="property-label"><g:message code="purchaseOrder.supplier.label" default="Supplier" /></span>
					
						<span class="property-value" aria-labelledby="supplier-label"><g:link controller="supplier" action="show" id="${purchaseOrderInstance?.supplier?.id}">${purchaseOrderInstance?.supplier?.encodeAsHTML()}</g:link></span>
					
				</li>
				</g:if>
			
			</ol>
			<g:form>
				<fieldset class="buttons">
					<g:hiddenField name="id" value="${purchaseOrderInstance?.id}" />
					<g:link class="edit" action="edit" id="${purchaseOrderInstance?.id}"><g:message code="default.button.edit.label" default="Edit" /></g:link>
					<g:actionSubmit class="delete" action="delete" value="${message(code: 'default.button.delete.label', default: 'Delete')}" onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
				</fieldset>
			</g:form>
		</div>
	</body>
</html>
