const router = require("express").Router();

//inport functionalityand hook up routes
const {
    getAllPizza,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
} = require("../../controllers/pizza-controllers");

//set up GET and POST at /api/pizzas
router
    .route("/")
    .get(getAllPizza)
    .post(createPizza);

//set up GET one, PUT and DELETE at /api/pizzas/:id
router
    .route("/:id")
    .get(getPizzaById)
    .put(updatePizza)
    .delete(deletePizza);

module.exports = router;