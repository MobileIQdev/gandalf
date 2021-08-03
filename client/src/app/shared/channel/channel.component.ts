import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import { PusherService } from 'src/app/core/pusher.service';

@Component({
    selector: 'app-channel',
    templateUrl: './channel.component.html',
    styleUrls: ['./channel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelComponent {
    constructor(
        public readonly pusherService: PusherService,
        private readonly changeDetectorRef: ChangeDetectorRef
    ) {}

    public forceLeader = false;
    public channelId = 'abcdef';

    public status: 'idle' | 'starting' | 'started' = 'idle';
    public async start() {
        this.status = 'starting';
        await this.pusherService.initialize(this.channelId, this.forceLeader);
        this.status = 'started';
        this.changeDetectorRef.markForCheck();
        this.syncTime();
    }

    public videoId = 'BBGEG21CGo0';
    public systemTimeOffset?: number;
    public syncingTime?: Promise<number | undefined>;
    public async syncTime() {
        this.syncingTime = this.pusherService.getTimeOffset();

        const offset = await this.syncingTime;
        this.syncingTime = undefined;
        if (typeof offset !== 'number') {
            console.log('Mode not set!');
            return;
        }
        this.systemTimeOffset = offset;
        this.changeDetectorRef.markForCheck();
    }
}