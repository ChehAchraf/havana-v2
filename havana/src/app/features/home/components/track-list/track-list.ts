import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { TrackService } from '../../../../core/service/track.service';
import { PlayerService } from '../../../../core/service/player-service';
import { Track } from '../../../../core/models/track.model';

import { TrackActions } from '../../../../store/actions/track.actions';
import { selectTracks, selectLoading, selectTotalPages } from '../../../../store/reducers/track.reducer';

import { DurationFormatPipe } from '../../../../shared/pipes/duration-format-pipe-pipe';
import { SearchInput } from '../../../../shared/components/ui/search-input/search-input';

@Component({
    selector: 'app-track-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        DurationFormatPipe,
        SearchInput
    ],
    templateUrl: './track-list.html',
    styleUrls: ['./track-list.css']
})
export class TrackList implements OnInit {

    private store = inject(Store);
    private trackService = inject(TrackService);
    private playerService = inject(PlayerService);

    tracks$: Observable<Track[]> = this.store.select(selectTracks);
    loading$: Observable<boolean> = this.store.select(selectLoading);
    totalPages$: Observable<number> = this.store.select(selectTotalPages);

    currentPage: number = 0;
    currentSearch: string = '';

    isEditModalOpen = false;
    editingTrack: any = {};

    ngOnInit() {
        this.loadTracks();
    }

    loadTracks() {
        this.store.dispatch(TrackActions.loadTracks({
            page: this.currentPage,
            search: this.currentSearch
        }));
    }

    onSearch(query: string) {
        this.currentSearch = query;
        this.currentPage = 0;
        this.loadTracks();
    }

    nextPage() {
        this.currentPage++;
        this.loadTracks();
    }

    prevPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.loadTracks();
        }
    }

    playTrack(track: Track, tracks: Track[]) {
        this.playerService.playTrack(track, tracks);
    }

    delete(id: number | undefined, event: Event) {
        event.stopPropagation();
        if (!id) return;

        if (confirm('Voulez-vous vraiment supprimer cette piste ?')) {
            this.trackService.deleteTrack(id).subscribe({
                next: () => {
                    this.loadTracks();
                },
                error: (err) => console.error('Erreur de suppression:', err)
            });
        }
    }

    editingCover: File | null = null;

    openEditModal(track: any, event: Event) {
        event.stopPropagation();
        this.isEditModalOpen = true;
        this.editingTrack = { ...track };
        this.editingCover = null;
    }

    closeEditModal() {
        this.isEditModalOpen = false;
        this.editingCover = null;
    }

    onEditCoverSelected(target: EventTarget | null) {
        const input = target as HTMLInputElement;
        if (!input.files || input.files.length === 0) return;
        this.editingCover = input.files[0];
    }

    saveEdit() {
        if (this.editingTrack.title && this.editingTrack.artist && this.editingTrack.id) {
            const updatePayload: any = { ...this.editingTrack };
            if (this.editingCover) {
                updatePayload.cover = this.editingCover;
            }

            this.store.dispatch(TrackActions.updateTrack({
                id: this.editingTrack.id,
                track: updatePayload
            }));
            this.isEditModalOpen = false;
        }
    }
}
