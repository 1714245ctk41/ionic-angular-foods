import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
// import { User } from "./models/user.model";
// import { AngularFireAuth } from "@angular/fire/auth";

const routes: Routes = [
  {
    path: "tabs",
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/authentication/login/login.module").then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: "register",
    loadChildren: () =>
      import("./pages/authentication/register/register.module").then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: "intro",
    loadChildren: () =>
      import("./pages/intro/intro.module").then((m) => m.IntroPageModule),
  },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {
    path: 'detail-product/:productname',
    loadChildren: () => import('./pages/detail-product/detail-product.module').then( m => m.DetailProductPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./pages/history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'thanhtoan',
    loadChildren: () => import('./pages/thanhtoan/thanhtoan.module').then( m => m.ThanhtoanPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
