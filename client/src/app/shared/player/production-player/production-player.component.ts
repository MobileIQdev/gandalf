import { SimpleChanges } from '@angular/core';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { SynchronizedPlayerConfiguration } from '../synchronized-player-configuration';

@Component({
    selector: 'app-production-player',
    templateUrl: './production-player.component.html',
    styleUrls: ['./production-player.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductionPlayerComponent {
    @Input() systemTimeOffset!: number;
    @Input() videoId!: string;

    public isPaused = true;
    public fullscreen$ = new Subject();
    public config = new SynchronizedPlayerConfiguration();

    ngOnChanges(changes: SimpleChanges) {
        if (changes.systemTimeOffset) {
            this.config = {
                ...this.config,
                synchronisationOffset: this.systemTimeOffset,
            };
        }
    }
}
