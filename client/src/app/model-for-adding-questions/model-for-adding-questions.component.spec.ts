import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelForAddingQuestionsComponent } from './model-for-adding-questions.component';

describe('ModelForAddingQuestionsComponent', () => {
  let component: ModelForAddingQuestionsComponent;
  let fixture: ComponentFixture<ModelForAddingQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelForAddingQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelForAddingQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
