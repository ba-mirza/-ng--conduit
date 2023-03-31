import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  getFeedAction,
  getFeedFailureAction,
  getFeedSuccessAction,
} from '../actions/getFeed.action';
import {catchError, map, of, switchMap} from 'rxjs';
import {FeedService} from '../../services/feed.service';
import {GetFeedResponseInterface} from '../../types/getFeedResponse.interface';
import {Injectable} from '@angular/core';

@Injectable()
export class GetFeedEffect {
  getFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFeedAction),
      switchMap(({url}) => {
        return this.feedService.getFeed(url).pipe(
          map((feedResponse: GetFeedResponseInterface) => {
            return getFeedSuccessAction({feed: feedResponse});
          }),
          catchError(() => {
            return of(getFeedFailureAction());
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private feedService: FeedService) {}
}
