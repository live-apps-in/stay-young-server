import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      appName: 'StayYoung Server',
      prodPort: 5008,
    };
  }
}
