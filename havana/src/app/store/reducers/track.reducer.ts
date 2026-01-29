import { createFeature, createReducer, on } from '@ngrx/store';
import {Track} from '../../core/models/track.model';
import {TrackActions} from '../actions/track.actions';

export interface TrackState {
    tracks: Track[];
    loading: boolean;
    error: string | null;
    currentTrack: Track | null;
    currentPage: number;
}

const initialState: TrackState = {
    tracks: [],
    loading: false,
    error: null,
    currentTrack: null,
    currentPage: 0
};

export const trackFeature = createFeature({
    name: 'track',
    reducer: createReducer(
        initialState,

        on(TrackActions.loadTracks, (state, { page }) => ({
            ...state,
            loading: true,
            error: null,
            currentPage: page
        })),

        on(TrackActions.loadTracksSuccess, (state, { tracks }) => ({
            ...state,
            tracks: tracks,
            loading: false
        })),

        on(TrackActions.loadTracksFailure, (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        })),

        on(TrackActions.playTrack, (state, { track }) => ({
            ...state,
            currentTrack: track
        }))
    ),
});

export const {
    selectTracks,
    selectLoading,
    selectError,
    selectCurrentTrack
} = trackFeature;
