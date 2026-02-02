import { createFeature, createReducer, on } from '@ngrx/store';
import { Track } from '../../core/models/track.model';
import { TrackActions } from '../actions/track.actions';

export interface TrackState {
    tracks: Track[];
    loading: boolean;
    error: string | null;
    currentTrack: Track | null;
    currentPage: number;
    totalPages: number;
}

const initialState: TrackState = {
    tracks: [],
    loading: false,
    error: null,
    currentTrack: null,
    currentPage: 0,
    totalPages: 0
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

        on(TrackActions.loadTracksSuccess, (state, { tracks, totalPages }) => ({
            ...state,
            tracks: tracks,
            totalPages: totalPages,
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
        })),

        on(TrackActions.addTrack, (state) => ({
            ...state,
            loading: true,
            error: null
        })),

        on(TrackActions.addTrackSuccess, (state, { track }) => ({
            ...state,
            loading: false,
            tracks: [...state.tracks, track]
        })),

        on(TrackActions.addTrackFailure, (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        })),

        on(TrackActions.updateTrack, (state) => ({
            ...state,
            loading: true,
            error: null
        })),

        on(TrackActions.updateTrackSuccess, (state, { track }) => ({
            ...state,
            loading: false,
            tracks: state.tracks.map(t => t.id === track.id ? track : t)
        })),

        on(TrackActions.updateTrackFailure, (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }))
    ),
});

export const {
    selectTracks,
    selectLoading,
    selectError,
    selectCurrentTrack,
    selectTotalPages,
    selectCurrentPage
} = trackFeature;
