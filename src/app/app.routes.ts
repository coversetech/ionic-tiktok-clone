import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    loadComponent: () =>
      import('./pages/tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'friends',
        loadComponent: () =>
          import('./pages/friends/friends.page').then((m) => m.FriendsPage),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./pages/new/new.page').then((m) => m.NewPage),
      },
      {
        path: 'inbox',
        loadComponent: () =>
          import('./pages/inbox/inbox.page').then((m) => m.InboxPage),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile.page').then((m) => m.ProfilePage),
      },
    ],
  },
];
