import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Collaborator } from 'src/app/models/collaborator';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
              //injetando com MAT_DIALOG_DATA, para que seja possivel pegar as informações de Collaborator para um componente
  constructor(@Inject(MAT_DIALOG_DATA) public collaborator: Collaborator) { }

  ngOnInit(): void {
  }

}
