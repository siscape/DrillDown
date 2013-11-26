
<%@ page import="drilldown.Agency" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'agency.label', default: 'Agency')}" />
		<title><g:message code="default.show.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#show-agency" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="list" action="list"><g:message code="default.list.label" args="[entityName]" /></g:link></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="show-agency" class="content scaffold-show" role="main">
			<h1><g:message code="default.show.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<ol class="property-list agency">
			
				<g:if test="${agencyInstance?.agencyName}">
				<li class="fieldcontain">
					<span id="agencyName-label" class="property-label"><g:message code="agency.agencyName.label" default="Agency Name" /></span>
					
						<span class="property-value" aria-labelledby="agencyName-label"><g:fieldValue bean="${agencyInstance}" field="agencyName"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${agencyInstance?.cities}">
				<li class="fieldcontain">
					<span id="cities-label" class="property-label"><g:message code="agency.cities.label" default="Cities" /></span>
					
						<g:each in="${agencyInstance.cities}" var="c">
						<span class="property-value" aria-labelledby="cities-label"><g:link controller="city" action="show" id="${c.id}">${c?.encodeAsHTML()}</g:link></span>
						</g:each>
					
				</li>
				</g:if>
			
				<g:if test="${agencyInstance?.suppliers}">
				<li class="fieldcontain">
					<span id="suppliers-label" class="property-label"><g:message code="agency.suppliers.label" default="Suppliers" /></span>
					
						<g:each in="${agencyInstance.suppliers}" var="s">
						<span class="property-value" aria-labelledby="suppliers-label"><g:link controller="supplier" action="show" id="${s.id}">${s?.encodeAsHTML()}</g:link></span>
						</g:each>
					
				</li>
				</g:if>
			
			</ol>
			<g:form>
				<fieldset class="buttons">
					<g:hiddenField name="id" value="${agencyInstance?.id}" />
					<g:link class="edit" action="edit" id="${agencyInstance?.id}"><g:message code="default.button.edit.label" default="Edit" /></g:link>
					<g:actionSubmit class="delete" action="delete" value="${message(code: 'default.button.delete.label', default: 'Delete')}" onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
				</fieldset>
			</g:form>
		</div>
	</body>
</html>
