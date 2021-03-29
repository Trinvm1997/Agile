import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ContributionAddComponent } from './contribution-add.component';

describe('ContributionAddComponent', () => {
  let component: ContributionAddComponent;
  let fixture: ComponentFixture<ContributionAddComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributionAddComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
