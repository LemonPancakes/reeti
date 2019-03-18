import { TestBed } from '@angular/core/testing';

import { ClarifaiService } from './clarifai.service';

describe('ClarifaiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClarifaiService = TestBed.get(ClarifaiService);
    expect(service).toBeTruthy();
  });
});
