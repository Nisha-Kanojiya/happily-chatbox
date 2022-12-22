import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuardService } from './services/authguard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(h => h.HomeModule)
  },
  {
    path: 'plans',
    loadChildren: () => import('./pages/plans/plans.module').then(h => h.PlansModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(l => l.LogInModule)
  },
  {
    path: 'pages', children: [
      {
        path: 'solutions-list/:id',
        loadChildren: () => import('./pages/solutions-list/solutions-list.module').then(sl => sl.SolutionsListModule)
      },
      {
        path: 'network',
        loadChildren: () => import('./pages/network/network.module').then(n => n.NetworkModule)
      },
      {
        path: 'support',
        loadChildren: () => import('./pages/support/support.module').then(s => s.SupportModule)
      }
    ],
    canActivate: [AuthGuardService]
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then(s => s.SignUpModule),
  },
  {
    path: 'privacy-protected-test',
    loadChildren: () => import('./pages/privacy-protected-test/privacy-protected-test.module').then(p => p.PrivacyProtectedTestModule)
  },
  {
    path: 'question-page',
    loadChildren: () => import('./pages/question-page/question-page.module').then(q => q.QuestionModule)
  },
  
  // {
  //   path: 'welcome-user',
  //   loadChildren: () => import('./pages/welcome-user/welcome-user.module').then(we => we.WelcomeModule)
  // },
  {
    path: 'result',
    loadChildren: () => import('./pages/result/result.module').then(r => r.ResultModule)
  },
  {
    path: 'show-result',
    loadChildren: () => import('./pages/show-result/show-result.module').then(sh => sh.ShowResultModule)
  },
  {
    path: 'result-emotional',
    loadChildren: () => import('./pages/result-emotional/result-emotional.module').then(re => re.ResultEmotionalModule)
  },
  {
    path: 'solutions',
    loadChildren: () => import('./pages/solutions/solutions.module').then(s => s.SolutionsModule)
  },
  {
    path: 'more-benefits',
    loadChildren: () => import('./pages/more-benefits/more-benefits.module').then(mr => mr.MoreBenefitsModule)
  },
  {
    path: 'emotional-health-measure',
    // tslint:disable-next-line:max-line-length
    loadChildren: () => import('./pages/emotional-health-measeure/emotional-health-measeure.module').then(e => e.EmotionalHealthMeasureModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./pages/contact-us/contact-us.module').then(c => c.ContactModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./pages/terms-service/terms-service.module').then(t => t.TermsModule)
  },
  {
    path: 'userinfo',
    loadChildren: () => import('./pages/details/info-detail.module').then(d => d.InfoDetailModule)
  },
 
  {
    path: 'plans',
    loadChildren: () => import('./pages/plans/plans.module').then(h => h.PlansModule)
  },
  {
    path: 'how-happy-you-details',
    loadChildren: () => import('./pages/how-happy-you-details/how-happy-you-details.module').then(h => h.HowHappyYouDetailsModule)
  },
  {
    path: 'network-verify',
    loadChildren: () => import('./pages/network-verify/network-verify.module').then(nt => nt.NetworkVerifyModule)
  }, 
  // {
  //   path: 'network',
  //   loadChildren: () => import('./pages/network/network.module').then(n => n.NetworkModule)
  // },
  // {
  //   path: 'support',
  //   loadChildren: () => import('./pages/support/support.module').then(s => s.SupportModule)
  // },
  {
    component: NotFoundComponent,
    path: '404',
  },
  {
    component: NotFoundComponent,
    path: '**'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
