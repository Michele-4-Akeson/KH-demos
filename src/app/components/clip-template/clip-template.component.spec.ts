import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipTemplateComponent } from './clip-template.component';

describe('ClipTemplateComponent', () => {
  let component: ClipTemplateComponent;
  let fixture: ComponentFixture<ClipTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClipTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClipTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
