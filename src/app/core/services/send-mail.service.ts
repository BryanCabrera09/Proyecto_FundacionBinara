import { Injectable } from '@angular/core';
import baserUrl from '../helpers/helperUrl';
import { HttpClient } from '@angular/common/http';
import { ContactUs } from '../models/contact-us';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  contactUrl = `${baserUrl}/sendMail`

  constructor(private http: HttpClient) { }

  sendMail(contact_us: ContactUs) {
    return this.http.post(this.contactUrl + '/contact-us', contact_us);
  }
}
