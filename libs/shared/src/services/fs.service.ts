import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FsService {
  private readonly filePath: string;
  private readonly inputs: Array<{
    id: string;
    text: string;
    dateTime: string;
  }>;

  constructor() {
    // Define the file path using the project's root directory and specify a .json file
    const projectRoot = process.cwd();
    this.filePath = path.join(projectRoot, 'file.json');

    // Initialize the inputs list
    this.inputs = [];

    // Load the existing JSON data from the file if it exists
    if (fs.existsSync(this.filePath)) {
      const content = fs.readFileSync(this.filePath, 'utf-8');
      // Parse the JSON content and set it as the inputs list
      this.inputs = JSON.parse(content);
    }
  }

  // Method to append text to file.json and update the inputs list
  appendText(text: string): void {
    // Create a new document with a UUID, text, and current date and time
    const newDocument = {
      id: uuid.v4(),
      text,
      dateTime: new Date().toISOString(),
    };

    // Add the new document to the inputs list
    this.inputs.push(newDocument);

    // Convert the inputs list to JSON format
    const content = JSON.stringify(this.inputs, null, 2); // Pretty-printing JSON

    // Write the JSON content to file.json
    fs.writeFileSync(this.filePath, content, 'utf-8');
  }
}
