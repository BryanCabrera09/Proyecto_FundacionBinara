import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  sendMailForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.sendMailForm = this.startForm();
  }

  startForm(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required],
    });
  }

  sendMail() {

  }
}
