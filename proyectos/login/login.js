const mysql = require('mysql');
const bcrypt = require('bcrypt');

// Configuración de la base de datos
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'oxhzxh',
  database: 'app_login',
};

// Crea una conexión a la base de datos
const connection = mysql.createConnection(dbConfig);

// Función principal
function main() {
  connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      return;
    }
    console.log('Conexión establecida con la base de datos');
  });
}

// Función para cerrar la conexión
function cerrarConexion() {
  connection.end((err) => {
    if (err) {
      console.error('Error al cerrar la conexión:', err);
    } else {
      console.log('Conexión cerrada correctamente');
    }
  });
}

// Función para iniciar sesión
function login(email, contrasena) {
  const sql = 'SELECT * FROM users WHERE email_user = ?';
  connection.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Error al realizar la consulta:', err);
      return false;
    }

    if (results.length > 0) {
      const hash = results[0].pass_user;
      if (bcrypt.compareSync(contrasena, hash)) {
        console.log('Inicio de sesión exitoso');
        return true; // La contraseña coincide, inicio de sesión exitoso
      }
    }
    console.log('Usuario o contraseña incorrectos');
    return false; // No se encontró el usuario o la contraseña no coincide
  });
}

// Función para registrar un nuevo usuario
function registrar(nombre, email, contrasena) {
  const emailExistsQuery = 'SELECT COUNT(*) AS num FROM users WHERE email_user = ?';
  connection.query(emailExistsQuery, [email], (err, results) => {
    if (err) {
      console.error('Error al verificar el email existente:', err);
      return false;
    }

    if (results[0].num > 0) {
      console.log('Ya existe un usuario con ese email');
      return false; // Ya existe un usuario con ese email
    }

    const hashedPassword = bcrypt.hashSync(contrasena, bcrypt.genSaltSync(10));

    const insertQuery = 'INSERT INTO users (name_user, email_user, pass_user) VALUES (?, ?, ?)';
    connection.query(insertQuery, [nombre, email, hashedPassword], (err) => {
      if (err) {
        console.error('Error al insertar el nuevo usuario:', err);
        return false;
      }
      console.log('Registro exitoso');
      return true; // Registro exitoso
    });
  });
}

// Llama a la función principal
main();

// Manejador del evento de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const contrasena = document.getElementById('contrasena').value;
  login(email, contrasena);
});

// Manejador del evento de registro
document.getElementById('registroForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const contrasena = document.getElementById('contrasena').value;
  registrar(nombre, email, contrasena);
});
