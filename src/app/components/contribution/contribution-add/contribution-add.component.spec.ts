import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionAddComponent } from './contribution-add.component';

describe('ContributionAddComponent', () => {
  let component: ContributionAddComponent;
  let fixture: ComponentFixture<ContributionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributionAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
