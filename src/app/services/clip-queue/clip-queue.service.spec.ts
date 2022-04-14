import { TestBed } from '@angular/core/testing';

import { ClipQueueService } from './clip-queue.service';

describe('ClipQueueService', () => {
  let service: ClipQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClipQueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
