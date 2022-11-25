import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from 'src/app/components/details/details.component';
import { Collaborator } from 'src/app/models/collaborator';
import { CollaboratorService } from 'src/app/services/collaborator.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns = ['foto', 'nome', 'email', 'cpf', 'cargo', 'setor', 'excluir', 'editar', 'detalhes'];
  dataSource: Collaborator[] = [];

  constructor(
    private collaboratorService: CollaboratorService,
    private notification: NotificationService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.initializeTable();
  }

  private initializeTable():void {
    this.collaboratorService.findAll().subscribe(collaborators =>{
      this.dataSource = collaborators;
    });
  }

  public deleteColladorator(id: string): void {
    this.collaboratorService.deleteColladorator(id).subscribe(response => {
      this.notification.showMessage("Apagado.");
      this.initializeTable();
    });
  }

  public openDetails(collaborator: Collaborator): void {
    this.dialog.open(DetailsComponent, {
      //objeto de configuração da janela abaixo
      width: "400px",
      data: collaborator// data é o atributo para mostrar o dados
    })

  }
}
