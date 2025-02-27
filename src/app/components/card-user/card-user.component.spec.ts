import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardUserComponent } from './card-user.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { IUser } from '../../interface/user.interface';

describe('CardUserComponent', () => {
  let component: CardUserComponent;
  let fixture: ComponentFixture<CardUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, MatCardModule, CardUserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardUserComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user information', () => {
    const user: IUser = {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      address: { street: '123 Main St', suite: 'Apt 1', city: 'Anytown', zipcode: '12345', geo: { lat: '0.0000', lng: '0.0000' } },
      phone: '555-555-5555',
      website: 'johndoe.com',
      company: { name: 'Doe Inc', catchPhrase: 'Innovate and Lead', bs: 'business solutions' },
    };

    component.user = user;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-card-title').textContent).toContain('John Doe');
    expect(compiled.querySelector('mat-card-content p').textContent).toContain('john@example.com');
  });
});
