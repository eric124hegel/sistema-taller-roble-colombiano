"""
Modelo de datos Material
Proyecto : Sistema de Gestion de Inventarios y Diseño Grafico - Taller del Roble Colombiano
Ruta     : backend/src/models/material.py
"""

class Material:
    # Representa un material del inventario del taller.

    def __init__(self, id_material=None, nombre_material="", tipo_material="", unidad_medida="", costo_unitario=0.0,
                 stock=0.0, stock_minimo=0.0, fecha_registro=None):
        
        self.id_material = id_material
        self.nombre_material = nombre_material
        self. tipo_material = tipo_material
        self.unidad_medida = unidad_medida
        self.costo_unitario = costo_unitario
        self.stock = stock
        self.stock_minimo = stock_minimo
        self.fecha_registro = fecha_registro
    
    def __str__(self):
        return (
        f"#{self.id_material} | {self.nombre_material} " 
        f"({self.tipo_material}) | Stock: {self.stock} {self.unidad_medida} " 
        f"|Costo: ${self.costo_unitario}"
        )