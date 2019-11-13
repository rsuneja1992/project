import { TestBed } from '@angular/core/testing';

import { AccessPolicyService } from './access-policy.service';

describe('AccessPolicyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccessPolicyService = TestBed.get(AccessPolicyService);
    expect(service).toBeTruthy();
  });
});
