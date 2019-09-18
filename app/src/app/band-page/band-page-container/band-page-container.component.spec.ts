import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandPageContainerComponent } from './band-page-container.component';
import { FormsModule } from '@angular/forms';
import { BandsFilterPipe } from '../bands-filter.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BandPageContainerComponent', () => {
  let component: BandPageContainerComponent;
  let fixture: ComponentFixture<BandPageContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BandPageContainerComponent,
        BandsFilterPipe
      ],
      imports: [
        FormsModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandPageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
