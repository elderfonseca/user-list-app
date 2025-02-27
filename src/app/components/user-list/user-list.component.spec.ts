import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../../services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { CardUserComponent } from '../card-user/card-user.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IUser } from '../../interface/user.interface';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;
  let breakpointObserver: BreakpointObserver;
  let breakpointSubject: Subject<BreakpointState>;

  const dummyUsers: IUser[] = [
    {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      address: { street: '123 Main St', suite: 'Apt 1', city: 'Anytown', zipcode: '12345', geo: { lat: '0.0000', lng: '0.0000' } },
      phone: '555-555-5555',
      website: 'johndoe.com',
      company: { name: 'Doe Inc', catchPhrase: 'Innovate and Lead', bs: 'business solutions' },
    },
    {
      id: 2,
      name: 'Jane Doe',
      username: 'janedoe',
      email: 'jane@example.com',
      address: { street: '456 Elm St', suite: 'Apt 2', city: 'Othertown', zipcode: '67890', geo: { lat: '0.0000', lng: '0.0000' } },
      phone: '555-555-5556',
      website: 'janedoe.com',
      company: { name: 'Doe LLC', catchPhrase: 'Empower and Achieve', bs: 'consulting services' },
    },
  ];

  beforeEach(async () => {
    breakpointSubject = new Subject<BreakpointState>();

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatInputModule,
        MatGridListModule,
        CommonModule,
        BrowserAnimationsModule,
        CardUserComponent,
        UserListComponent, // Importando o componente standalone
      ],
      providers: [
        UserService,
        {
          provide: BreakpointObserver,
          useValue: {
            observe: () => breakpointSubject.asObservable(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    breakpointObserver = TestBed.inject(BreakpointObserver);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get users on init', () => {
    jest.spyOn(userService, 'getUsers').mockReturnValue(of(dummyUsers));

    component.ngOnInit();

    expect(component.users()).toEqual(dummyUsers);
    expect(component.filteredUsers()).toEqual(dummyUsers);
  });

  it('should filter users based on search text', () => {
    component.users.set(dummyUsers);

    component.searchText.setValue('Jane');
    component.updateFilteredUsers();

    expect(component.filteredUsers()).toEqual([
      {
        id: 2,
        name: 'Jane Doe',
        username: 'janedoe',
        email: 'jane@example.com',
        address: { street: '456 Elm St', suite: 'Apt 2', city: 'Othertown', zipcode: '67890', geo: { lat: '0.0000', lng: '0.0000' } },
        phone: '555-555-5556',
        website: 'janedoe.com',
        company: { name: 'Doe LLC', catchPhrase: 'Empower and Achieve', bs: 'consulting services' },
      },
    ]);
  });

  it('should set columns to 1 for XSmall breakpoints', () => {
    component.ngOnInit();
    breakpointSubject.next({ matches: true, breakpoints: { [Breakpoints.XSmall]: true } });
    fixture.detectChanges();
    expect(component.cols()).toBe(1);
  });

  it('should set columns to 2 for Small breakpoints', () => {
    component.ngOnInit();
    breakpointSubject.next({ matches: true, breakpoints: { [Breakpoints.Small]: true } });
    fixture.detectChanges();
    expect(component.cols()).toBe(2);
  });

  it('should set columns to 3 for Medium breakpoints', () => {
    component.ngOnInit();
    breakpointSubject.next({ matches: true, breakpoints: { [Breakpoints.Medium]: true } });
    fixture.detectChanges();
    expect(component.cols()).toBe(3);
  });

  it('should set columns to 4 for Large breakpoints', () => {
    component.ngOnInit();
    breakpointSubject.next({ matches: true, breakpoints: { [Breakpoints.Large]: true } });
    fixture.detectChanges();
    expect(component.cols()).toBe(4);
  });

  it('should set columns to 5 for XLarge breakpoints', () => {
    component.ngOnInit();
    breakpointSubject.next({ matches: true, breakpoints: { [Breakpoints.XLarge]: true } });
    fixture.detectChanges();
    expect(component.cols()).toBe(5);
  });
});
