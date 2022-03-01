import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DisplayedWorksComponent } from './displayed-works.component';
import { ApiService } from '../services/api.service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

describe('DisplayedWorksComponent', () => {
  let component: DisplayedWorksComponent;
  let fixture: ComponentFixture<DisplayedWorksComponent>;
  let service: ApiService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      declarations: [ DisplayedWorksComponent ]
    })
    .compileComponents();
    service = TestBed.inject(ApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayedWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should search string - Search Param', () => {
    expect(component.filterSearchParam).toEqual(jasmine.any(String));
  });
  
  it('should be Number - Current Page', () => {
    expect(component.currentPage).toEqual(jasmine.any(Number));
  });

  it("should paginate results", fakeAsync(() => {
    component.paginate({page:2})
    expect(component.dataLoaded).toEqual(false)
    expect(component.currentPage).toEqual(2)
  }))

  it('should call getWorkDetails', () => {
    service.getWorkDetails("10.52482%2Fayurline.v5i03.538").subscribe((res) => {
      expect(res.message.abstract).toEqual(jasmine.any(String));
    });
  });

  it('should call getWorks with Search Query', () => {
    service.getWorks("&query.bibliographic=stuff&offset=0").subscribe((res) => {
      expect(res.message.abstract).toEqual(jasmine.any(String));
    });
  });

});
