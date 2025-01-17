import { lazy, Suspense } from "react";
import { Route, Router, Switch } from "wouter";
import AuthPage from "./auth.tsx";
import MediaPage from "./media.tsx";

const AdminPage = lazy(
   () => import("./admin.tsx"))

export default function Routes() {
   return (
      <Router>
         <Switch>
            <Route path="/">
               <h1>Hello World</h1>
            </Route>
            <Route path="/media" component={MediaPage} />
            <Route path="/auth" component={AuthPage} />
            <Route path="/admin/*?">
               <Suspense fallback={<div>Loading...</div>}>
                  <AdminPage />
               </Suspense>
            </Route>
         </Switch>
      </Router>
   )
}