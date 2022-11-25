import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Collaborator } from 'src/app/models/collaborator';
import { CollaboratorService } from 'src/app/services/collaborator.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-nedit-collaborator',
  templateUrl: './edit-collaborator.component.html',
  styleUrls: ['./edit-collaborator.component.css']
})
export class EditCollaboratorComponent implements OnInit {


  public isLoadUpload: boolean = false;

  public collaborator!: Collaborator;

  constructor(fb: FormBuilder,
    private notification: NotificationService,
    private collaboratorService: CollaboratorService,
    private router: Router,
    private route: ActivatedRoute,
    private uploadService: UploadService
    // para pegar o id na rota
    )
     {}

     ngOnInit(): void{
      this.initializeFields();
     }

  private initializeFields():void {
    const id = this.route.snapshot.params["id"];
    this.collaboratorService.findById(id).subscribe(collaborator => {
      this.collaborator = collaborator;
    })
  }  


    public updateColladorator(form: NgForm): void {
      if(form.valid) {
        this.collaboratorService.updateCollaborator(this.collaborator).subscribe(response => {
          this.notification.showMessage("Atualizado com sucesso.");
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
          this.collaborator.fotoUrl = fotoUrl;
          console.log(fotoUrl);
        })
      });
    }
  }

