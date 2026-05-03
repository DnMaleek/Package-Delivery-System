const express = require("express")
const router = express.Router();
const {postDashboard,getDashboard,getParcels,postParcels,getAllparcels,getDrivers,postDrivers,getAlldrivers,editDriver,deleteDriver,getDispatch} = require("../controllers/adminControllers")

router.post("/dashboard",postDashboard);
router.get("/dashboard",getDashboard);
router.get("/parcels",getParcels);
router.post("/dashboard/parcels",postParcels);
router.get("/dashboard/getAllparcels",getAllparcels)
router.get("/drivers",getDrivers)
router.post("/dashboard/drivers",postDrivers);
router.get("/dashboard/getAlldrivers",getAlldrivers);
router.put("/dashboard/drivers/:id",editDriver);
router.delete("/dashboard/drivers/:pendingDeleteId",deleteDriver);
router.get("/dispatch",getDispatch);

module.exports = router;