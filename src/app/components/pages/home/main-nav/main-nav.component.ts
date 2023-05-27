import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-main-nav',
  template: `<nav>
    <div class="nav-header">
      <div class="brand">
        <ion-icon src="/assets/icon/live.svg"> </ion-icon>
      </div>
      <div class="segment">
        <ion-segment value="follower" mode="md" scrollable="true">
          <ion-segment-button value="following">
            <ion-label color="light">Following</ion-label>
          </ion-segment-button>
          <ion-segment-button value="follower">
            <ion-label color="light">For You</ion-label>
          </ion-segment-button>
        </ion-segment>
      </div>
      <div class="nav-search">
        <ion-buttons slot="start" mode="md">
          <ion-button mode="ios">
            <ion-icon name="search" color="light"></ion-icon>
          </ion-button>
        </ion-buttons>
      </div>
    </div>
  </nav> `,
  styles: [
    `
      :host {
        display: block;
        position: relative;
        nav {
          height: 60px;
          background: transparent;
          width: 100%;
          z-index: 100;
          position: fixed;
          top: 0;
          padding: 0 1rem;

          .nav-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 100%;

            .segment {
              ion-segment {
                overflow: hidden;
                ion-segment-button {
                  --color-checked: transparent;
                  --background-focused: transparent;
                  --background-hover: transparent;
                  text-transform: capitalize;
                  --indicator-height: 0;
                  transition: transform 0.3s ease-in-out;

                  &.segment-button-checked {
                    font-weight: bold;
                    transform: scale(1.1);
                  }

                  &:first-child {
                    position: relative;
                    &:before {
                      content: '';
                      position: absolute;
                      right: 0;
                      top: 40%;
                      width: 1px;
                      height: 10px;
                      background-color: rgba(var(--ion-color-light-rgb), 0.5);
                    }
                  }
                }
              }
            }
          }

          ion-icon {
            font-size: 25px;
          }
        }
      }
    `,
  ],
  standalone: true,
  imports: [IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavComponent {}
