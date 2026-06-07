import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaoVotanteEditar } from './nao-votante-editar';

describe('NaoVotanteEditar', () => {
  let component: NaoVotanteEditar;
  let fixture: ComponentFixture<NaoVotanteEditar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NaoVotanteEditar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NaoVotanteEditar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
