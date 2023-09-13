import {
  IonApp,
  IonContent,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./App.css";

import { NextUIProvider } from "@nextui-org/react";
import Analytics from "./pages/Analytics";
import Invoices from "./pages/Invoices";
import Calendar from "./pages/Calendar.jsx";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { initializeFirebase } from "./Firebase/index";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import useUser from "./hooks/useUser";

setupIonicReact();

const App = () => {
  const user = useUser();
  useEffect(() => {
    initializeFirebase();
  }, []);

  return (
    <NextUIProvider>
      <IonApp className="dark">
        <IonReactRouter>
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <IonContent>
                <div className="w-full h-full flex">
                  <Navbar />
                  <HomePage />
                </div>
              </IonContent>
            </Route>
            <Route path="/analytics" exact={true}>
              <IonContent>
                <div className="w-full h-full flex">
                  <Navbar />
                  <Analytics />
                </div>
              </IonContent>
            </Route>
            <Route path="/invoices" exact={true}>
              <IonContent>
                <div className="w-full h-full flex">
                  <Navbar />
                  <Invoices />
                </div>
              </IonContent>
            </Route>
            <Route path="/calendar" exact={true}>
              <IonContent>
                <div className="w-full h-full flex">
                  <Navbar />
                  <Calendar />
                </div>
              </IonContent>
            </Route>
            <Route path="/settings" exact={true}>
              <IonContent>
                <div className="w-full h-full flex">
                  <Navbar />
                  <Settings />
                </div>
              </IonContent>
            </Route>
            <Route path="/auth" exact={true}>
              {user ? (
                <Route render={() => <Redirect to="/" />} />
              ) : (
                <IonContent>
                  <div className="w-full h-full flex">
                    <Navbar />
                    <Auth />
                  </div>
                </IonContent>
              )}
            </Route>
            <Route>
              <IonContent>
                <div className="w-full h-full flex">
                  <Navbar />
                  <div className="underline underline-offset-2 text-xl grid place-items-center mx-auto">
                    404 Page Not Found
                  </div>
                </div>
              </IonContent>
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </NextUIProvider>
  );
};

export default App;
