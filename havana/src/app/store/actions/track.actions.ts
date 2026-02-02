import { createActionGroup, props } from '@ngrx/store';
import { Track } from '../../core/models/track.model';

export const TrackActions = createActionGroup({
    source: 'Track API',
    events: {
        'Load Tracks': props<{ page: number, search: string }>(),
        'Load Tracks Success': props<{ tracks: Track[], totalPages: number }>(),
        'Load Tracks Failure': props<{ error: string }>(),
        'Play Track': props<{ track: Track }>(),
        'Add Track': props<{ track: Track }>(),
        'Add Track Success': props<{ track: Track }>(),
        'Add Track Failure': props<{ error: string }>(),
        'Update Track': props<{ id: number, track: Partial<Track> }>(),
        'Update Track Success': props<{ track: Track }>(),
        'Update Track Failure': props<{ error: string }>(),
    }
})
