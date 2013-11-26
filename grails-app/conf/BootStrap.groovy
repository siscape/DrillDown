import groovy.sql.Sql

class BootStrap {
   // def dataSource

    def init = { servletContext ->

        System.out.println("HI")
        /*try {
            def sql = new Sql(dataSource)
            sql.eachRow("SELECT * from PURCHASE_ORDER_C") { row ->
                System.out.println(row.AGENCY_NAME)
                //grailsApp.getClassForName('drilldown.City').newInstance()
                def city = drilldown.City.findOrSaveBySupplierCity(row.SUPPLIER_CITY)
                        .addToAgencies(drilldown.Agency.findOrSaveByAgencyName(row.AGENCY_NAME)
                        .addToSuppliers(drilldown.Supplier.findOrSaveBySupplierNameAndSupplierFullAddress(
                            row.SUPPLIER,
                            row.SUPPLIER_FULL_ADDRESS)
                        .addToPurchaseOrders(new drilldown.PurchaseOrder(poNumber: row.PO_NUMBER,
                        nigpDescription: row.NIGP_DESCRIPTION,
                        poTotalAmount: row.PO_TOTAL_AMOUNT)
                )
                )
                )

                if (!city.save(flush: true)) {
                    city.errors.each {
                        println it
                    }
                }
                println city.toString()


            }
            sql.close()
        } catch (e) {
            println "Error creating view: " + e
        }
*/
    }
    def destroy = {
    }
}
