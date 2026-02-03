import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TrackService } from '../../../core/service/track.service';
import { Router } from '@angular/router';
import { Track } from '../../../core/models/track.model';
import { NgIcon } from '@ng-icons/core';
import { Store } from '@ngrx/store';
import { TrackActions } from '../../../store/actions/track.actions';
import { selectError, selectLoading } from '../../../store/reducers/track.reducer';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-add-track',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-track.html',
  styleUrl: './add-track.css',
})
export class AddTrackComponent {

  private fb = inject(FormBuilder)
  private store = inject(Store)



  isSubmiting = toSignal(this.store.select(selectLoading), { initialValue: false });
  error = toSignal(this.store.select(selectError), { initialValue: null });

  fileError = signal<string>('')

  trackForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    artist: ['', Validators.required],
    description: ['', Validators.maxLength(200)],
    genre: ['Pop', Validators.required],
  })

  selectedFile: File | null = null;
  fileDuration: number = 0;

  onFileSelected(target: EventTarget | null) {
    const input = target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.fileError.set('');

    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        this.fileError.set('File size must be less than 10MB');
        return;
      }

      const validTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg'];
      if (!validTypes.includes(file.type)) {
        this.fileError.set(`Invalid file format: ${file.type}. Only MP3, WAV, OGG allowed.`);
        return;
      }

      this.selectedFile = file;
      this.calculateDuration(file);
    }
  }

  private calculateDuration(file: File) {
    const audio = new Audio();
    audio.src = URL.createObjectURL(file);

    audio.onloadedmetadata = () => {
      this.fileDuration = Math.round(audio.duration);
      URL.revokeObjectURL(audio.src);
    };
  }

  async onSubmit() {
    if (this.trackForm.invalid || !this.selectedFile) return;

    const newTrack: Track = {
      title: this.trackForm.value.title!,
      artist: this.trackForm.value.artist!,
      description: this.trackForm.value.description || '',
      genre: this.trackForm.value.genre!,
      duration: this.fileDuration,
      file: this.selectedFile,
      createdAt: new Date()
    };

    this.store.dispatch(TrackActions.addTrack({ track: newTrack }));
  }

}
