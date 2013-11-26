<%@ page import="drilldown.PurchaseOrder" %>



<div class="fieldcontain ${hasErrors(bean: purchaseOrderInstance, field: 'nigpDescription', 'error')} ">
	<label for="nigpDescription">
		<g:message code="purchaseOrder.nigpDescription.label" default="Nigp Description" />
		
	</label>
	<g:textField name="nigpDescription" value="${purchaseOrderInstance?.nigpDescription}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: purchaseOrderInstance, field: 'poNumber', 'error')} ">
	<label for="poNumber">
		<g:message code="purchaseOrder.poNumber.label" default="Po Number" />
		
	</label>
	<g:textField name="poNumber" value="${purchaseOrderInstance?.poNumber}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: purchaseOrderInstance, field: 'poTotalAmount', 'error')} required">
	<label for="poTotalAmount">
		<g:message code="purchaseOrder.poTotalAmount.label" default="Po Total Amount" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="poTotalAmount" type="number" value="${purchaseOrderInstance.poTotalAmount}" required=""/>
</div>

<div class="fieldcontain ${hasErrors(bean: purchaseOrderInstance, field: 'supplier', 'error')} required">
	<label for="supplier">
		<g:message code="purchaseOrder.supplier.label" default="Supplier" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="supplier" name="supplier.id" from="${drilldown.Supplier.list()}" optionKey="id" required="" value="${purchaseOrderInstance?.supplier?.id}" class="many-to-one"/>
</div>

