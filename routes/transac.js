const { Router } = require("express");
const express = require("express");
const router = express.Router();

const conexion = require("../database/db");

router.get("/listran", (req, res) => {
  conexion.query("SELECT * FROM transacciones", (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render("listran", { results: results });
    }
  });
});

router.get("/createtransac", (req, res) => {
  conexion.query("SELECT * FROM cuentas", (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render("createtransac", { results: results });
    }
  });
});

//RUTA PARA EDITAR REGISTROS DE CLIENTES
router.get("/edittransac/:id", (req, res) => {
  const id = req.params.id;
  conexion.query(
    "SELECT * FROM transacciones WHERE id=?",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        conexion.query("SELECT * FROM cuentas", (error, resul) => {
          if (error) {
            throw error;
          } else {
            res.render("edittransac", {
              tipoTransaccion: results[0],
              resul: resul,
            });
          }
        });
      }
    }
  );
});

//RUTA PARA ELIMINAR REGISTRO CLIENTE

router.get("/deletetransac/:id", (req, res) => {
  const id = req.params.id;
  conexion.query(
    "DELETE FROM transacciones WHERE id = ?",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.redirect("/listran");
      }
    }
  );
});

const crudtransac = require("../controllers/crudtransac");

router.post("/savetransac", crudtransac.savetransac);
router.post("/updatetransac", crudtransac.updatetransac);
module.exports = router;
