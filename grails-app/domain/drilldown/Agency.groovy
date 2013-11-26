package drilldown

class Agency {
    String agencyName
    static hasMany = [suppliers: Supplier, cities:City]
    static belongsTo = City
    static constraints = {
    }
}
