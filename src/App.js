import './App.scss'

import {Route, Switch} from 'react-router'

import Header from './components/Header/Index'
import Home from './components/Home/Index'
import SearchPage from './pages/SearchPage/Index'
import RecipePage from './pages/RecipePage/Index'
import NotFoundPage from './pages/NotFoundPage/Index'

function App() {
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/s/:searchContent" component={SearchPage}/>
        <Route path="/r/:recipe" component={RecipePage}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
  )
}

export default App
