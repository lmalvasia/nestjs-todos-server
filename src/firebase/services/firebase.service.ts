import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as firebase from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private firebaseService: firebase.app.App;

  constructor(private readonly configService: ConfigService) {
    console.log(this.configService.get('FIREBASE_PROJECT_ID'));
    this.firebaseService = firebase.initializeApp({
      credential: firebase.credential.cert({
        projectId: this.configService.get('FIREBASE_PROJECT_ID'),
        privateKey: this.configService
          .get('FIREBASE_PRIVATE_KEY')
          .replace(/\\n/gm, '\n'),
        clientEmail: this.configService.get('FIREBASE_CLIENT_EMAIL'),
      }),
    });
  }

  getAuth = (): firebase.auth.Auth => {
    return this.firebaseService.auth();
  };
}
