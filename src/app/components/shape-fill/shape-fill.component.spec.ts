import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeFillComponent } from './shape-fill.component';

describe('ShapeFillComponent', () => {
  let component: ShapeFillComponent;
  let fixture: ComponentFixture<ShapeFillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShapeFillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShapeFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
