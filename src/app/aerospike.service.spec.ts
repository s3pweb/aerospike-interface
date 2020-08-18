import { TestBed } from '@angular/core/testing';

import { AerospikeService } from './aerospike.service';

describe('AerospikeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AerospikeService = TestBed.get(AerospikeService);
    expect(service).toBeTruthy();
  });
});
