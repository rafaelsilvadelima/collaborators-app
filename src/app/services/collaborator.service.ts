import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
//import { map } from '@firebase/util';
import { catchError, from, Observable, EMPTY, map } from 'rxjs';
import { Collaborator } from '../models/collaborator';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  constructor(
    private firestore: AngularFirestore,
    private notification: NotificationService
  ) { }

  public createCollaborator(collaborator: Collaborator): Observable<any>{
    const promise = this.firestore.collection("collaborator").add(collaborator);
    return from(promise).pipe(
      catchError(erro => {
        this.notification.showMessage("Erro ao cadastrar.");
        console.error(erro);
        return EMPTY;

        
      })
    )
  }

  public findAll(): Observable<any> {
    const promise = this.firestore.collection("collaborator").get();
    return from(promise).pipe(
      map((response: any) => {
        return response.docs.map((doc: any) => {
          const collaborator: Collaborator = doc.data() as Collaborator;
          collaborator.id = doc.id;
          return collaborator;
        })
      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar dados.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public findById(id: string): Observable<any> {
    const promise = this.firestore.collection("collaborator").doc(id).get();
    return from(promise).pipe(
      map(doc => {
        const collaborator: Collaborator = doc.data() as Collaborator;
        collaborator.id = doc.id
        return collaborator;
      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar o id");
        console.error(error);
        return EMPTY;
      })
    )
  }

  public deleteColladorator(id: string) {
    const promise =  this.firestore.collection("collaborator").doc(id).delete();
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao excluir.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public updateCollaborator(collaborator: Collaborator) {
    const promise = this.firestore.collection("collaborator").doc(collaborator.id).update(collaborator);
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao atualizar.");
        console.error(error);
        return EMPTY;
      })
    );
  }
}
