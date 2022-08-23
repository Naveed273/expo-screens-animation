import axios from "axios";

/* 
Step-1: Create a new Axios instance with a custom config.
The timeout is set to 10s. If the request takes longer than
that then the request will be aborted.
*/
const myAxios = axios.create({
  baseURL: `https://example.com/api`,
  timeout: 10000,
  headers: { "api-key": "xxxx-xxxx-xxxx-xxxxx" },
});

// Step-2: Create request, response & error handlers
const requestHandler = (request) => {
  /*
  Token will be dynamic so we can use any app - specific way to always
   fetch the new token before making the call
   */
  request.headers.Authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

  return request;
};

const responseHandler = (response) => {
  if (response.status === 401) {
    alert("You need to be logged in");
  }

  return response;
};

const errorHandler = (error) => {
  return Promise.reject(error);
};

/* 
Step-3: Configure/make use of request & response interceptors from Axios
 Note: You can create one method say configureInterceptors, add below in that,
 export and call it in an init function of the application/page.
 */
myAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

myAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

// Step-4: Export the newly created Axios instance to be used in different locations.
export default myAxios;
