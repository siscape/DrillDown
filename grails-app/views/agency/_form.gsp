<%@ page import="drilldown.Agency" %>



<div class="fieldcontain ${hasErrors(bean: agencyInstance, field: 'agencyName', 'error')} ">
	<label for="agencyName">
		<g:message code="agency.agencyName.label" default="Agency Name" />
		
	</label>
	<g:textField name="agencyName" value="${agencyInstance?.agencyName}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: agencyInstance, field: 'cities', 'error')} ">
	<label for="cities">
		<g:message code="agency.cities.label" default="Cities" />
		
	</label>
	
</div>

<div class="fieldcontain ${hasErrors(bean: agencyInstance, field: 'suppliers', 'error')} ">
	<label for="suppliers">
		<g:message code="agency.suppliers.label" default="Suppliers" />
		
	</label>
	<g:select name="suppliers" from="${drilldown.Supplier.list()}" multiple="multiple" optionKey="id" size="5" value="${agencyInstance?.suppliers*.id}" class="many-to-many"/>
</div>

