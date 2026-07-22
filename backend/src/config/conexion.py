"""
Modulo de conexion a la base de datos
Proyecto : Sistema de Gestion de Inventarios y Diseño Grafico - Taller del Roble Colombiano
Ruta     : backend/src/config/conexion.py
 
Equivalente en Python al patron de conexion JDBC de Java, usando el
driver oficial MySQL Connector/Python.
"""

import mysql.connector
from mysql.connector import Error

class Conexion:
    # Gestiona la conexion hacia la base de datos de MySQL del proyecto

    # Datos de conexion del proyecto
    HOST = "localhost"
    PUERTO = 3306
    BASE_DATOS = "mydb"
    USUARIO = "root"
    PASSWORD = "admin"

    @staticmethod
    def obtener_conexion():

        # Abre y retorna una nueva conexion a la base de datos
        try:
           conexion = mysql.connector.connect(
               host = Conexion.HOST,
               port = Conexion.PUERTO,
               database = Conexion.BASE_DATOS,
               user = Conexion.USUARIO,
               password = Conexion.PASSWORD,
           ) 

           if conexion.is_connected():
               print("Conexion exitosa")

               return conexion
        except Error as e:
            print(f"Error al conectar la base de datos: {e}")
            return None
    
    @staticmethod
    def cerrar_conexion(conexion):
        # Cierra la conexion si esta activa
        if conexion is not None and conexion.is_connected():
            conexion.close()
            print("Conexion cerrada correctamente.")

if __name__ == "__main__":
    conn = Conexion.obtener_conexion()
    Conexion.cerrar_conexion(conn)