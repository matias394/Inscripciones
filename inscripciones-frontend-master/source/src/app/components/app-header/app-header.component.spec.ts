import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './app-header.component';
import { TokenStorageService } from '@modules/auth/token-storage.service';
import { Router } from '@angular/router';

describe('AppHeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const tokenStorageServiceMock = {
    getUser: () => ({ nombre: 'Usuario de Prueba' }), // Mock de getUser
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeaderComponent],
      providers: [
        { provide: TokenStorageService, useValue: tokenStorageServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user name', () => {
    const compiled = fixture.nativeElement;
    const userNameElement = compiled.querySelector('.name-user');
    expect(userNameElement.textContent).toContain('Usuario de Prueba');
  });

  it('should call logout', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.logout();
    expect(navigateSpy).toHaveBeenCalledWith(['login']);
  });
});
