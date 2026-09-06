import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidField } from './invalid-field';

describe('InvalidField', () => {
    let component: InvalidField;
    let fixture: ComponentFixture<InvalidField>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InvalidField]
        }).compileComponents();

        fixture = TestBed.createComponent(InvalidField);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
