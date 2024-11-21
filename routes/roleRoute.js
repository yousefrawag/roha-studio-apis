const express = require("express");
const {
  getAllRoles,
  getRoleById,
  addRole,
  updateRole,
  deleteRole,
  getRolesWithUserCounts,
  getUsersWithCertainRole,
} = require("../controller/roleController");
const validationResult = require("../middleware/validations/validatorResult");
const { insert, update } = require("../middleware/validations/roleValidator");
const authorizationMW = require("../middleware/authorizationMW");

const router = express.Router();

router.route("/getRolesWithUserCounts").get(  authorizationMW("canViewAdministration") , getRolesWithUserCounts);
router.route("/getUsersWithCertainRole/:id").get( authorizationMW("canViewAdministration"), getUsersWithCertainRole);
router
  .route("/")
  .get(
    getAllRoles)
  .post(
    authorizationMW("canAddAdministration"),
    insert,
    validationResult,
    addRole
  );

router
  .route("/:id")
  .put(
    authorizationMW("canEditAdministration"),
    update,
    validationResult,
    updateRole
  )
  .get(authorizationMW("canViewAdministration"), getRoleById)
  .delete(authorizationMW("canDeleteAdministration"), deleteRole);

module.exports = router;
