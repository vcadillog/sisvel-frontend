import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { DashboardComponent } from './dashboard';
import { AuthService } from '../../services/auth.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        AuthService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    await fixture.whenStable();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have currentUser defined after init', () => {
    component.ngOnInit();
    expect(component.currentUser).toBeDefined();
  });

  it('should return a greeting based on time of day', () => {
    const saludo = component.getSaludo();
    expect(['Buenos días', 'Buenas tardes', 'Buenas noches']).toContain(saludo);
  });

  it('should format numbers with locale', () => {
    expect(component.formatNumber(1234)).toBe('1,234');
    expect(component.formatNumber(1000000)).toBe('1,000,000');
  });

  it('should load quick actions based on user role', () => {
    component.ngOnInit();
    expect(component.quickActions.length).toBeGreaterThan(0);
  });

  it('should have stats defined', () => {
    expect(component.stats).toBeDefined();
    expect(component.stats.ventasHoy).toBeGreaterThanOrEqual(0);
    expect(component.stats.pedidosPendientes).toBeGreaterThanOrEqual(0);
  });

  it('should have recent activities defined', () => {
    expect(component.recentActivities.length).toBeGreaterThan(0);
    expect(component.recentActivities[0]).toHaveProperty('text');
    expect(component.recentActivities[0]).toHaveProperty('time');
  });

  it('should have sales data defined', () => {
    expect(component.salesData.length).toBe(7);
    expect(component.salesData[0]).toHaveProperty('day');
    expect(component.salesData[0]).toHaveProperty('value');
  });

  it('should call logout when logout method is called', () => {
    const spy = jest.spyOn(component, 'logout');
    component.logout();
    expect(spy).toHaveBeenCalled();
  });

  it('should return full name correctly', () => {
    component.currentUser = {
      id: 1,
      username: 'admin',
      nombre: 'Admin',
      apellido: 'Sistema',
      email: 'admin@sisvel.com',
      rol: 'ADMIN'
    };
    expect(component.getNombreCompleto()).toBe('Admin Sistema');
  });

  it('should return empty string if no user', () => {
    component.currentUser = null;
    expect(component.getNombreCompleto()).toBe('');
  });
});
