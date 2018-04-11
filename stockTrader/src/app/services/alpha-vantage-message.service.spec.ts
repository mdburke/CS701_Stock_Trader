import { TestBed, inject } from '@angular/core/testing';

import { AlphaVantageMessageService } from './alpha-vantage-message.service';

describe('AlphaVantageMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlphaVantageMessageService]
    });
  });

  it('should be created', inject([AlphaVantageMessageService], (service: AlphaVantageMessageService) => {
    expect(service).toBeTruthy();
  }));
});
