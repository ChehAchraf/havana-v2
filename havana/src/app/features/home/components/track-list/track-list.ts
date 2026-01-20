import { Component, computed, effect, inject, signal } from '@angular/core';
import { TrackService } from '../../../../core/service/track.service';
import { Track } from '../../../../core/models/track.model';
import { PlayerService } from '../../../../core/service/player-service';
import { DurationFormatPipe } from '../../../../shared/pipes/duration-format-pipe-pipe';
import { SearchInput } from '../../../../shared/components/ui/search-input/search-input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-track-list',
    imports: [DurationFormatPipe, SearchInput, CommonModule, FormsModule],
    templateUrl: './track-list.html',
    styleUrl: './track-list.css',
})
export class TrackList {

    public trackService = inject(TrackService);
    private playerService = inject(PlayerService)
    currentPage = signal<number>(1)
    itemsPerPage: number = 6;
    dataTrack: Track[] = []
    isEditModalOpen = false;
    editingTrack: any = {};

    constructor() {
        effect(() => {
            const query = this.trackService.searchQuery();
            this.currentPage.set(1);
        }, { allowSignalWrites: true });
    }


    filteredTracks = computed(() => {
        const query = this.trackService.searchQuery().toLowerCase();
        const allTracks = this.trackService.tracks();

        if (!query) return allTracks;

        return allTracks.filter(track =>
            track.title.toLowerCase().includes(query) ||
            track.artist.toLowerCase().includes(query)
        );
    });

    shownTracks = computed(() => {
        const startIndex = (this.currentPage() - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;

        return this.filteredTracks().slice(startIndex, endIndex);
    });

    totalPages = computed(() => {
        return Math.ceil(this.filteredTracks().length / this.itemsPerPage);
    });

    openEditModal(track: any, event: Event) {
        event.stopPropagation();
        this.isEditModalOpen = true;
        this.editingTrack = { ...track };
    }

    async saveEdit() {
        if (this.editingTrack.title && this.editingTrack.artist) {
            await this.trackService.updateTrack(this.editingTrack);
            this.isEditModalOpen = false;
        }
    }

    closeEditModal() {
        this.isEditModalOpen = false;
    }



    nextPage() {
        if (this.currentPage() < this.totalPages()) {
            this.currentPage.update(p => p + 1);
        }
    }

    prevPage() {
        if (this.currentPage() > 1) {
            this.currentPage.update(p => p - 1);
        }
    }

    ngOnInit() {
        this.trackService.loadTracks();
    }

    playTrack(track: any) {
        this.playerService.playTrack(track);
    }

    async delete(id: number | undefined, event: Event) {
        event.stopPropagation()
        if (!id) return;
        if (confirm('Do you want to delelet this song?')) {
            await this.trackService.removeTrack(id);
        }
    }

}
