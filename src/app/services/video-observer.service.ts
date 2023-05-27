import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoObserverService {
  private observer!: IntersectionObserver;
  private _currentIndex = new BehaviorSubject<number>(-1);
  readonly currentIndex$ = this._currentIndex.asObservable();

  constructor() {
    this.initObserver();
  }

  /* Function to start observing an array of video elements. */
  public observe(videos: ElementRef[]) {
    videos.forEach((video: ElementRef) => {
      /* Observe each video element for intersection changes */
      this.observer.observe(video.nativeElement);
    });
  }

  /* Function to stop observing an array of video elements and disconnect the observer. */
  public disconnect(videos: ElementRef[]) {
    videos.forEach((video: ElementRef) => {
      /* Stop observing each video element */
      this.observer.unobserve(video.nativeElement);
    });
    /* Cleanup the observer to prevent memory leaks */
    this.cleanup();
  }

  /**
   * Function to disconnect the observer to prevent memory leaks.
   */
  private cleanup() {
    this.observer && this.observer.disconnect();
  }

  private initObserver() {
    /**
     *  Options for the observer.
     * Here threshold is 0.6 which means when 60% of the target is visible the callback will be executed.
     */
    const options = {
      threshold: 0.6,
    };

    this.observer = new IntersectionObserver((entries) => {
      /* For each entry (target elements and their visibility details) */
      entries.forEach((entry) => {
        const videoElement =
          entry.target as HTMLVideoElement; /* The target video element. */

        /* If the videoElement is in the viewport (isIntersecting is true) */
        if (entry.isIntersecting) {
          this.handleVideoIntersection(videoElement);
        } else {
          this.handleVideoNonIntersection(videoElement);
        }
      });
    }, options);
  }

  /* Function to handle the case when video enters the viewport. */
  private handleVideoIntersection(videoElement: HTMLVideoElement) {
    videoElement.autoplay = true;
    videoElement.play().catch(() => {
      // Autoplay was blocked. Do nothing.
      // User will need to manually start the video.
    });

    /* Update the currentIndex BehaviorSubject to reflect the index of the current video. */
    const index = Number(videoElement.getAttribute('data-index'));
    this._currentIndex.next(index);

    videoElement.addEventListener('click', this.toggleVideoPlayState);
  }

  /* Function to handle the case when video leaves the viewport. */
  private handleVideoNonIntersection(videoElement: HTMLVideoElement) {
    videoElement.autoplay = false;
    videoElement.pause();

    videoElement.removeEventListener('click', this.toggleVideoPlayState);
  }

  /* Function to handle the click event, toggling the play/pause state of the video. */
  private toggleVideoPlayState = (event: MouseEvent) => {
    const videoElement = event.target as HTMLVideoElement;
    if (videoElement.paused) {
      videoElement.play().catch((error) => {
        /**
         * Play was blocked. Do nothing.
         * User will need to manually start the video.
         * ? Maybe handle this error differently ?
         */
      });
    } else {
      videoElement.pause();
    }
  };
}
