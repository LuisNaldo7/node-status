import { Module } from '@nestjs/common';
import { SyncStateController } from './handler/controller/sync-state.controller';
import { SyncStateService } from './application/sync-state.service';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RateLimiterGuard, RateLimiterModule } from 'nestjs-rate-limiter';
@Module({
  imports: [ConfigModule.forRoot(), RateLimiterModule],
  controllers: [SyncStateController],
  providers: [
    SyncStateService,
    {
      provide: APP_GUARD,
      useClass: RateLimiterGuard,
    },
  ],
})
export class AppModule {}
