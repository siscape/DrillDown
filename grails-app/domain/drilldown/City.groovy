package drilldown

class City {
    String supplierCity
    static hasMany = [agencies: Agency]
    static constraints = {
    }
}
