import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManipulativeStudioComponent } from './manipulative-studio.component';

describe('ManipulativeStudioComponent', () => {
  let component: ManipulativeStudioComponent;
  let fixture: ComponentFixture<ManipulativeStudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManipulativeStudioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManipulativeStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
