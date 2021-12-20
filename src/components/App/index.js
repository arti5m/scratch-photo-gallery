import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { GalleryProvider } from "../../contexts/gallery";
import Header from "../Header";
import Gallery from "../Gallery";
import GalleryItem from "../GalleryItem";

const App = () => {
  return (
    <GalleryProvider>
      <Router>
        <div className="app container">
          <Header />
          <div className="main">
            <Switch>
              <Route path="/item/:id" component={GalleryItem} />
              <Route path="/" component={Gallery} />
            </Switch>
          </div>
        </div>
      </Router>
    </GalleryProvider>
  );
};

export default App;
