import { BadGatewayException, Injectable } from '@nestjs/common';
import Web3 from 'web3';

@Injectable()
export class SyncStateService {
  async getSyncState(): Promise<number> {
    try {
      const web3 = new Web3(process.env.WEB3_PROVIDER);
      const blockNumber = await web3.eth.getBlockNumber();
      return blockNumber;
    } catch (error) {
      console.error(error);
      throw new BadGatewayException();
    }
  }
}