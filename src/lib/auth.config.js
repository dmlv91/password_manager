export const authConfig = {
    pages: {
        signIn: "/login",
    },
    providers: [],
    callbacks:{
        async jwt({token,user}){
            if(user) {
                token.id = user._id;
                token.isAdmin = user.isAdmin;
            }
            return token;
        },
        async session({session,token}){
            if (token) {
                session.user.id = token.id;
                session.user.isAdmin = token.isAdmin;
            }
            return session

        },
        authorized({auth, request}) {
            const user = auth?.user;
            const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
            const isOnVaultPage = request.nextUrl?.pathname.startsWith("/vault");
            const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

            //Only admin has adminPanel

            if (isOnAdminPanel && !user?.isAdmin) {
                return false;
            }

            //Only registered users have Vault

            if(isOnVaultPage && !user){
                return false;
            }

            //Only unauthorized users can see login page

            if (isOnLoginPage && user){
                return Response.redirect(new URL("/",request.nextUrl));
            }

            return true;

        },
    },
};