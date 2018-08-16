# A site to record RxJS usage and learning
Created a playground to record RxJS usage and sample program, there were no real examples on how to create RxJS from scratch.
It's a startoff and it shares the same traits other languages; e.g. RxJava, RxScala. This project is seperated to webpack + typescript compilation and babel only compilation. I prefer the Babel - handsdown.

## Installation
1. Install NodeJS.
2. Execute

```
npm install //yarn init && yarn install
```

## Execution (Type 1 via command line)
1. To run the directly via command line, execute the command.
```
npm run nodeRun
```

## Execution (Type 2 via browser)
1. To run scripts via command line.
```
npm run start
```
2. Browse http://localhost:8080
3. Inspect the browser, and view it on console tab to view the printed log.


## Project breakdown
*/src/index.ts* - typescript written codes to test RxJS. All samples are written here.
*/src/es6/exec.js* - works like playground, supports es6.
There are alot of code commented, each are based on samples of Observable, Subscription, and etc. 

## Lesson learned
1. Prototypal in typescript is not supported. Workaround ? Not available for typescript 3.
2. Library to vast, similar to lodash, good luck to find what's needed.
