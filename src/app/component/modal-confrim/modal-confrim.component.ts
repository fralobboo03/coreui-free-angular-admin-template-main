import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SHARED_DEPENDENCIES } from 'src/app/shared-dependencies';

@Component({
  selector: 'app-modal-confrim',
  standalone: true,
  imports: [SHARED_DEPENDENCIES],
  templateUrl: './modal-confrim.component.html',
  styleUrl: './modal-confrim.component.scss'
})
export class ModalConfrimComponent {
  @Input() visible: boolean = false
  @Input() alertMessage = '';
  @Input() btnConfrimText = 'ตกลง';
  @Output() onEventModal = new EventEmitter<any>();
  submit() {
    this.onEventModal.emit(true)
  }

  closeModal() {
    this.onEventModal.emit(false)
  }
}
