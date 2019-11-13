import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpareInventoryComponent } from './spare-inventory.component';

describe('SpareInventoryComponent', () => {
  let component: SpareInventoryComponent;
  let fixture: ComponentFixture<SpareInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpareInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpareInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
