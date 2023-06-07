const { Router } = require("express");
const express = require("express");
const router = express.Router();

const conexion = require("../database/db");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/listbank", (req, res) => {
  conexion.query("SELECT * FROM bancos", (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render("listbank", { results: results });
    }
  });
});

//RUTA PARA CREAR RESGISTROS DE BANCOS
router.get("/createbank", (req, res) => {
  res.render("createbank");
});

//RUTAS PARA EDITAR RESGISTROS DE BANCOS
router.get("/editbank/:id", (req, res) => {
  const id = req.params.id;
  conexion.query("SELECT * FROM bancos WHERE id=?", [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render("editbank", { nombre: results[0] });
    }
  });
});

//RUTA PARA ELIMINAR REGISTRO BANCO
router.get("/deletebank/:id", (req, res) => {
  const id = req.params.id;
  conexion.query("DELETE FROM bancos WHERE id = ?", [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.redirect("/listbank");
    }
  });
});

const crud = require("../controllers/crud");

router.post("/save", crud.save);
router.post("/update", crud.update);
module.exports = router;
