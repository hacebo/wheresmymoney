
# Functions

This project contains the firestore functions definition and objects

To debug this project on local

1. Get the firebase cli npm install -g firebase-tools
2. cd to functions folder
3. install dependecies npm i
4. firebase login
5. npm run debug
6. run the "Debug functions" that is defined on launch.json

## Help
how to setup firestore using firebase environment variables
https://blog.logrocket.com/rest-api-firebase-cloud-functions-typescript-firestore/

After storing the firebase credentials on the environment varibles, local debug will fail, for that we need to run this command on functions folder
PS>: firebase functions:config:get | ac .runtimeconfig.json