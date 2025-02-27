import { Component, DestroyRef, inject, OnInit, signal, effect, Injector, runInInjectionContext } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CardUserComponent } from '../card-user/card-user.component';
import { IUser } from '../../interface/user.interface';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { trigger, transition, style, animate } from '@angular/animations';

/**
 * Component to display a list of users with search and responsive grid layout.
 */
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatGridListModule, CardUserComponent],
  animations: [
    trigger('fade', [
      transition(':enter', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class UserListComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private breakpointObserver = inject(BreakpointObserver);
  private injector = inject(Injector);

  /** Signal to hold the list of users */
  users = signal<IUser[]>([]);
  /** Signal to hold the number of columns for the grid layout */
  cols = signal<number>(3);
  /** Signal to hold the filtered list of users based on the search text */
  filteredUsers = signal<IUser[]>([]);

  searchText = new FormControl('');

  constructor(private userService: UserService) {
    runInInjectionContext(this.injector, () => {
      effect(() => {
        this.updateFilteredUsers();
      });
    });
  }

  ngOnInit(): void {
    this.getUsers();
    this.setCols();
    this.setupSearchTextListener();
  }

  /**
   * Fetches the list of users from the UserService and updates the users signal.
   */
  getUsers(): void {
    this.userService
      .getUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.users.set(data);
        this.updateFilteredUsers();
      });
  }

  /**
   * Sets the number of columns for the grid layout based on the current breakpoint.
   */
  setCols(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.cols.set(1);
        } else if (result.breakpoints[Breakpoints.Small]) {
          this.cols.set(2);
        } else if (result.breakpoints[Breakpoints.Medium]) {
          this.cols.set(3);
        } else if (result.breakpoints[Breakpoints.Large]) {
          this.cols.set(4);
        } else {
          this.cols.set(5);
        }
      });
  }

  /**
   * Sets up a listener for changes in the search text and updates the filtered users accordingly.
   */
  setupSearchTextListener(): void {
    this.searchText.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.updateFilteredUsers();
    });
  }

  /**
   * Updates the filtered list of users based on the current search text.
   */
  updateFilteredUsers(): void {
    const searchText = this.searchText.value?.toLowerCase() || '';
    this.filteredUsers.set(this.users().filter((user) => user.name.toLowerCase().includes(searchText)));
  }

  /**
   * TrackBy function for the ngFor directive to optimize rendering of the user list.
   * @param index The index of the item in the list.
   * @param user The user item.
   * @returns The unique identifier for the user.
   */
  trackByUser(index: number, user: IUser): number {
    return user.id;
  }
}
