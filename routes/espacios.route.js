import express from "express";
import { espacioModel } from "../core/models.js";

const router = express.Router();
const message = "Internal server error";

// obtener todos los espacios de la collection
router.get("/get_all", async (req, res) => {
  try {
    const espacios = await espacioModel.find({});
    const total_espacios = await espacioModel.countDocuments({});

    return res.json({ data: espacios, total: total_espacios });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ message });
  }
});

// crear varios espacios al tiempo
router.post("/create", async (req, res) => {
  try {
    const espacios = req.body?.espacios;

    if (!Array.isArray(espacios) || espacios.length === 0) {
      return res.status(400).json({
        message: "Invalid espacios array",
      });
    }

    const savedEspacios = await Promise.all(
      espacios.map(async (espacioData) => {
        const espacio = new espacioModel(espacioData);
        return espacio.save();
      })
    );

    return res.status(201).json({ espacios: savedEspacios });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ message });
  }
});

// eliminar un espacio
router.delete("/delete", async (req, res) => {
  try {
    const espacioDelete = req.body?.id;

    if (!espacioDelete) {
      return res.status(400).json({
        message: "Invalid data",
      });
    }

    const deletedEspacio = await espacioModel.findOneAndDelete({
      _id: espacioDelete,
    });

    if (!deletedEspacio) {
      return res.json({ message: "No se encontró" });
    }

    return res
      .status(201)
      .json({ espacio: deletedEspacio, message: "Eliminado correctamente" });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ message });
  }
});

export default router;
