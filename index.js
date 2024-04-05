import express from "express";
import mongoose from "mongoose";
import espacios from "./routes/espacios.route.js";
import tiempos from "./routes/tiempos.route.js";
import vehiculos from "./routes/vehiculos.route.js";

// Creamos las variables generales que usaremos
// ruta para la conexion a la db
const url = "mongodb://127.0.0.1/parqueadero";
// puerto por el que se va a ejecutar el servidor
const port = 3000;
// construye el servidor
const app = express();

// le decimos a express que va a usar formato json
app.use(express.json());

// ruta de bienvenida cuando ingresan a la raiz
app.get("/", (req, res) => {
  res.send("Bienvenido a mi parqueadero");
});

// rutas de espacios
app.use("/espacios", espacios);
// rutas de vehiculos
app.use("/vehiculos", vehiculos);
// rutas de tiempos
app.use("/tiempos", tiempos);

// conexion a la base de datos y si es exitosa, prende el servidor
mongoose
  .connect(url)
  .then(() => {
    console.info("Conexion exitosa");
    app.listen(port, () => {
      console.info(`Server listen on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
