import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyMovementComponent } from './key-movement.component';

describe('KeyMovementComponent', () => {
  let component: KeyMovementComponent;
  let fixture: ComponentFixture<KeyMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyMovementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
