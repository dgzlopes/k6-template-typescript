# k6-template-typescript

This is a pretty minimal template to use Typescript in your k6 tests.

## Usage

You need to have Node.js (> v16.15.0) and k6 (>0.47.0) installed. 

Once you've cloned this repo, run the following command:
```
npm install; npm run build
```

That should be it! Now you should see a new directory named `build`. You can run the example test we provide with:
```
k6 run build/my-test.js
```
