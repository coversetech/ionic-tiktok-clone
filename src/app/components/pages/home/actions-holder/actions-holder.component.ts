import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Actions } from 'src/app/models/feeds.model';

@Component({
  selector: 'app-actions-holder',
  template: ` <div class="actions-holder">
    <ul class="actions-list">
      <li>
        <ion-buttons slot="end" mode="md">
          <ion-button mode="ios" (click)="likeHandler($event)">
            <ion-icon
              name="heart"
              [color]="actions.liked ? 'danger' : 'light'"
            ></ion-icon>
          </ion-button>
        </ion-buttons>

        <small> {{ actions.likes }}</small>
      </li>
      <li>
        <ion-buttons slot="end" mode="md">
          <ion-button mode="ios" (click)="commentHandler($event)">
            <ion-icon name="chatbubble-ellipses" color="light"></ion-icon>
          </ion-button>
        </ion-buttons>
        <small> {{ actions.comments }}</small>
      </li>
      <li>
        <ion-buttons slot="end" mode="md">
          <ion-button mode="ios" (click)="bookmarkHandler($event)">
            <ion-icon
              name="bookmark"
              [color]="actions.bookmarked ? 'warning' : 'light'"
            ></ion-icon>
          </ion-button>
        </ion-buttons>
        <small> {{ actions.bookmarks }}</small>
      </li>
      <li>
        <ion-buttons slot="end" mode="md">
          <ion-button mode="ios">
            <ion-icon name="arrow-redo" color="light"></ion-icon>
          </ion-button>
        </ion-buttons>
        <small>Share</small>
      </li>
    </ul>
  </div>`,
  styles: [
    `
      :host {
        display: block;
        position: relative;
        .actions-holder {
          position: absolute;
          right: 0;
          bottom: 8rem;

          ul.actions-list {
            color: var(--ion-color-dark);
            list-style: none;

            li {
              margin-bottom: 1rem;
              display: grid;
              place-items: center;

              ion-icon {
                font-size: 2rem;
                filter: drop-shadow(
                  0 2px 1px rgba(var(--ion-color-dark-rgb), 0.2)
                );
              }

              small {
                text-shadow: 0 1px 1px rgba(var(--ion-color-dark-rgb), 0.5);
                color: white;
                font-weight: bold;
              }
            }
          }
        }
      }
    `,
  ],
  standalone: true,
  imports: [IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsHolderComponent {
  private actionVal!: Actions;

  @Output() onLikeTrigger = new EventEmitter<MouseEvent>();
  @Output() onBookmarkTrigger = new EventEmitter<MouseEvent>();
  @Output() onCommentTrigger = new EventEmitter<MouseEvent>();

  @Input({ required: true }) set actions(val: Actions) {
    this.actionVal = val ? val : this.actionVal;
  }

  get actions() {
    return this.actionVal;
  }

  likeHandler(evt: MouseEvent) {
    this.onLikeTrigger.emit(evt);
  }

  bookmarkHandler(evt: MouseEvent) {
    this.onBookmarkTrigger.emit(evt);
  }

  commentHandler(evt: MouseEvent) {
    this.onCommentTrigger.emit(evt);
  }
}
