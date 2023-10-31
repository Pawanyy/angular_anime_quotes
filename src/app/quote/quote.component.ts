import { animate, state, style, transition, trigger } from '@angular/animations';
import { Quote } from '../models/quote';
import { QuoteService } from './../_services/quote.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('rotated => default', animate('1500ms ease-out')),
      transition('default => rotated', animate('400ms ease-in'))
  ])
  ]
})
export class QuoteComponent {

  quote: Quote | null = null;
  errorMessage: string | false = false;
  fetching: boolean = false;

  constructor(private quoteService: QuoteService) {
    this.getQuote();
  }


  refreshRotateState: string = 'default';

    rotate() {
        this.refreshRotateState = (this.refreshRotateState === 'default' ? 'rotated' : 'default');
    }

  getQuote(byUser:boolean = false){
    this.fetching = true;
    this.rotate();
    this.quoteService.getRandomQuote().subscribe((quote)=>{
      console.log(quote)
      this.quote = quote;
      this.fetching = false;
      this.errorMessage = "";
    },(err)=>{
      this.fetching = false;
      console.log(err)
      this.errorMessage = "Coudn't Fetch Quote? Try Again";
    });
  }
}
