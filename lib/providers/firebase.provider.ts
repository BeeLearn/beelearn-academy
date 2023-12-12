import { useRuntimeConfig } from "nuxt/app";

import {
  signInWithEmailAndPassword,
  signInWithEmailLink,
  sendSignInLinkToEmail,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
} from "firebase/auth";

import { type Auth, type UserCredential } from "firebase/auth";

abstract class FirebaseProviderImpl {
  abstract signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserCredential>;
}

export default class FirebaseProvider implements FirebaseProviderImpl {
  private auth: Auth;
  private config: ReturnType<typeof useRuntimeConfig>;
  static instance = new FirebaseProvider();

  private constructor(auth?: Auth) {
    this.auth = auth ?? getAuth();
    this.config = useRuntimeConfig();
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signInWithEmailLink(email: string, emailLink?: string){
    return signInWithEmailLink(this.auth, email, emailLink);
  }

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");

    return signInWithPopup(this.auth, provider);
  }

  sendSignInLinkToEmail(email: string) {
    return sendSignInLinkToEmail(this.auth, email, {
      url: window.location.href + "/onboarding/",
      android: {
        packageName: this.config.androidPackageName as string,
      },
      iOS: {
        bundleId: this.config.iosBundleId as string,
      },
    });
  }
}
