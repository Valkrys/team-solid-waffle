import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DetailsPageModule } from 'src/app/details-page/details-page.module';
import { RolesPageModule } from '../roles-page.module';
import { RolesPageContainerComponent } from './roles-page-container.component';


describe('RolesPageContainerComponent', () => {
  let component: RolesPageContainerComponent;
  let fixture: ComponentFixture<RolesPageContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RolesPageModule,
        DetailsPageModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesPageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
