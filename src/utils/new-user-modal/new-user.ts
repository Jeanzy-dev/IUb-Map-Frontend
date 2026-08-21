import { Component } from '@angular/core';
import { Modal } from '../../app/services/modal/modal';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-new-user',
  imports: [],
  templateUrl: './new-user.html',
  styleUrl: './new-user.scss',
})
export class NewUser {
  constructor(private modalService: Modal, private modalRef: NzModalRef){
  }

  close(){
    this.modalRef.close()
  }
}
