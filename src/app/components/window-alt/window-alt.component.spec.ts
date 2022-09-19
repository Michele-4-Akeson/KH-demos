import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowAltComponent } from './window-alt.component';

describe('WindowAltComponent', () => {
  let component: WindowAltComponent;
  let fixture: ComponentFixture<WindowAltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindowAltComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WindowAltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
