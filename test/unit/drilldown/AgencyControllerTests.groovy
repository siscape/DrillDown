package drilldown



import org.junit.*
import grails.test.mixin.*

@TestFor(AgencyController)
@Mock(Agency)
class AgencyControllerTests {

    def populateValidParams(params) {
        assert params != null
        // TODO: Populate valid properties like...
        //params["name"] = 'someValidName'
    }

    void testIndex() {
        controller.index()
        assert "/agency/list" == response.redirectedUrl
    }

    void testList() {

        def model = controller.list()

        assert model.agencyInstanceList.size() == 0
        assert model.agencyInstanceTotal == 0
    }

    void testCreate() {
        def model = controller.create()

        assert model.agencyInstance != null
    }

    void testSave() {
        controller.save()

        assert model.agencyInstance != null
        assert view == '/agency/create'

        response.reset()

        populateValidParams(params)
        controller.save()

        assert response.redirectedUrl == '/agency/show/1'
        assert controller.flash.message != null
        assert Agency.count() == 1
    }

    void testShow() {
        controller.show()

        assert flash.message != null
        assert response.redirectedUrl == '/agency/list'

        populateValidParams(params)
        def agency = new Agency(params)

        assert agency.save() != null

        params.id = agency.id

        def model = controller.show()

        assert model.agencyInstance == agency
    }

    void testEdit() {
        controller.edit()

        assert flash.message != null
        assert response.redirectedUrl == '/agency/list'

        populateValidParams(params)
        def agency = new Agency(params)

        assert agency.save() != null

        params.id = agency.id

        def model = controller.edit()

        assert model.agencyInstance == agency
    }

    void testUpdate() {
        controller.update()

        assert flash.message != null
        assert response.redirectedUrl == '/agency/list'

        response.reset()

        populateValidParams(params)
        def agency = new Agency(params)

        assert agency.save() != null

        // test invalid parameters in update
        params.id = agency.id
        //TODO: add invalid values to params object

        controller.update()

        assert view == "/agency/edit"
        assert model.agencyInstance != null

        agency.clearErrors()

        populateValidParams(params)
        controller.update()

        assert response.redirectedUrl == "/agency/show/$agency.id"
        assert flash.message != null

        //test outdated version number
        response.reset()
        agency.clearErrors()

        populateValidParams(params)
        params.id = agency.id
        params.version = -1
        controller.update()

        assert view == "/agency/edit"
        assert model.agencyInstance != null
        assert model.agencyInstance.errors.getFieldError('version')
        assert flash.message != null
    }

    void testDelete() {
        controller.delete()
        assert flash.message != null
        assert response.redirectedUrl == '/agency/list'

        response.reset()

        populateValidParams(params)
        def agency = new Agency(params)

        assert agency.save() != null
        assert Agency.count() == 1

        params.id = agency.id

        controller.delete()

        assert Agency.count() == 0
        assert Agency.get(agency.id) == null
        assert response.redirectedUrl == '/agency/list'
    }
}
