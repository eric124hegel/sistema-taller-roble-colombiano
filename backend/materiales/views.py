"""
Vistas del modulo Material.
Ruta: backend/materiales/views.py
"""


from django.shortcuts import render, redirect
from src.dao.material_dao import MaterialDAO
from src.models.material import Material

dao = MaterialDAO()

# Create your views here.
def registrar_material(request):
    """
    GET -> muestra el formulario vacio
    POST -> procesa los datos enviados
    """

    # Metodo GET
    if request.method == "GET":
        return render(request, "materiales/formulario.html")

    # Metodo POST
    if request.method == "POST":
        nombre_material = request.POST.get("nombre_material")
        tipo_material = request.POST.get("tipo_material")
        unidad_medida = request.POST.get("unidad_medida")
        costo_unitario = request.POST.get("costo_unitario")
        stock = request.POST.get("stock")
        stock_minimo = request.POST.get("stock_minimo")

        # Validacion basica antes de conectar con la base de datos
        if not nombre_material or not tipo_material:
            return render(request, "materiales/formulario.html", {
                "error": "El nombre y tipo de material son obligatorios."
            })

        try:
            nuevo_material = Material(
                nombre_material=nombre_material,
                tipo_material=tipo_material,
                unidad_medida=unidad_medida,
                costo_unitario=float(costo_unitario),
                stock=float(stock),
                stock_minimo=float(stock_minimo),
            )

            # Conexion con la base de datos
            exito = dao.insertar_material(nuevo_material)

            if exito:
                return redirect("materiales:confirmacion")
            else:
                return redirect(request, "materiales/error.html", {
                    "mensaje": "No se puede guardar el material en la base de datos."
                })

        except ValueError:
            return render(request, "materiales/formulario.html", {
                "error": "Los campos numericos deben contener valores validos."
            })

def listar_materiales(request):
    """
    Consulta y muestra la lista de registros en una pagina JSP-equivalente.
    """
    materiales = dao.consultar_materiales()
    return render(request, "materiales/lista.html", {"materiales": materiales})

def confirmacion_registro(request):
    """Pagina de confirmacion de guardado exitoso"""
    return render(request, "materiales/confirmacion.html")