package drilldown

class PurchaseOrder {
    String poNumber
    String nigpDescription
    Integer poTotalAmount
    static belongsTo = [supplier: Supplier]
    static constraints = {
    }
}
