import { Controller, Get } from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { RateLimit } from 'nestjs-rate-limiter';
import { SyncStateService } from '../../application/sync-state.service';

@ApiTags('Sync State')
@Controller('sync-state')
export class SyncStateController {
  constructor(private readonly syncStateService: SyncStateService) {}

  @Get('eth1')
  @RateLimit({
    keyPrefix: 'sync-state-eth1',
    points: 1,
    duration: 10,
    errorMessage:
      'Sync state cannot be called more than once every 10 seconds.',
  })
  @ApiOperation({
    summary: 'Queries the current block number.',
    description: 'Queries the current block number from an eth1 node.',
  })
  @ApiOkResponse({ description: 'State successfully returned.' })
  @ApiBadGatewayResponse({ description: 'Bad gateway.' })
  @ApiTooManyRequestsResponse({ description: 'Too many requests.' })
  async getSyncStateEth1(): Promise<number> {
    return this.syncStateService.getSyncStateEth1();
  }

  @Get('eth2')
  @RateLimit({
    keyPrefix: 'sync-state-eth2',
    points: 1,
    duration: 10,
    errorMessage:
      'Sync state cannot be called more than once every 10 seconds.',
  })
  @ApiOperation({
    summary: 'Queries the current block number.',
    description: 'Queries the current block number from an eth1 node.',
  })
  @ApiOkResponse({ description: 'State successfully returned.' })
  @ApiBadGatewayResponse({ description: 'Bad gateway.' })
  @ApiTooManyRequestsResponse({ description: 'Too many requests.' })
  async getSyncStateEth2(): Promise<any> {
    return this.syncStateService.getSyncStateEth2();
  }
}
