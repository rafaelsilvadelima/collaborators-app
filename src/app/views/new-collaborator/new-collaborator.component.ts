import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Collaborator } from 'src/app/models/collaborator';
import { CollaboratorService } from 'src/app/services/collaborator.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-new-collaborator',
  templateUrl: './new-collaborator.component.html',
  styleUrls: ['./new-collaborator.component.css']
})
export class NewCollaboratorComponent {
  private fotoUrl: string = "";
  public isLoadUpload: boolean = false;

  public formCollaborator: FormGroup;

  constructor(fb: FormBuilder,
    private notification: NotificationService,
    private collaboradorService: CollaboratorService,
    private router: Router,
    private uploadService: UploadService
    ) {
    this.formCollaborator = fb.group({
      nome: ["", [Validators.required, Validators.maxLength(70)]],
      cpf: ["", [Validators.required]],
      dataNascimento: ["", [Validators.required]],
      cargo: ["", [Validators.required]],
      setor: ["", [Validators.required]],
      estado: ["", [Validators.required]],
      cidade: ["", [Validators.required]],
      remuneracao: ["", [Validators.required, Validators.min(0)]],
      email: ["", [Validators.required, Validators.email]]

    })
   }


   
  public createCollaborator(): void {
    if(this.formCollaborator.valid) {
      const collaborator: Collaborator = this.formCollaborator.value;
      collaborator.fotoUrl = this.fotoUrl;
      this.collaboradorService.createCollaborator(collaborator).subscribe(response =>{
        this.notification.showMessage("Cadastrado com sucesso");
        this.router.navigate(["/dashboard"]);
      });  
    }
    else {
      this.notification.showMessage("Dados inválidos.");
    }

    
  }

    public uploadFile(event: any): void {
      this.isLoadUpload = true;
      const file: File = event.target.files[0];
      this.uploadService.uploadFoto(file).subscribe(uploadResult  => {
        this.isLoadUpload = false;
        const storageReference = uploadResult.ref;
        const promiseFileUrl = storageReference.getDownloadURL();
        promiseFileUrl.then((fotoUrl: string) => {
          this.fotoUrl = fotoUrl;
          console.log(fotoUrl);
        })
      });
    }
}
