import * as React from 'react';
import AddAccount from './components/Pages/Account/Add'
import EditAccount from './components/Pages/Account/Edit'
import MainPage from './components/Pages/Main'
import AddOperation from './components/Pages/Operation/Add'
import OptionsPage from './components/Pages/Options';
import ProfilePage from './components/Pages/Profile';
import AboutPage from './components/Pages/About'
import ViewOperations from './components/Pages/Operation/View';
import Report from './components/Pages/Report';
import { Welcome } from './pages/welcome';
import { Logon } from './pages/logon';
import { Main } from './pages/main';
// import DownloadPDF from './DownloadPDF'

export const RenderPage = (route, navigator) => {
  console.log(route.title);
  switch (route.title) {
    case 'addAccount': return (
      <AddAccount
        key={route.title}
        route={route}
        navigator={navigator}
      />
    )
    case 'addOperation': return (
      <AddOperation
        key={route.title}
        route={route}
        navigator={navigator}
      />
    )
    case 'editAccount': return (
      <EditAccount
        key={route.title}
        route={route}
        navigator={navigator}
      />
    )
    case 'options': return (
      <OptionsPage
        key={route.title}
        route={route}
        navigator={navigator}
      />
    )
    case 'about': return (
      <AboutPage
        key={route.title}
        route={route}
        navigator={navigator}
      />
    )
    case 'profile': return (
      <ProfilePage
        key={route.title}
        route={route}
        navigator={navigator}
      />
    )
    case 'viewOperations': return (
      <ViewOperations
        key={route.title}
        route={route}
        navigator={navigator}
      />
    )
    case 'report': return (
      <Report
        key={route.title}
        route={route}
        navigator={navigator}
      />
    )
    // case 'download': return <DownloadPDF />
    case 'logon': return (
      <Logon
        key={route.title}
        route={route}
        navigator={navigator}
      />
    );
    case 'main': return (
      <Main
        key={route.title}
        route={route}
        navigator={navigator}
      />
    );
    default: return (
      <Welcome
        key={route.title}
        route={route}
        navigator={navigator}
      />
    )
  }
}
