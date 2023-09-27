import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ParametrosService } from 'src/app/core/services/parametros.service';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent implements OnInit {

  formInfo!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: DialogRef,
  private fb: FormBuilder, private paramsServ: ParametrosService) { }

  ngOnInit(): void {
    this.formInfo = this.startForm();
    console.log(this.data)
    this.patchFormWithData();
  }

  startForm(): FormGroup {
    return this.fb.group({
      mission: ['', [Validators.required, Validators.maxLength(500)]],
      vision: ['', [Validators.required, Validators.maxLength(500)]], 
      aboutUs: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  patchFormWithData() {
    this.formInfo.patchValue({
      mission: this.data.info.mission.texto1,
      vision: this.data.info.vision.texto1,
      aboutUs: this.data.info.aboutUs.texto1
    });
  }

  isInvalidForm(controlName: string): boolean {
    const control = this.formInfo.get(controlName);
    return !!control && control.invalid && control.touched;
  }

  markAllFieldsAsTouched() {
    Object.values(this.formInfo.controls).forEach(control => {
      control.markAsTouched();
    });
  }
  
  closeDialog() {
    this.dialogRef.close();
  }

  editar() {
    this.markAllFieldsAsTouched();
    this.data.info.mission.texto1 = this.formInfo.get('mission')?.value;
    this.data.info.vision.texto1 = this.formInfo.get('vision')?.value;
    this.data.info.aboutUs.texto1 = this.formInfo.get('aboutUs')?.value;
    this.paramsServ.editparm(this.data.info.mission._id, this.data.info.mission).subscribe(
      (res) => {
        this.closeDialog();
      }
    )
    this.paramsServ.editparm(this.data.info.vision._id, this.data.info.vision).subscribe(
      (res) => {
        this.closeDialog();
      }
    )
    this.paramsServ.editparm(this.data.info.aboutUs._id, this.data.info.aboutUs).subscribe(
      (res) => {
        this.closeDialog();
      }
    )
  }

  


}
