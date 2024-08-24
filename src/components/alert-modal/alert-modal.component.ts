import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { SHARED_DEPENDENCIES } from 'src/app/shared-dependencies';

@Component({
  selector: 'app-alert-modal',
  standalone: true,
  imports: [SHARED_DEPENDENCIES],
  templateUrl: './alert-modal.component.html',
  styleUrl: './alert-modal.component.scss'
})
export class AlertModalComponent {
  @Input() visible = false;
  @Input() alertMessage = '';
  // @Input() color: 'success' | 'danger' | 'warning' | 'info' = 'success';
  @Output() close = new EventEmitter<void>();

  closeModal(): void {
    this.visible = false;
    this.close.emit();
  }

  waitForClose(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.close.subscribe(() => {
        resolve();
      });
    });
  }
}
