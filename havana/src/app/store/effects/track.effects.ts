import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TrackService } from '../../core/service/track.service';
import { TrackActions } from '../actions/track.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TrackEffects {
    private actions$ = inject(Actions);
    private trackService = inject(TrackService);
    private router = inject(Router);

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

    addTrack$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TrackActions.addTrack),
            switchMap(({ track }) =>
                this.trackService.addTrack(track).pipe(
                    map(newTrack => TrackActions.addTrackSuccess({ track: newTrack })),
                    catchError(error => of(TrackActions.addTrackFailure({ error: error.message })))
                )
            )
        )
    );

    updateTrack$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TrackActions.updateTrack),
            switchMap(({ id, track }) =>
                this.trackService.updateTrack(id, track).pipe(
                    map(updatedTrack => TrackActions.updateTrackSuccess({ track: updatedTrack })),
                    catchError(error => of(TrackActions.updateTrackFailure({ error: error.message })))
                )
            )
        )
    );

    addTrackSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TrackActions.addTrackSuccess),
            tap(() => this.router.navigate(['/']))
        ),
        { dispatch: false }
    );
}
