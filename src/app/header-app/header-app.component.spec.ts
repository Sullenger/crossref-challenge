import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderAppComponent } from './header-app.component';

describe('HeaderAppComponent', () => {
  let component: HeaderAppComponent;
  let fixture: ComponentFixture<HeaderAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update serchVal on button click', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('.button');
    btn.click();
    expect(component.searchVal).toEqual(jasmine.any(String));
  });

  it('should update serchVal on enter', () => {
    const input = fixture.nativeElement.querySelector('#search');
    const eventEnter = new KeyboardEvent("keydown", {
      "key": "Enter"
    });
    input.dispatchEvent(eventEnter);
    fixture.detectChanges();
    const updatedInput = fixture.nativeElement.querySelector('#search');
    expect(component.searchVal).toEqual(jasmine.any(String));
  });

  it('Should display placeholder', () => {
    const hostElement = fixture.nativeElement;
    const searchInput: HTMLInputElement = hostElement.querySelector('input');
    expect(searchInput.placeholder).toBe('Search...');
  });

});
