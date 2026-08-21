import { ComponentType } from '@angular/cdk/portal';

export interface ModalConfig {
  titulo?: string;
  componente: ComponentType<any>; 
  data?: { [key: string]: any }; 
  ancho?: number | string;
  posicion?: { [key: string]: any }; 
  closable?: boolean; 
  maskClosable?: boolean; 
  className?: string; 
  centered?: boolean; 
  maskStyle?: { [key: string]: any }; 
  footer?: null; 
}