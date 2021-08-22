import Server from "./classes/server";
import mongoose from "mongoose";

import bodyParser from "body-parser";

import cors from "cors";
import RestaurantRoutes from "./routes/restaurant.routes";
import BookingsRouter from './routes/bookings.routes';
var cluster = require("cluster");

const server = Server.instance;

server.start(() => {
  console.log("servidor corriendo en el puerto " + server.port);
});

//preparar Informacion del posteo BodyParser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

//cors
server.app.use(cors());

//rutasDelBakcend
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

//rutas
server.app.use("/restaurant", RestaurantRoutes);
server.app.use("/booking", BookingsRouter);

//conexion BD
mongoose.connect(
  "mongodb://localhost:27017/PruebaPolymath",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Base de datos Online");
  }
);
