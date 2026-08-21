import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-new-user',
  imports: [ReactiveFormsModule],
  templateUrl: './new-user.html',
  styleUrl: './new-user.scss',
})
export class NewUser implements OnInit {
  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private modalRef: NzModalRef) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['estudiante', Validators.required],
    });
  }

  createUser() {
    console.log('Estado del formulario:', this.userForm.status); // Para revisar en la consola si es válido o inválido
    console.log('Valores:', this.userForm.value);

    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      console.log('¡El formulario tiene errores!', this.userForm.errors);
      return;
    }

    const nuevoUsuario = this.userForm.value;

    // Guardar en el localStorage
    const usuarios = JSON.parse(
      localStorage.getItem('usuarios_locales') || '[]',
    );
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios_locales', JSON.stringify(usuarios));

    alert('¡Usuario creado con éxito!');
    this.close();
  }

  close(){
    this.modalRef.close()
  }
}
