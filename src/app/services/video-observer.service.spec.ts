import { TestBed } from '@angular/core/testing';

import { VideoObserverService } from './video-observer.service';

describe('VideoObserverService', () => {
  let service: VideoObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
