import { Injectable } from '@angular/core';

// Service for dealing with local storage
@Injectable()
export class StorageService {

  constructor() { }

  // Store/update the specified key in local storage
  store(key: string, value: any) {
    let data = this.loadAllData() || {};
    data[key] = value;
    localStorage.setItem('stock_watcher', JSON.stringify(data));
  }

  // Convenience method to load all the data
  loadAllData() {
    return this.load('all');
  }

  // Load specified key from local storage
  load(key: string) {
    let data: any = null;
    if (localStorage.getItem("stock_watcher")) {
      data = JSON.parse(localStorage.getItem("stock_watcher"));
      if (key === 'all') { return data; }
      data = data[key];
    }
    return data;
  }

}
