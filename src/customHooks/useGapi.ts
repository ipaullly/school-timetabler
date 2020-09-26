import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { windowGapi } from '../window'

const useGapi = () => {
  const gapi: any = windowGapi;
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const discoveryDocs = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  const scopes =
    "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar";
  const [isSigned, setIsSigned] = useState(null);
  const auth: any = React.useRef(null);

  useEffect(() => {
    try {
      gapi.load("client:auth2", () => {
        gapi.client
          .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: discoveryDocs,
            scope: scopes,
          })
          .then((d: any) => {
            auth.current = gapi.auth2.getAuthInstance();
            setIsSigned(auth.current.isSignedIn.get());
            auth.current.isSignedIn.listen(onAuthChange);
          });
        gapi.client.load("calendar", "v3", () => console.log("loaded calendar"));
      });
    } catch (error) {
      toast.error('network issue while initiating Oauth connection')
    }
  }, [isSigned, API_KEY, CLIENT_ID, discoveryDocs, scopes, gapi]);

  const onAuthChange = () => {
    setIsSigned(auth.current.isSignedIn.get());
  };

  return [gapi, auth, isSigned]
}

export default useGapi
