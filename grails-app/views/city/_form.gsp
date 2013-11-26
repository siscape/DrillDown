<%@ page import="drilldown.City" %>



<div class="fieldcontain ${hasErrors(bean: cityInstance, field: 'agencies', 'error')} ">
	<label for="agencies">
		<g:message code="city.agencies.label" default="Agencies" />
		
	</label>
	<g:select name="agencies" from="${drilldown.Agency.list()}" multiple="multiple" optionKey="id" size="5" value="${cityInstance?.agencies*.id}" class="many-to-many"/>
</div>

<div class="fieldcontain ${hasErrors(bean: cityInstance, field: 'supplierCity', 'error')} ">
	<label for="supplierCity">
		<g:message code="city.supplierCity.label" default="Supplier City" />
		
	</label>
	<g:textField name="supplierCity" value="${cityInstance?.supplierCity}"/>
</div>

