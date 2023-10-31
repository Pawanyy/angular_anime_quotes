import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Quote } from '../models/quote';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  baseUrl: string = environment.QUOTE_BASE_URL;
  constructor(private client: HttpClient) { }

  getRandomQuote(): Observable<Quote|null>{
    return this.client.get<Quote>(this.baseUrl);
  }

}
