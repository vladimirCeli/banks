const { Router } = require("express");
const express = require("express");
const router = express.Router();

const conexion = require("../database/db");

router.get("/listcount", (req, res) => {
  conexion.query("SELECT * FROM cuentas", (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render("listcount", { results: results });
    }
  });
});

router.get("/createcount", (req, res) => {
  conexion.query("SELECT * FROM bancos", (error, results) => {
    if (error) {
      throw error;
    } else {
      conexion.query("SELECT * FROM clientes", (error, resul) => {
        if (error) {
          throw error;
        } else {
          res.render("createcount", { results: results, resul: resul });
        }
      });
    }
  });
});

//RUTA PARA EDITAR REGISTROS DE CLIENTES
router.get("/editcount/:id", (req, res) => {
  const id = req.params.id;
  conexion.query("SELECT * FROM cuentas WHERE id=?", [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      conexion.query("SELECT * FROM bancos", (error, resul) => {
        if (error) {
          throw error;
        } else {
          conexion.query("SELECT * FROM clientes", (error, re) => {
            if (error) {
              throw error;
            } else {
              res.render("editcount", {
                propietario: results[0],
                resul: resul,
                re: re,
              });
            }
          });
        }
      });
    }
  });
});

//RUTA PARA ELIMINAR REGISTRO CLIENTE

router.get("/deletecount/:id", (req, res) => {
  const id = req.params.id;
  conexion.query("DELETE FROM cuentas WHERE id = ?", [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.redirect("/listcount");
    }
  });
});

const crudcount = require("../controllers/crudcount");
const { threadId } = require("../database/db");

router.post("/savecount", crudcount.savecount);
router.post("/updatecount", crudcount.updatecount);
module.exports = router;
