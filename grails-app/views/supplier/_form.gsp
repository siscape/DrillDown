<%@ page import="drilldown.Supplier" %>



<div class="fieldcontain ${hasErrors(bean: supplierInstance, field: 'agencies', 'error')} ">
	<label for="agencies">
		<g:message code="supplier.agencies.label" default="Agencies" />
		
	</label>
	
</div>

<div class="fieldcontain ${hasErrors(bean: supplierInstance, field: 'purchaseOrders', 'error')} ">
	<label for="purchaseOrders">
		<g:message code="supplier.purchaseOrders.label" default="Purchase Orders" />
		
	</label>
	
<ul class="one-to-many">
<g:each in="${supplierInstance?.purchaseOrders?}" var="p">
    <li><g:link controller="purchaseOrder" action="show" id="${p.id}">${p?.encodeAsHTML()}</g:link></li>
</g:each>
<li class="add">
<g:link controller="purchaseOrder" action="create" params="['supplier.id': supplierInstance?.id]">${message(code: 'default.add.label', args: [message(code: 'purchaseOrder.label', default: 'PurchaseOrder')])}</g:link>
</li>
</ul>

</div>

<div class="fieldcontain ${hasErrors(bean: supplierInstance, field: 'supplierFullAddress', 'error')} ">
	<label for="supplierFullAddress">
		<g:message code="supplier.supplierFullAddress.label" default="Supplier Full Address" />
		
	</label>
	<g:textField name="supplierFullAddress" value="${supplierInstance?.supplierFullAddress}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: supplierInstance, field: 'supplierName', 'error')} ">
	<label for="supplierName">
		<g:message code="supplier.supplierName.label" default="Supplier Name" />
		
	</label>
	<g:textField name="supplierName" value="${supplierInstance?.supplierName}"/>
</div>

