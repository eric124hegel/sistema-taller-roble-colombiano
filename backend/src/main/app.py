"""
Programa principal de pruebas del CRUD de Material.
Proyecto : Sistema de Inventario - Taller del Roble Colombiano
Ruta     : backend/src/main/app.py
"""

from src.dao.material_dao import MaterialDAO
from src.models.material import Material

def probar_consultar(dao: MaterialDAO):
    print("\n--- PRUEBA: CONSULTAR TODOS LOS MATERIALES ---")
    for m in dao.consultar_materiales():
        print(m)

def probar_consultar_por_id(dao: MaterialDAO, id_material: int):
    print(f"\n--- PRUEBA: CONSULTAR MATERIAL POR ID # {id_material} ---")
    material = dao.consultar_material_por_id(id_material)
    if material:
        print(material)

def probar_insertar(dao: MaterialDAO):
    print("\n--- PRUEBA: INSERTAR MATERIAL ---")
    nuevo = Material (
        nombre_material = "Manija metalica",
        tipo_material = "Herraje",
        unidad_medida = "Unidad",
        costo_unitario = 4500.00,
        stock = 60.0,
        stock_minimo = 15.0,
    )
    dao.insertar_material(nuevo)
    materiales = dao.consultar_materiales()
    return materiales[-1].id_material if materiales else None

def probar_actualizar(dao: MaterialDAO, id_material: int):
    print(f"\n--- PRUEBA: ACTUALIZAR MATERIAL #{id_material} ---")
    material = dao.consultar_material_por_id(id_material)
    if material:
        material.stock = 55.0
        material.costo_unitario = 4800.00
        dao.actualizar_material(material)
        print(f"Estado despues de actualizar: {dao.consultar_material_por_id(id_material)}")

def probar_eliminar(dao: MaterialDAO, id_material: int):
    print(f"\n--- PRUEBA: ELIMINAR MATERIAL #{id_material} ---")
    dao.eliminar_material(id_material)
    if dao.consultar_material_por_id(id_material) is None:
        print("Verificado: El material ya no existe en la base de datos,")

if __name__ == "__main__":
    dao = MaterialDAO()
    id_generado = probar_insertar(dao)
    probar_consultar_por_id(dao, 1)
    probar_actualizar(dao, 3)
    probar_consultar(dao)
    probar_eliminar(dao, 5)
    print("\n--- CONSULTA FINAL (despues de eliminar) ---")
    probar_consultar(dao)