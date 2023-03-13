import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseService } from 'src/firebase/services/firebase.service';

@Module({
  providers: [FirebaseService],
  exports: [FirebaseService],
  imports: [ConfigModule],
})
export class FirebaseModule {}
