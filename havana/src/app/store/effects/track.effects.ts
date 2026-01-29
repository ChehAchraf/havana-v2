import {inject, Injectable} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {TrackService} from '../../core/service/track.service';
import {TrackActions} from '../actions/track.actions';
import {catchError, map, of, switchMap} from 'rxjs';

@Injectable()
export class TrackEffects {
    private actions$ = inject(Actions);
    private trackService = inject(TrackService);

    loadTracks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TrackActions.loadTracks),
            switchMap(({ page, search }) =>
                this.trackService.getAllTracks(search, page).pipe(
                    map(response => TrackActions.loadTracksSuccess({
                        tracks: response.content,
                        totalPages: response.totalPages
                    })),
                    catchError(error => of(TrackActions.loadTracksFailure({ error: error.message })))
                )
            )
        )
    );
}
