import express from "express";
import { vehiculoModel } from "../core/models.js";

const router = express.Router();
const message = "Internal server error";

// obtener todos los vehiculos de la collection
router.get("/get_all", async (req, res) => {
  try {
    const vehiculos = await vehiculoModel.find({});
    const total_vehiculos = await vehiculoModel.countDocuments({});

    return res.json({ data: vehiculos, total: total_vehiculos });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ message });
  }
});

// obtener un solo vehiculo de la collection
router.get("/get/:id", async (req, res) => {
  try {
    const vehiculo = await vehiculoModel.findOne({ _id: req.params?.id });

    return res.json({ data: vehiculo });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ message });
  }
});

// crear un vehiculo
router.post("/create", async (req, res) => {
  try {
    const vehiculoData = req.body?.data;

    if (!vehiculoData) {
      return res.status(400).json({
        message: "Invalid data",
      });
    }

    const vehiculo = new vehiculoModel(vehiculoData);
    const savedvehiculo = await vehiculo.save();

    return res.status(201).json({ vehiculo: savedvehiculo });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ message });
  }
});

// eliminar un vehiculo
router.delete("/delete", async (req, res) => {
  try {
    const vehiculoDelete = req.body?.id;

    if (!vehiculoDelete) {
      return res.status(400).json({
        message: "Invalid data",
      });
    }

    const deletedvehiculo = await vehiculoModel.findOneAndDelete({
      _id: vehiculoDelete,
    });

    if (!deletedvehiculo) {
      return res.json({ message: "No se encontró" });
    }

    return res
      .status(201)
      .json({ vehiculo: deletedvehiculo, message: "Eliminado correctamente" });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ message });
  }
});

//actualizar un vehiculo
router.put("/update", async (req, res) => {
  try {
    const update = req.body?.data;
    const id = req.body?.id;

    if (!update || !id) {
      return res.status(400).json({
        message: "Invalid data",
      });
    }

    const updatedVehiculo = await vehiculoModel.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!updatedVehiculo) {
      return res.json({ message: "no se encontró" });
    }

    return res.status(201).json({
      vehiculo: updatedVehiculo,
      message: "Actualizado correctamente",
    });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ message });
  }
});

export default router;
