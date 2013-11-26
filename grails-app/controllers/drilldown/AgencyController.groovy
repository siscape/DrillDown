package drilldown

import org.springframework.dao.DataIntegrityViolationException

class AgencyController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index() {
        redirect(action: "list", params: params)
    }

    def list(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        [agencyInstanceList: Agency.list(params), agencyInstanceTotal: Agency.count()]
    }

    def create() {
        [agencyInstance: new Agency(params)]
    }

    def save() {
        def agencyInstance = new Agency(params)
        if (!agencyInstance.save(flush: true)) {
            render(view: "create", model: [agencyInstance: agencyInstance])
            return
        }

        flash.message = message(code: 'default.created.message', args: [message(code: 'agency.label', default: 'Agency'), agencyInstance.id])
        redirect(action: "show", id: agencyInstance.id)
    }

    def show(Long id) {
        def agencyInstance = Agency.get(id)
        if (!agencyInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'agency.label', default: 'Agency'), id])
            redirect(action: "list")
            return
        }

        [agencyInstance: agencyInstance]
    }

    def edit(Long id) {
        def agencyInstance = Agency.get(id)
        if (!agencyInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'agency.label', default: 'Agency'), id])
            redirect(action: "list")
            return
        }

        [agencyInstance: agencyInstance]
    }

    def update(Long id, Long version) {
        def agencyInstance = Agency.get(id)
        if (!agencyInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'agency.label', default: 'Agency'), id])
            redirect(action: "list")
            return
        }

        if (version != null) {
            if (agencyInstance.version > version) {
                agencyInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                          [message(code: 'agency.label', default: 'Agency')] as Object[],
                          "Another user has updated this Agency while you were editing")
                render(view: "edit", model: [agencyInstance: agencyInstance])
                return
            }
        }

        agencyInstance.properties = params

        if (!agencyInstance.save(flush: true)) {
            render(view: "edit", model: [agencyInstance: agencyInstance])
            return
        }

        flash.message = message(code: 'default.updated.message', args: [message(code: 'agency.label', default: 'Agency'), agencyInstance.id])
        redirect(action: "show", id: agencyInstance.id)
    }

    def delete(Long id) {
        def agencyInstance = Agency.get(id)
        if (!agencyInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'agency.label', default: 'Agency'), id])
            redirect(action: "list")
            return
        }

        try {
            agencyInstance.delete(flush: true)
            flash.message = message(code: 'default.deleted.message', args: [message(code: 'agency.label', default: 'Agency'), id])
            redirect(action: "list")
        }
        catch (DataIntegrityViolationException e) {
            flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'agency.label', default: 'Agency'), id])
            redirect(action: "show", id: id)
        }
    }
}
