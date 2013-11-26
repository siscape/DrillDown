package drilldown

class Supplier {
    String supplierName
    String supplierFullAddress
    static hasMany = [purchaseOrders: PurchaseOrder, agencies:Agency]
    static belongsTo = Agency
    static constraints = {
    }
}
