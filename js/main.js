// Credenciales de prueba (simulan base de datos)
const USUARIOS_VALIDOS = [
  { usuario: 'Eric Quintana', password: '828967', nombre: 'Eric Quintana', rol: 'Administrador' },
  { usuario: 'Juan Perez', password: '123456', nombre: 'Juan Pérez', rol: 'Carpintero' },
  { usuario: 'demo', password: 'demo123', nombre: 'Usuario Demo', rol: 'Carpintero' }
];

// Función para limpiar errores de los campos
function limpiarErroresCampos() {
  const inputUsuario = document.getElementById('usuario');
  const inputPassword = document.getElementById('password');
  const errorUsuario = document.getElementById('error-usuario');
  const errorPassword = document.getElementById('error-password');
  
  // Remover clases de error
  inputUsuario.classList.remove('control_form_error');
  inputPassword.classList.remove('control_form_error');
  
  // Ocultar mensajes de error específicos
  if (errorUsuario) errorUsuario.style.display = 'none';
  if (errorPassword) errorPassword.style.display = 'none';
}

// Función para mostrar errores en campos específicos
function mostrarErroresEnCampos() {
  const inputUsuario = document.getElementById('usuario');
  const inputPassword = document.getElementById('password');
  const errorUsuario = document.getElementById('error-usuario');
  const errorPassword = document.getElementById('error-password');
  
  // Agregar clases de error a los inputs
  inputUsuario.classList.add('control_form_error');
  inputPassword.classList.add('control_form_error');
  
  // Mostrar mensajes de error específicos
  if (errorUsuario) errorUsuario.style.display = 'flex';
  if (errorPassword) errorPassword.style.display = 'flex';
}

// Función que se ejecuta al enviar el formulario
function validarLogin(event) {
  event.preventDefault(); // Evita el envío automático del formulario
  
  const usuario = document.getElementById('usuario').value.trim();
  const password = document.getElementById('password').value.trim();
  
  console.log('Usuario ingresado:', usuario);
  console.log('Password ingresado:', password);
  
  // Buscar usuario en la lista
  const usuarioValido = USUARIOS_VALIDOS.find(
    u => u.usuario === usuario && u.password === password
  );
  
  // Ocultar alertas previas
  const alertaError = document.getElementById('login-error');
  if (alertaError) alertaError.style.display = 'none';
  
  // Limpiar errores previos de los campos
  limpiarErroresCampos();
  
  if (usuarioValido) {
    // Credenciales correctas - redirigir al tutorial
    console.log('✅ Login exitoso, redirigiendo...');
    window.location.href = 'pages/tutorial.html';
  } else {
    // Credenciales incorrectas - mostrar errores
    console.log('❌ Credenciales incorrectas');
    
    // 1. Mostrar alerta general arriba
    if (alertaError) {
      alertaError.style.display = 'flex';
      alertaError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // 2. Mostrar errores debajo de cada campo
    mostrarErroresEnCampos();
  }
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  console.log('📄 DOM cargado correctamente');
  
  const formulario = document.getElementById('form-login');
  const inputUsuario = document.getElementById('usuario');
  const inputPassword = document.getElementById('password');
  
  if (formulario) {
    formulario.addEventListener('submit', validarLogin);
    console.log('✅ Listener del formulario activado');
  } else {
    console.error('❌ No se encontró el formulario');
  }
  
  // Limpiar errores cuando el usuario empiece a escribir
  if (inputUsuario) {
    inputUsuario.addEventListener('input', function() {
      this.classList.remove('control_form_error');
      const errorUsuario = document.getElementById('error-usuario');
      if (errorUsuario) errorUsuario.style.display = 'none';
    });
  }
  
  if (inputPassword) {
    inputPassword.addEventListener('input', function() {
      this.classList.remove('control_form_error');
      const errorPassword = document.getElementById('error-password');
      if (errorPassword) errorPassword.style.display = 'none';
    });
  }
});

// ============================================
// NAVEGACIÓN DEL FORMULARIO MULTI-PASO CON VALIDACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const formSteps = document.querySelectorAll('.form-step');
  const stepItems = document.querySelectorAll('.stepper:not(.stepper-form) .step-item');
  const stepLines = document.querySelectorAll('.stepper:not(.stepper-form) .step-line');
  const nextButtons = document.querySelectorAll('.btn-next');
  const prevButtons = document.querySelectorAll('.btn-prev');
  const form = document.getElementById('form-modelo');

  // Función para validar un paso específico
  function validarPaso(stepNumber) {
    const currentStep = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
    if (!currentStep) return true;

    const requiredFields = currentStep.querySelectorAll('[required]');
    let isValid = true;

    // Limpiar errores previos
    requiredFields.forEach(field => {
      field.classList.remove('control_form_error');
      const errorSpan = document.getElementById(`error-${field.id}`);
      if (errorSpan) errorSpan.style.display = 'none';
    });

    // Validar cada campo obligatorio
    requiredFields.forEach(field => {
      if (!field.value || field.value.trim() === '') {
        isValid = false;
        field.classList.add('control_form_error');
        const errorSpan = document.getElementById(`error-${field.id}`);
        if (errorSpan) errorSpan.style.display = 'flex';
      }
    });

    return isValid;
  }

  // Función para mostrar un paso específico
  function showStep(stepNumber) {
    // Ocultar todos los pasos
    formSteps.forEach(step => {
      step.style.display = 'none';
    });

    // Mostrar el paso actual
    const currentStep = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
    if (currentStep) {
      currentStep.style.display = 'block';
    }

    // Actualizar stepper visual (solo si no es stepper-form)
    if (stepItems.length > 0) {
      stepItems.forEach((item, index) => {
        item.classList.remove('active', 'done');
        if (index + 1 < stepNumber) {
          item.classList.add('done');
        } else if (index + 1 === stepNumber) {
          item.classList.add('active');
        }
      });

      stepLines.forEach((line, index) => {
        if (index + 1 < stepNumber) {
          line.classList.add('done');
        } else {
          line.classList.remove('done');
        }
      });
    }

    // Scroll al inicio del formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Event listeners para botones "Siguiente" con validación
  nextButtons.forEach(button => {
    button.addEventListener('click', function() {
      const currentStepElement = this.closest('.form-step');
      const currentStepNumber = parseInt(currentStepElement.getAttribute('data-step'));
      
      // Validar antes de avanzar
      if (validarPaso(currentStepNumber)) {
        const nextStep = this.getAttribute('data-next');
        showStep(nextStep);
      } else {
        // Scroll al primer campo con error
        const firstError = currentStepElement.querySelector('.control_form_error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstError.focus();
        }
      }
    });
  });

  // Event listeners para botones "Anterior" (sin validación)
  prevButtons.forEach(button => {
    button.addEventListener('click', function() {
      const prevStep = this.getAttribute('data-prev');
      showStep(prevStep);
    });
  });

  // Validación al enviar el formulario (último paso)
  if (form) {
    form.addEventListener('submit', function(event) {
      const currentStepElement = document.querySelector('.form-step[data-step="3"]');
      if (!validarPaso(3)) {
        event.preventDefault();
        const firstError = currentStepElement.querySelector('.control_form_error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstError.focus();
        }
      }
    });
  }

  // Limpiar errores cuando el usuario empiece a escribir
  const allInputs = document.querySelectorAll('.control_form[required]');
  allInputs.forEach(input => {
    input.addEventListener('input', function() {
      this.classList.remove('control_form_error');
      const errorSpan = document.getElementById(`error-${this.id}`);
      if (errorSpan) errorSpan.style.display = 'none';
    });

    input.addEventListener('change', function() {
      this.classList.remove('control_form_error');
      const errorSpan = document.getElementById(`error-${this.id}`);
      if (errorSpan) errorSpan.style.display = 'none';
    });
  });

  // Inicializar en el paso 1
  if (formSteps.length > 0) {
    formSteps.forEach(step => step.style.display = 'none');
    const firstStep = document.querySelector('.form-step[data-step="1"]');
    if (firstStep) firstStep.style.display = 'block';
  }
});