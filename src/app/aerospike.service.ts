import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AerospikeService {
  apiUrl = 'http://localhost:3000';

  constructor() { }

  async connect(url) {
    try {
      const result = await fetch(`${this.apiUrl}/connect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      });

      const response = await result.json();

      if (response.success) {
        return true;
      }
    } catch (err) {
      console.error('error in connect: ', err);
    }

    return null;
  }

  async getNamespaces() {
    try {
      const result = await fetch(`${this.apiUrl}/namespaces`);

      const response = await result.json();

      if (response) {
        return response;
      }
    } catch (err) {
      console.error('error in connect: ', err);
    }

    return null;
  }

  async getSets(ns) {
    try {
      const result = await fetch(`${this.apiUrl}/${ns}/sets`);

      const response = await result.json();

      if (response) {
        return response;
      }
    } catch (err) {
      console.error('error in connect: ', err);
    }

    return null;
  }

  async getKeys(ns, set) {
    try {
      const result = await fetch(`${this.apiUrl}/keys?namespace=${ns}&set=${set}`);

      const response = await result.json();

      if (response) {
        return response;
      }
    } catch (err) {
      console.error('error in connect: ', err);
    }

    return null;
  }
}
