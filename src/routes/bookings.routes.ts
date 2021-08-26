import { Router } from "express";
import { Bookings } from "../models/bookings.models";
import { Restaurants } from "../models/restaurant.models";

const BookingsRouter = Router();

BookingsRouter.get("/get", (req: any, res: any) => {
  Bookings.find().then((booking: any) => {
    if (booking) {
      res.json({
        ok: true,
        booking,
      });
    } else {
      res.json({
        ok: false,
        booking: "None",
      });
    }
  });
});

BookingsRouter.post("/create", (req: any, res: any) => {
  //default 15 tables
  var datetime = new Date();
  var continuar = true;
  var query1;
  var result1;
  datetime = Date.parse(req.body.date)
  Bookings.find({ date: datetime }).then((bookings) => {
    if (bookings.length <= 20) {
      Restaurants.findOne({ _id: req.body.restaurant_id }).then(
        async (restaurante: any) => {
          if (restaurante) {
            for await (const iterator of restaurante.tables) {
              console.log(iterator)
              if (continuar==true) {
                query1 = await Bookings.findOne({
                  table_id: iterator._id,
                  date: datetime,
                });
                if (query1) {
                  console.log("ocupado");
                } else {
                  console.log("ejecutando");
                  req.body.table_id = iterator._id;
                  req.body.date = datetime;
                  Bookings.create(req.body).then(booking=>{
                    if (booking) {
                      res.json({
                        ok: true,
                        error: "None",
                        booking
                      });
                    } 
                  })
                  continuar = false;
                }
              }
            }
            if (continuar) {
              res.json({
                ok: true,
                error: "restaurant is full"
              });
            }
          } else {
            res.json({
              ok: false,
              error: "restaurant not exist",
            });
          }
        }
      );
    } else {
      res.json({
        ok: false,
        error: "ya se alquilaron mas de 20 reservar en el dia",
      });
    }
  });
});

export default BookingsRouter;
