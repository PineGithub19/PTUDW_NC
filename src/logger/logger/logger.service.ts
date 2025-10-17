import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

@Injectable()
export class LoggerService {
  private readonly logDir = path.join(process.cwd(), 'src', 'logs');

  async search(date: string): Promise<string[]> {
    const startOfDay = new Date(`${date}T00:00:00`);
    const endOfDay = new Date(`${date}T23:59:59.999`);
    const results: string[] = [];

    // Read all files in the logger directory
    const files = await fs.promises.readdir(this.logDir);

    // Filter files that match the date pattern (e.g., logger_2025-10-17.log or logger_2025-10-17-1.log)
    const targetFiles = files.filter((file) =>
      file.startsWith(`logger_${date}`),
    );

    for (const file of targetFiles) {
      const filePath = path.join(this.logDir, file);
      const fileStream = fs.createReadStream(filePath);

      // Create a readline interface to read the file line by line
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity, // Handle all line endings
      });

      // Process each line
      for await (const line of rl) {
        try {
          // Parse the JSON log line
          const logEntry = JSON.parse(line);

          // Check if the timestamp starts with the specified date
          if (logEntry.timestamp) {
            const date = new Date(logEntry.timestamp);
            if (date >= startOfDay && date <= endOfDay) {
              results.push(JSON.parse(line));
            }
          }
        } catch (error) {
          // Skip invalid JSON lines
          console.error(`Failed to parse log line in ${file}:`, error.message);
        }
      }

      // Close the stream
      rl.close();
      fileStream.close();
    }

    return results;
  }
}
