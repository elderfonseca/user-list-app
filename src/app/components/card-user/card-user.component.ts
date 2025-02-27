import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { IUser } from '../../interface/user.interface';

/**
 * Component representing a user card.
 *
 * This component displays user information in a card format.
 *
 * @selector 'app-card-user'
 * @templateUrl './card-user.component.html'
 * @styleUrl './card-user.component.scss'
 * @standalone true
 * @imports [CommonModule, MatCardModule]
 */
@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.scss',
  standalone: true,
  imports: [CommonModule, MatCardModule],
})
export class CardUserComponent {
  @Input() user!: IUser;
}
