import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { documentTextOutline } from 'ionicons/icons';
import { UI_TEXTS } from '../../../../core/constants/storage.constants';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon]
})
export class EmptyStateComponent {
  message = input<string>(UI_TEXTS.EMPTY_STATES.NO_DATA.TITLE);
  description = input<string>(UI_TEXTS.EMPTY_STATES.NO_DATA.DESCRIPTION);
  icon = input<string>('document-text-outline');

  constructor() {
    addIcons({ documentTextOutline });
  }
}
