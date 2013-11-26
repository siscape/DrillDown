package drilldown

import org.springframework.dao.DataIntegrityViolationException
import grails.converters.JSON

class CityController {

    //static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index() {
        redirect(action: "list", params: params)
    }

    def drilldown(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        [purchaseOrderInstanceList: PurchaseOrder.list(params), purchaseOrderInstanceTotal: PurchaseOrder.count()]
    }


    def returnJson() {
        def tripInterval = Integer.decode(params.max).intdiv(3);
        //def tripRemainder = Integer.decode(params.max).mod(3);
        def poMap = [:]
        def total = 0;
        params.sort = "supplierCity"
        def polist = ""
        if (params.rcount) {
            total = City.count();
        }
        City.list(params).eachWithIndex { City city, int i ->
            print city.supplierCity ?: "AA"
            polist += "<li class=\"dd-parent\" style=\"width: 958px;\">"
            polist += "<a class=\"dd-parent-a\" href=\"#\" id=\"" +("##CIT##"+city.id) + "\">" + (city.supplierCity ?: "-")
            polist += "<span class=\"dd-icon\"></span></a>"
            if (!city.agencies.isEmpty()) {
                polist += "<ul style=\"width: 958px; margin-right:-958px; margin-top: 0pt˝;\">"
                city.agencies.eachWithIndex { Agency agency, int a ->
                    print agency.agencyName ?: "AA"
                    if (!agency.suppliers.isEmpty()) {
                        polist += "<li class=\"dd-parent\" style=\"width: 958px;\">"
                        polist += "<a class=\"dd-parent-a\" href=\"#\" id=\"" +("##AGC##"+ agency.id) + "\">" + agency.agencyName
                        polist += "<span class=\"dd-icon\"></span></a>"
                        polist += "<ul style=\"width: 958px; margin-right:-958px; margin-top: 0pt˝;\">"

                        agency.suppliers.eachWithIndex { Supplier supplier, int s ->
                            print supplier.supplierName
                            if (s < 1) {

                                if (!supplier.purchaseOrders.isEmpty()) {
                                    polist += "<li class=\"dd-parent\" style=\"width: 958px;\">"
                                    polist += "<a class=\"dd-parent-a\" href=\"#\" id=\"" +("##SUP##"+supplier.id) + "\">" + supplier.supplierName
                                    polist += "<span class=\"dd-icon\"></span></a>"
                                    polist += "<ul style=\"width: 958px; margin-right:-958px; margin-top: 0pt˝;\">"

                                    supplier.purchaseOrders.eachWithIndex { PurchaseOrder po, int p ->
                                        print po.poNumber
                                        if (p < 1) {
                                            polist += "<li style=\"width: 958px;\">"
                                            polist += "<a class=\"dd-child-a\" href=\"#\" id=\"" + ("##POR##"+po.id) + "\">" + po.poNumber + "</a>"
                                            polist += "</li>"
                                        }
                                    }
                                    polist += "</ul>"
                                } else {
                                    polist += "<li style=\"width: 958px;\">"
                                    polist += "<a class=\"dd-child-a\" href=\"#\" id=\"" + supplier.id + "\">" + supplier.supplierName + "</a>"
                                }
                                polist += "</li>"
                            }
                        }
                        polist += "</ul>"
                    } else {

                        polist += "<li style=\"width: 958px;\">"
                        polist += "<a class=\"dd-child-a\" href=\"#\" id=\"" + agency.id + "\">" + (agency.agencyName ?: "-") + "</a>"
                    }
                    polist += "</li>"
                }
                polist += "</ul>"
            }
            polist += "</li>"
            //print i;
            switch (i) {
                case tripInterval:
                    poMap.put(1, polist);
                    polist = "";
                    break;
                case (tripInterval + tripInterval):
                    poMap.put(2, polist);
                    polist = "";
                    break;
                case Integer.decode(params.max) - 1:
                    poMap.put(3, polist);
                    polist = "";
                    break;
                default:
                    break;
            }
        }
        render([list1: poMap.get(1), list2: poMap.get(2), list3: poMap.get(3), total: total] as JSON)
    }

    def returnHTML() {
        params.sort = "supplierCity"
        def polist = ""


        City.list(params).eachWithIndex { City city, int i ->
            print city.supplierCity ?: "AA"
            polist += "<li class=\"dd-parent\" style=\"width: 958px;\">"
            polist += "<a class=\"dd-parent-a\" href=\"#\" id=\"" +("##CIT##"+city.id) + "\">" + (city.supplierCity ?: "-")
            polist += "<span class=\"dd-icon\"></span></a>"
            if (!city.agencies.isEmpty()) {
                polist += "<ul style=\"width: 958px; margin-right:-958px; margin-top: 0pt˝;\">"
                city.agencies.eachWithIndex { Agency agency, int a ->
                    print agency.agencyName ?: "AA"
                    if (!agency.suppliers.isEmpty()) {
                        polist += "<li class=\"dd-parent\" style=\"width: 958px;\">"
                        polist += "<a class=\"dd-parent-a\" href=\"#\" id=\"" +("##AGC##"+ agency.id) + "\">" + agency.agencyName
                        polist += "<span class=\"dd-icon\"></span></a>"
                        polist += "<ul style=\"width: 958px; margin-right:-958px; margin-top: 0pt˝;\">"

                        agency.suppliers.eachWithIndex { Supplier supplier, int s ->
                            print supplier.supplierName
                            if (s < 1) {

                                if (!supplier.purchaseOrders.isEmpty()) {
                                    polist += "<li class=\"dd-parent\" style=\"width: 958px;\">"
                                    polist += "<a class=\"dd-parent-a\" href=\"#\" id=\"" +("##SUP##"+supplier.id) + "\">" + supplier.supplierName
                                    polist += "<span class=\"dd-icon\"></span></a>"
                                    polist += "<ul style=\"width: 958px; margin-right:-958px; margin-top: 0pt˝;\">"

                                    supplier.purchaseOrders.eachWithIndex { PurchaseOrder po, int p ->
                                        print po.poNumber
                                        if (p < 1) {
                                            polist += "<li style=\"width: 958px;\">"
                                            polist += "<a class=\"dd-child-a\" href=\"#\" id=\"" + ("##POR##"+po.id) + "\">" + po.poNumber + "</a>"
                                            polist += "</li>"
                                        }
                                    }
                                    polist += "</ul>"
                                } else {
                                    polist += "<li style=\"width: 958px;\">"
                                    polist += "<a class=\"dd-child-a\" href=\"#\" id=\"" + supplier.id + "\">" + supplier.supplierName + "</a>"
                                }
                                polist += "</li>"
                            }
                        }
                        polist += "</ul>"
                    } else {

                        polist += "<li style=\"width: 958px;\">"
                        polist += "<a class=\"dd-child-a\" href=\"#\" id=\"" + agency.id + "\">" + (agency.agencyName ?: "-") + "</a>"
                    }
                    polist += "</li>"
                }
                polist += "</ul>"
            }
            polist += "</li>"
        }

        render {
            render(text: polist, contentType: "text/html", encoding: "UTF-8")
        }
    }

    def list(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        [cityInstanceList: City.list(params), cityInstanceTotal: City.count()]
    }

    def create() {
        [cityInstance: new City(params)]
    }

    def save() {
        def cityInstance = new City(params)
        if (!cityInstance.save(flush: true)) {
            render(view: "create", model: [cityInstance: cityInstance])
            return
        }

        flash.message = message(code: 'default.created.message', args: [message(code: 'city.label', default: 'City'), cityInstance.id])
        redirect(action: "show", id: cityInstance.id)
    }

    def show(Long id) {
        def cityInstance = City.get(id)
        if (!cityInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'city.label', default: 'City'), id])
            redirect(action: "list")
            return
        }

        [cityInstance: cityInstance]
    }

    def edit(Long id) {
        def cityInstance = City.get(id)
        if (!cityInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'city.label', default: 'City'), id])
            redirect(action: "list")
            return
        }

        [cityInstance: cityInstance]
    }

    def update(Long id, Long version) {
        def cityInstance = City.get(id)
        if (!cityInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'city.label', default: 'City'), id])
            redirect(action: "list")
            return
        }

        if (version != null) {
            if (cityInstance.version > version) {
                cityInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                        [message(code: 'city.label', default: 'City')] as Object[],
                        "Another user has updated this City while you were editing")
                render(view: "edit", model: [cityInstance: cityInstance])
                return
            }
        }

        cityInstance.properties = params

        if (!cityInstance.save(flush: true)) {
            render(view: "edit", model: [cityInstance: cityInstance])
            return
        }

        flash.message = message(code: 'default.updated.message', args: [message(code: 'city.label', default: 'City'), cityInstance.id])
        redirect(action: "show", id: cityInstance.id)
    }

    def delete(Long id) {
        def cityInstance = City.get(id)
        if (!cityInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'city.label', default: 'City'), id])
            redirect(action: "list")
            return
        }

        try {
            cityInstance.delete(flush: true)
            flash.message = message(code: 'default.deleted.message', args: [message(code: 'city.label', default: 'City'), id])
            redirect(action: "list")
        }
        catch (DataIntegrityViolationException e) {
            flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'city.label', default: 'City'), id])
            redirect(action: "show", id: id)
        }
    }
}
