import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Carga usuarios por defecto en localStorage si aún no existen
    this.inicializarUsuariosLocales();
  }

  // Inicializa un arreglo de usuarios en localStorage la primera vez
  inicializarUsuariosLocales() {
    if (!localStorage.getItem('usuarios_locales')) {
      const usuariosIniciales = [
        { username: 'admin', password: '123' },
        { username: 'user', password: '123' }
      ];
      localStorage.setItem('usuarios_locales', JSON.stringify(usuariosIniciales));
    }
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;

    // Obtener los usuarios guardados en la memoria del navegador
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios_locales') || '[]');

    // Buscar si existe coincidencia de credenciales
    const usuarioEncontrado = usuariosGuardados.find(
      (user: any) => user.username === username && user.password === password
    );

    if (usuarioEncontrado) {
      // Guardar la sesión activa para no perderla al recargar
      localStorage.setItem('usuario_sesion', JSON.stringify(usuarioEncontrado));
      
      // Redirigir al home
      this.route.navigateByUrl('/home');
    } else {
      alert('El usuario no ha sido encontrado o la contraseña es incorrecta.');
    }
  }
}
