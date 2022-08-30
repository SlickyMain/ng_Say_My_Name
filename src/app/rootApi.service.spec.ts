/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RootApiService } from './rootApi.service';

describe('Service: RootApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RootApiService]
    });
  });

  it('should ...', inject([RootApiService], (service: RootApiService) => {
    expect(service).toBeTruthy();
  }));
});
