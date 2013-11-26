import groovy.sql.Sql

scriptEnv = "dev"
includeTargets << grailsScript("_GrailsInit")
includeTargets << grailsScript("_GrailsBootstrap")
target(main: "My Gant script") {
    depends(configureProxy, packageApp, classpath, loadApp, configureApp, compile, bootstrapOnce)

    for (grailsClass in grailsApp.allClasses) { println grailsClass }

    System.out.println("HI")
    def dataSource = appCtx.getBean('dataSource')
    def runQuery= {
        def sql = new Sql(dataSource)
        sql.eachRow("SELECT * from PURCHASE_ORDER_C") { row ->
            System.out.println(row.AGENCY_NAME)
            //grailsApp.getClassForName('drilldown.City').newInstance()
            def city = new drilldown.City(supplierCity: row.SUPPLIER_CITY)
                    .addToAgencies(new drilldown.Agency(agencyName: row.AGENCY_NAME)
                    .addToSuppliers(new drilldown.Supplier(supplierName: row.SUPPLIER_NAME,
                    supplierFullAddress: row.SUPPLIER_FULL_ADDRESS)
                    .addToPurchaseOrders(new drilldown.PurchaseOrder(poNumber: row.PO_NUMBER,
                    nigpDescription: row.NIGP_DESCRIPTION,
                    poTotalAmount: row.PO_TOTAL_AMOUNT)
            )
            )
            )
            println city.toString()

            if (!city.save(flush:true)) {
                city.errors.each {
                    println it
                }
            }

        }
        sql.close()
    }.call()

}
setDefaultTarget("main")