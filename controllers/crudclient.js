const conexion = require("../database/db");
exports.saveclient = (req, res) => {
  const nombre = req.body.nombre;
  const cedula = req.body.cedula;
  const direccion = req.body.direccion;
  const telefono = req.body.telefono;
  conexion.query(
    "INSERT INTO clientes SET ?",
    {
      nombre: nombre,
      cedula: cedula,
      direccion: direccion,
      telefono: telefono,
    },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/listclient");
      }
    }
  );
};

exports.updateClient = (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const cedula = req.body.cedula;
  const direccion = req.body.direccion;
  const telefono = req.body.telefono;
  conexion.query(
    "UPDATE clientes SET ? WHERE id = ?",
    [
      {
        nombre: nombre,
        cedula: cedula,
        direccion: direccion,
        telefono: telefono,
      },
      id,
    ],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/listclient");
      }
    }
  );
};
