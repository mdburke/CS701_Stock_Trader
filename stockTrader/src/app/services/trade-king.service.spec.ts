import { TestBed, inject } from '@angular/core/testing';

import { TradeKingService } from './trade-king-service.service';

describe('TradeKingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TradeKingService]
    });
  });

  it('should be created', inject([TradeKingService], (service: TradeKingService) => {
    expect(service).toBeTruthy();
  }));
});
