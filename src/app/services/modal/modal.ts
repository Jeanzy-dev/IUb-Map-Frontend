import { Injectable } from '@angular/core';
import { ModalConfig } from '../../../utils/interfaces/modal';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root',
})
export class Modal {
  constructor(private modal: NzModalService) { }

  open(config: ModalConfig): NzModalRef {
    const modalRef = this.modal.create({
      nzTitle: config.titulo,
      nzContent: config.componente,
      nzWidth: config.ancho ?? 500,
      nzStyle: config.posicion ?? {},
      nzClosable: config.closable !== false,
      nzMaskClosable: config.maskClosable !== false,
      nzClassName: config.className ?? '',
      nzCentered: config.centered ?? false,
      nzMaskStyle: config.maskStyle ?? {},
      nzFooter: config.footer ?? null,
    });

    if (config.data) {
      Object.assign(modalRef.componentInstance, config.data);
    }

    return modalRef;
  }

  openDialog(config: ModalConfig) {
    const modalRef = this.modal.create({
      nzTitle: config.titulo,
      nzContent: config.componente,
      nzWidth: 500,
      nzStyle: {},
      nzClosable: false,
      nzMaskClosable: false,
      nzClassName: '',
      nzCentered: true,
      nzMaskStyle: {},
      nzFooter: null,
    });

    if (config.data) {
      Object.assign(modalRef.componentInstance, config.data);
    }

    return modalRef;
  }
}
