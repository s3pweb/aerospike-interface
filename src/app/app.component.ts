import {Component, OnInit} from '@angular/core';
import {AerospikeService} from './aerospike.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  apiUrl = 'http://localhost:3000';
  url = '192.168.10.56:3100';
  connected = false;
  hasError = false;
  errorMessage = '';
  loading = false;
  namespaces = [];
  sets = [];
  namespaceSelected: string;
  setSelected: string;
  keys = [];

  constructor(
    private aerospikeService: AerospikeService,
  ) {
    // -- Empty
  }

  ngOnInit(): void {
    // -- Empty
  }

  async connect() {
    this.loading = true;
    this.hasError = false;
    this.errorMessage = '';

    if (this.url) {
      try {
        const result = await this.aerospikeService.connect(this.apiUrl, this.url);

        if (result) {
          this.connected = true;
          this.namespaces = await this.aerospikeService.getNamespaces();
        }
      } catch (err) {
        this.handleError(err);
      }
    }

    this.loading = false;
  }

  async selectNamespace(ns) {
    this.namespaceSelected = ns;
    try {
      this.sets = await this.aerospikeService.getSets(ns);
    } catch (err) {
      this.handleError(err);
    }
  }

  async selectSet(set) {
    this.setSelected = set;

    try {
      this.keys = await this.aerospikeService.getKeys(this.namespaceSelected, this.setSelected);
    } catch (err) {
      this.handleError(err);
    }
  }

  handleError(err) {
    this.connected = false;
    this.namespaces = [];
    this.namespaceSelected = null;
    this.sets = [];
    this.setSelected = null;
    this.keys = [];
    // Display error message
    this.hasError = true;
    this.errorMessage = err.message;
  }
}
