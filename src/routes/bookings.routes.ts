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
  datetime = datetime.toISOString().slice(0, 10);
  Bookings.find({ date: datetime }).then((bookings) => {
    if (bookings.length <= 20) {
        Restaurants.findOne({"_id":req.body.restaurant_id}).then((restaurante:any)=>{
            if(restaurante){
                restaurante.tables.forEach(async element => {
                    if(continuar==true){
                        await Bookings.findOne({"table_id":element._id, "date":datetime}).then( book=>{
                            if(!book){
                                req.body.table_id=element._id;
                                req.body.date=datetime;
                                console.log(req.body);
                                continuar=false;
                                Bookings.create(req.body)
                                .then((booking) => {
                                  if (booking) {
                                    res.json({
                                      ok: true,
                                      error: "none",
                                    });
                                  } else {
                                    res.json({
                                      ok: true,
                                      error: "Unknown",
                                    });
                                  }
                                })
                                .catch((err) => {
                                  res.json({
                                    ok: false,
                                    error: err,
                                  });
                                });
                            }
                        })
                    }else{
                        res.json({
                            ok: false,
                            error: "restaurant full booking",
                          });
                    }
                });
      
            }else{
                res.json({
                    ok: false,
                    error: "restaurant not exist",
                  });
            }
        })
    } else {
      res.json({
        ok: false,
        error: "ya se alquilaron mas de 20 reservar en el dia",
      });
    }
  });

  

  
});

export default BookingsRouter;
