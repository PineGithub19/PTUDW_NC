import { Injectable } from '@nestjs/common';
import * as net from 'net';

@Injectable()
export class LogstashService {
  private client: net.Socket;

  constructor() {
    const host = process.env.LOGSTASH_HOST || 'localhost';
    const port = Number(process.env.LOGSTASH_PORT || 5000);
    this.client = new net.Socket();

    this.client.connect(port, host, () => {
      console.log(`Connected to Logstash at ${host}:${port}`);
    });

    this.client.on('error', (err) => {
      console.error('Logstash connection error:', err);
    });
  }

  log(data: any) {
    try {
      this.client.write(JSON.stringify(data) + '\n');
    } catch (error) {
      console.error('Error sending log:', error);
    }
  }
}
