import { Router } from "express";
import { Restaurants } from "../models/restaurant.models";

const RestaurantRoutes = Router();

RestaurantRoutes.post("/create", (req: any, res: any) => {
  //default 15 tables
  req.body.tables = [
    { name: "mesa 1" },
    { name: "mesa 2" },
    { name: "mesa 3" },
    { name: "mesa 4" },
    { name: "mesa 5" },
    { name: "mesa 6" },
    { name: "mesa 7" },
    { name: "mesa 8" },
    { name: "mesa 9" },
    { name: "mesa 10" },
    { name: "mesa 11" },
    { name: "mesa 12" },
    { name: "mesa 13" },
    { name: "mesa 14" },
    { name: "mesa 15" },
  ];
  Restaurants.create(req.body)
    .then((reservas) => {
      if (reservas) {
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
        ok: true,
        error: err,
      });
    });
});

RestaurantRoutes.get("/get", (req: any, res: any) => {
  Restaurants.find().then((restaurant: any) => {
    if (restaurant) {
      res.json({
        ok: true,
        restaurant,
      });
    } else {
      res.json({
        ok: false,
        restaurant: "None",
      });
    }
  });
});

RestaurantRoutes.post("/getByFirstLetter", (req: any, res: any) => {
  if (req.body.letter) {
    Restaurants.find({name:new RegExp("^"+req.body.letter)}).then((restaurant: any) => {
      if (restaurant) {
        res.json({
          ok: true,
          restaurant,
        });
      } else {
        res.json({
          ok: false,
          restaurant: "None",
        });
      }
    });
  }else{
    res.json({
        ok: false,
        restaurant: "Falto la letra",
      });
  }
});


RestaurantRoutes.post("/getByCountry", (req: any, res: any) => {
    if (req.body.country) {
      Restaurants.find({country:req.body.country}).then((restaurant: any) => {
        if (restaurant) {
          res.json({
            ok: true,
            restaurant,
          });
        } else {
          res.json({
            ok: false,
            restaurant: "None",
          });
        }
      });
    }else{
      res.json({
          ok: false,
          restaurant: "Falto la ciudad",
        });
    }
  });

export default RestaurantRoutes;
