import { TestBed } from '@angular/core/testing';

import { ValidationMessage } from './validation-message';

describe('ValidationMessage', () => {
    let service: ValidationMessage;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ValidationMessage);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
