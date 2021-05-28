import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedQuizComponent } from './finished-quiz.component';

describe('FinishedQuizComponent', () => {
  let component: FinishedQuizComponent;
  let fixture: ComponentFixture<FinishedQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishedQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
