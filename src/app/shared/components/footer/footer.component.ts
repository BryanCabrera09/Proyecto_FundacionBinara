import { Component, OnInit } from '@angular/core';
import { languages } from '../../../core/models/dummy-data';
import { TranslatorService } from '../../services/translator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  selectedLanguage: any;
  public translator: any;

  languages = languages;

  constructor(private translatorService: TranslatorService, private router: Router) {

    this.translator = translatorService;
    /* translatorService.translateText("Hello World How are you").subscribe((data: any) => console.log(data)); */
  }

  ngOnInit() {
    this.selectedLanguage = this.languages[0];
  }

  onChange() {
    console.log(this.translator.lang);
    localStorage.setItem('lamguage', this.translator.lang);
    window.location.reload();
  }

  goToBlogs() {
    this.router.navigate(['user/blogs']);
  }

  goToContact() {
    this.router.navigate(['user/contact-us'])
  }
}
