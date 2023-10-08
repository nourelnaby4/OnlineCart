import { TestBed } from '@angular/core/testing';

import { AddTokenHeaderInterceptor } from './add-token-header.interceptor';

describe('AddTokenHeaderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AddTokenHeaderInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AddTokenHeaderInterceptor = TestBed.inject(AddTokenHeaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
