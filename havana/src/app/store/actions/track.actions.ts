import {createActionGroup, props} from '@ngrx/store';
import {Track} from '../../core/models/track.model';

export const TrackActions = createActionGroup({
    source: 'Track API',
    events : {
        'Load Tracks': props<{ page: number, search: string }>(),
        'Load Tracks Success': props<{ tracks: Track[], totalPages: number }>(),
        'Load Tracks Failure': props<{ error: string }>(),
        'Play Track': props<{ track: Track }>(),
    }
})
