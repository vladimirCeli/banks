const { Router } = require("express");
const express = require("express");
const router = express.Router();

const conexion = require("../database/db");

router.get("/listclient", (req, res) => {
  conexion.query("SELECT * FROM clientes", (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render("listclient", { results: results });
    }
  });
});

//RUTA PARA CREAR REGISTROS DE CLIENTES
router.get("/createclient", (req, res) => {
  res.render("createclient");
});

//RUTA PARA EDITAR REGISTROS DE CLIENTES
router.get("/editclient/:id", (req, res) => {
  const id = req.params.id;
  conexion.query(
    "SELECT * FROM clientes WHERE id=?",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render("editclient", { nombre: results[0] });
      }
    }
  );
});

//RUTA PARA ELIMINAR REGISTRO CLIENTE
router.get("/deleteclient/:id", (req, res) => {
  const id = req.params.id;
  conexion.query(
    "DELETE FROM clientes WHERE id = ?",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.redirect("/listclient");
      }
    }
  );
});

const crudclient = require("../controllers/crudclient");

router.post("/saveclient", crudclient.saveclient);
router.post("/updateClient", crudclient.updateClient);
module.exports = router;
