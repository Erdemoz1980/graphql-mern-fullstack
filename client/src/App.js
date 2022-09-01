import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Project from './pages/Project';


const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming
          }
        },
        project: {
          merge(existing, incoming) {
            return incoming
          }
        }
      }
    }
  }
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache
});

const App = () => {

  return (
    <ApolloProvider client={client}>
       <BrowserRouter>
        <Header />
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/project/:id' element={<Project />} />
          </Routes>         
        </div>
        </BrowserRouter>
    </ApolloProvider>
  )
}

export default App