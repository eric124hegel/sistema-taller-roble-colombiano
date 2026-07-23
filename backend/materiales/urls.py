"""
Enrutamiento del modulo Material
"""

from django.urls import path
from . import views

app_name = "materiales"

urlpatterns = [
    path("materiales/nuevo/", views.registrar_material, name="registrar"),
    path("materiales/", views.listar_materiales, name="lista"),
    path("materiales/confirmacion/", views.confirmacion_registro, name="confirmacion"),
]