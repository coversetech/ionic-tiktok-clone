import { AsyncPipe, NgClass, NgFor } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Subject, take, takeUntil, throwError } from 'rxjs';
import { ActionsHolderComponent } from 'src/app/components/pages/home/actions-holder/actions-holder.component';
import { MainNavComponent } from 'src/app/components/pages/home/main-nav/main-nav.component';
import { MetaDataComponent } from 'src/app/components/pages/home/meta-data/meta-data.component';
import { Feed } from 'src/app/models/feeds.model';
import { FeedsService } from 'src/app/services/feeds.service';
import { VideoObserverService } from 'src/app/services/video-observer.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  providers: [FeedsService, VideoObserverService],
  imports: [
    IonicModule,
    MainNavComponent,
    MetaDataComponent,
    ActionsHolderComponent,
    MainNavComponent,
    NgFor,
    AsyncPipe,
    NgClass,
  ],
})
export class HomePage implements OnInit, OnDestroy {
  private feedsService = inject(FeedsService);
  private videoObserverService = inject(VideoObserverService);

  private ngUnsubscribeFeeds: Subject<boolean> = new Subject();

  @ViewChildren('video') videos!: QueryList<ElementRef>;

  feeds: Feed[] = [];

  ngOnInit(): void {
    /* Call Feeds API on page load */
    this.feedsService
      .getFeedList()
      .pipe(takeUntil(this.ngUnsubscribeFeeds), take(1))
      .subscribe({
        next: (res: Feed[]) => {
          this.feeds = [...res];
        },
        error: (err: Error) => throwError(() => new Error(err.message)),
      });
  }

  ionViewWillEnter() {
    this.videoObserverService.observe(this.videos.toArray());
  }

  ionViewWillLeave() {
    /* Pause All video when user is going to leave the page */
    this.videos.toArray().forEach((v) => v.nativeElement?.pause());
  }

  ionViewDidLeave() {
    this.videoObserverService.disconnect(this.videos.toArray());
  }

  trackByIdentity(index: number, item: Feed) {
    return item.id;
  }

  likeHandler(evt: MouseEvent, index: number) {
    evt.stopPropagation();
    if (this.feeds && index >= 0 && index < this.feeds.length) {
      const item = this.feeds[index];

      if (item.actions.liked) {
        item.actions.likes--;
        item.actions.liked = false;
      } else {
        item.actions.likes++;
        item.actions.liked = true;
      }
    }
  }

  bookmarkHandler(evt: MouseEvent, index: number) {
    evt.stopPropagation();
    if (this.feeds && index >= 0 && index < this.feeds.length) {
      const item = this.feeds[index];

      if (item.actions.bookmarked) {
        item.actions.bookmarks--;
        item.actions.bookmarked = false;
      } else {
        item.actions.bookmarks++;
        item.actions.bookmarked = true;
      }
    }
  }

  commentHandler(evt: MouseEvent, index: number) {
    evt.stopPropagation();
    console.log('comment is clicked: ' + index);
    /* Open a Bottom Drawer with Comments ? another page, etc.. */
  }

  ngOnDestroy() {
    this.ngUnsubscribeFeeds.next(true);
    this.ngUnsubscribeFeeds.complete();
  }
}
