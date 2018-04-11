import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  store(key: string, value: any) {
    let data = this.loadAllData() || {};
    data[key] = value;
    localStorage.setItem('stock_watcher', JSON.stringify(data));
  }

  loadAllData() {
    return this.load('all');
  }

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
