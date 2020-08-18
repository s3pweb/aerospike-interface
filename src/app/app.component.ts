import { Component, OnInit } from '@angular/core';
import { AerospikeService } from './aerospike.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  url = '192.168.10.56:3100';
  connected = false;
  loading = false;
  namespaces = [];
  sets = [];
  namespaceSelected: string;
  setSelected: string;
  keys = [];

  constructor(
    private aerospikeService: AerospikeService
  ) {}

  ngOnInit(): void {

  }

  async connect() {
    this.loading = true;

    if (this.url) {
      console.log('url: ', this.url);

      const result = await this.aerospikeService.connect(this.url);

      if (result) {
        this.connected = true;
        this.namespaces = await this.aerospikeService.getNamespaces();
      }
    }

    this.loading = false;
  }

  async selectNamespace(ns) {
    this.namespaceSelected = ns;
    this.sets = await this.aerospikeService.getSets(ns);
  }

  async selectSet(set) {
    this.setSelected = set;
    this.keys = await this.aerospikeService.getKeys(this.namespaceSelected, this.setSelected);

    console.log('keys: ', this.keys);
  }
}
