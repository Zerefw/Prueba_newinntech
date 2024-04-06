import mongoose from "mongoose";

export const espacioSchema = new mongoose.Schema({
  tipo_espacio: {
    type: String,
    require: true,
  },
  locacion: {
    type: Number,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const tiempoSchema = new mongoose.Schema({
  id_vehiculo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehiculo",
    require: true,
  },
  id_espacio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Espacio",
    require: true,
  },
  hora_entrada: {
    type: Date,
    default: Date.now,
  },
  hora_salida: {
    type: Date,
  },
});

export const vehiculoSchema = new mongoose.Schema({
  tipo: {
    type: String,
    require: true,
  },
  placa: {
    type: String,
    require: true,
  },
  color_vehiculo: {
    type: String,
    require: true,
  },
  marca_vehiculo: {
    type: String,
  },
  modelo: {
    type: Number,
  },
  tiene_soat: {
    type: Boolean,
    default: undefined,
  },
  tiene_tecno: {
    type: Boolean,
    default: undefined,
  },
  propietario: {
    type: String,
  },
  documento_propietario: {
    type: String,
  },
  cel_propietario: {
    type: Number,
  },
});