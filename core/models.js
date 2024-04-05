import mongoose from "mongoose";
import { espacioSchema, tiempoSchema, vehiculoSchema } from "./schemas.js";

export const espacioModel = mongoose.model("Espacio", espacioSchema);
export const tiempoModel = mongoose.model("Tiempo", tiempoSchema);
export const vehiculoModel = mongoose.model("Vehiculo", vehiculoSchema);

