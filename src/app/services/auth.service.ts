import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from, EMPTY } from 'rxjs';
import { GoogleAuthProvider } from 'firebase/auth';
import { User } from '../models/user';
import { catchError } from 'rxjs/operators';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private firebaseAuth: AngularFireAuth,
    private notification: NotificationService

    ) { }
  public authenticateByGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider();
    const promise = this.firebaseAuth.signInWithPopup(provider); // Retorna uma promise
    return from(promise).pipe( // Converter a promise em um observable
      catchError(error => {
        this.notification.showMessage("Erro ao autenticar com Google.");
        console.error(error);
        return EMPTY;
      })
    )
  }

  authenticateByEmailAndPassword(user: User): Observable<any> {
    //const senha = user.senha;
    //const email = user.email;
    const {email, senha} = user;
    const promise = this.firebaseAuth.signInWithEmailAndPassword(email,senha)
    return from(promise).pipe(
      catchError(error => {
        if(error.code == "auth/user-not-found"){
          this.notification.showMessage("Usuario não cadastrado.");

        }else if (error.code == "auth/wrong-password"){
          this.notification.showMessage("senha incorreta.");

        } else {
          this.notification.showMessage("Error ao autenticar.");
          console.error(error);
        }

        this.notification.showMessage("Erro ao autenticar");
        console.error(error);
        return EMPTY;
      })
    )
  }

  createByEmailAndPassword(user: User): Observable<any> {
    const {email,senha} = user;
    const promise = this.firebaseAuth.createUserWithEmailAndPassword(email, senha);
    return from (promise).pipe(
    catchError(error => {
      this.notification.showMessage("Erro ao cadastrar o usuário.");
      console.error(error);
      return EMPTY;
    })
    );
}

logout() {
  const promisse = this.firebaseAuth.signOut();
  return from(promisse);
}

}
