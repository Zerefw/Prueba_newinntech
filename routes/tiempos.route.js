import express from "express";
import { tiempoModel } from "../core/models.js";

const router = express.Router();
const message = "Internal server error";

// obtener todos los tiempos de la collection
router.get("/get_all", async (req, res) => {
  try {
    const tiempos = await tiempoModel.find({});
    const total_tiempos = await tiempoModel.countDocuments({});

    return res.json({ data: tiempos, total: total_tiempos });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ message });
  }
});

// obtener un solo tiempo de la collection
router.get("/get/:id", async (req, res) => {
  try {
    const tiempo = await tiempoModel.findOne({ _id: req.params?.id });

    return res.json({ vehiculo: tiempo });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ message });
  }
});

// crear un tiempo
router.post("/create", async (req, res) => {
  try {
    const tiempoData = req.body?.data;

    if (!tiempoData) {
      return res.status(400).json({
        message: "Invalid data",
      });
    }

    const disponible = await tiempoModel.findOne({
      hora_salida: { $exists: false },
      id_espacio: { $eq: tiempoData.id_espacio },
    });

    if (!disponible) {
      const tiempo = new tiempoModel(tiempoData);
      const savedTiempo = await tiempo.save();
  
      return res.status(201).json({ tiempo: savedTiempo });
    }

    return res.json({ message: "Espacio no disponible" });

  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ message });
  }
});

// actualizar un tiempo
router.put("/update", async (req, res) => {
  try {
    const tiempoData = req.body?.data;

    if (!tiempoData || !tiempoData._id) {
      return res.status(400).json({
        message: "Invalid data",
      });
    }

    const updatedTiempo = await tiempoModel.findByIdAndUpdate(
      tiempoData._id,
      tiempoData,
      { new: true }
    );

    if (!updatedTiempo) {
      return res.json({ message: "No se encontró" });
    }

    return res
      .status(201)
      .json({ tiempo: updatedTiempo, message: "Actualizado correctamente" });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ message });
  }
});

export default router;
