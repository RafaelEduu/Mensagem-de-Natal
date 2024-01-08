import "next-auth";

declare module "next-auth" {
    interface Session {
      user: {
        id: number,
        userName: string,
        name: string,
        email: string,
        address: string,
        accessToken: string,
        idToken: string,
        image: string
      }
    }
}