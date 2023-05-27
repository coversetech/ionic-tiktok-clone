import { AsyncPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { VideoObserverService } from 'src/app/services/video-observer.service';

@Component({
  selector: 'app-meta-data',
  template: `<div class="meta-data">
    <span> {{ username }} </span>
    <p>{{ description }}</p>
    <div class="track-info">
      <div class="marquee">
        <p>{{ soundTrack }}</p>
      </div>
      <!-- FIXME: fix issue with spin-vinyl-pause check why component not being refreshed when passed -->
      <img
        src="/assets/vinyl-record.png"
        alt="Vinyl Record Logo"
        class="spin-vinyl spin-vinyl-play"
        [ngClass]="{
          'spin-vinyl-pause': false
        }"
      />
    </div>
  </div>`,
  styles: [
    `
      :host {
        display: block;
        position: relative;
        .meta-data {
          position: absolute;
          left: 2rem;
          bottom: 2rem;
          text-shadow: 0 1px 1px rgba(var(--ion-color-dark-rgb), 0.5);
          width: 100%;
          color: var(--ion-color-light);
          font-weight: 700;

          p {
            margin-block-start: 0;
          }

          .track-info {
            display: flex;
            width: 88.5%;
            justify-content: space-between;
            align-items: center;

            .marquee {
              overflow: hidden;

              p {
                text-align: center;
                margin-block-end: 0;
              }
            }

            img {
              width: 40px;
              height: 40px;
            }

            .spin-vinyl {
              animation: vinyl 5s linear infinite;
              /* Added the pause/play here to actually not reset the animation but stop it and continue from when it was triggered.
              This is done to prevent the small glitch caused by the animation resetting between states */
              &-pause {
                animation-play-state: paused !important;
              }
              &-play {
                animation-play-state: running;
              }
            }
          }
        }
        @keyframes vinyl {
          0% {
            transform: rotate(0deg);
          }

          100% {
            transform: rotate(360deg);
          }
        }
      }
    `,
  ],
  standalone: true,
  providers: [VideoObserverService],
  imports: [NgClass, AsyncPipe, IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetaDataComponent {
  private usernameVal = '';
  private descriptionVal = '';
  private soundTrackVal = '';

  @Input({ required: true }) set username(val: string) {
    this.usernameVal =
      val && String(val).trim() !== '' ? val : this.usernameVal;
  }

  get username() {
    return this.usernameVal;
  }

  @Input({ required: true }) set description(val: string) {
    this.descriptionVal =
      val && String(val).trim() !== '' ? val : this.descriptionVal;
  }

  get description() {
    return this.descriptionVal;
  }

  @Input({ required: true }) set soundTrack(val: string) {
    this.soundTrackVal =
      val && String(val).trim() !== '' ? val : this.soundTrackVal;
  }

  get soundTrack() {
    return this.soundTrackVal;
  }
}
