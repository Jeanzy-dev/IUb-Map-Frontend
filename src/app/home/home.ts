import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Modal } from '../services/modal/modal';
import { NewUser } from '../../utils/new-user-modal/new-user';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  salonForm!: FormGroup;
  private elementoAnterior: SVGElement | null = null;
  @ViewChild('svgMapa', { static: false }) mapaSvg!: ElementRef<SVGElement>;

  constructor(private fb: FormBuilder, private modalService: Modal) {
    this.salonForm = this.fb.group({
      nombreSalon: ['', Validators.required],
    });
  }

  private normalizarTexto(texto: string): string {
    return (texto || '')
      .toLowerCase()
      .normalize('NFD') // Descompone caracteres con tilde (é -> e + ´)
      .replace(/[\u0300-\u036f]/g, '') // Elimina los signos de tilde
      .replace(/\s+/g, ' ') // Quita espacios dobles o saltos de línea
      .trim();
  }

  buscarEspacio(busqueda: string): void {
    if (!busqueda || !busqueda.trim()) return;

    const terminoBuscado = this.normalizarTexto(busqueda);
    let elementoEncontrado: SVGElement | null = null;

    const todosLosElementosConId = Array.from(
      document.querySelectorAll(
        '#layer2 path, #layer2 rect, #layer2 polygon, svg path, svg rect',
      ),
    ) as SVGElement[];

    elementoEncontrado =
      todosLosElementosConId.find((el) => {
        return this.normalizarTexto(el.id) === terminoBuscado;
      }) || null;

    if (!elementoEncontrado) {
      const todosLosTextos = Array.from(
        document.querySelectorAll(
          '#layer4 text, #layer4 tspan, svg text, svg tspan',
        ),
      );

      const textoCoincidente = todosLosTextos.find((el) => {
        const contenidoNormalizado = this.normalizarTexto(el.textContent || '');
        return (
          contenidoNormalizado.length > 0 &&
          contenidoNormalizado.includes(terminoBuscado)
        );
      }) as SVGElement;

      if (textoCoincidente) {
        const rectTexto = textoCoincidente.getBoundingClientRect();
        const centroX = rectTexto.left + rectTexto.width / 2;
        const centroY = rectTexto.top + rectTexto.height / 2;

        const figurasLayer2 = Array.from(
          document.querySelectorAll(
            '#layer2 path, #layer2 rect, #layer2 polygon',
          ),
        ) as SVGElement[];

        for (const figura of figurasLayer2) {
          const rectFigura = figura.getBoundingClientRect();
          if (
            centroX >= rectFigura.left &&
            centroX <= rectFigura.right &&
            centroY >= rectFigura.top &&
            centroY <= rectFigura.bottom
          ) {
            elementoEncontrado = figura;
            break;
          }
        }
      }
    }

    if (elementoEncontrado) {
      if (this.elementoAnterior) {
        this.elementoAnterior.classList.remove('resaltado');
      }

      elementoEncontrado.classList.add('resaltado');
      this.elementoAnterior = elementoEncontrado;

      elementoEncontrado.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    } else {
      console.warn(`No se encontró salón para la búsqueda: "${busqueda}"`);
    }
  }

  newUsuario() {
    this.modalService.open({
      titulo: 'NUEVO ESTUDIANTE',
      componente: NewUser,
      ancho: 500,
      centered: true,
      maskStyle: { background: 'rgba(0, 0, 0, 0.65)' },
      closable: false,
      maskClosable: false,
    }).afterClose.subscribe();
  }
}
