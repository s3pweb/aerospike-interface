import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AerospikeService {
  apiUrl = 'http://localhost:3000';

  constructor() {
    // -- Empty
  }

  async connect(apiUrl, url) {
    this.apiUrl = apiUrl;

    const result = await fetch(`${this.apiUrl}/connect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({url}),
    });

    const response = await result.json();

    if (!result.ok) {
      throw new Error(response.message);
    }

    return response.success;
  }

  async getNamespaces() {
    const result = await fetch(`${this.apiUrl}/namespaces`);
    const response = await result.json();

    if (!result.ok) {
      throw new Error(response.message);
    }

    return response;
  }

  async getSets(ns) {
    const result = await fetch(`${this.apiUrl}/${ns}/sets`);
    const response = await result.json();

    if (!result.ok) {
      throw new Error(response.message);
    }

    return response;
  }

  async getKeys(ns, set) {
    const result = await fetch(`${this.apiUrl}/keys?namespace=${ns}&set=${set}`);
    const response = await result.json();

    if (!result.ok) {
      throw new Error(response.message);
    }

    return response;
  }
}
