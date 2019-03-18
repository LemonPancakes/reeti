import { TestBed } from '@angular/core/testing';

import { Food2ForkService } from './food2fork.service';

describe('Food2ForkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Food2ForkService = TestBed.get(Food2ForkService);
    expect(service).toBeTruthy();
  });
});
