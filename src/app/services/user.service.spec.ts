import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { IUser } from '../interface/user.interface';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve users from the API via GET', () => {
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

    service.getUsers().subscribe((users) => {
      expect(users.length).toBe(2);
      expect(users).toEqual(dummyUsers);
    });

    const request = httpMock.expectOne(`${service.baseUrl}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyUsers);
  });
});
