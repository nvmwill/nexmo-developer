---
title: How to Build a Visual Regression Test System Using Playwright
description: How to create your own DIY visual regression system for your web
  application? Here’s how to do it with Playwright, rollup and GitHub actions.
thumbnail: /content/blog/how-to-build-a-visual-regression-test-system-using-playwright/visual-regression-test.png
author: yonatankra
published: true
published_at: 2022-08-23T07:23:06.530Z
updated_at: 2022-08-01T10:02:14.251Z
category: tutorial
tags:
  - playwright
  - github-actions
  - test
comments: true
spotlight: false
redirect: ""
canonical: ""
outdated: false
replacement_url: ""
---
Let’s say Joe is working on the “button” reusable component, makes a change and makes sure the button works as expected. Does Joe know that the other components look good with this change? Joe would have to know which components depend on the button and go over all of them - visually making sure that the buttons look OK - in various scenarios. And what about different browsers? The test matrix just keeps growing…

Let’s help Joe to make better use of his time by automating the visual test process!

Just like Joe, you have an app running, or you created your components and want to share them with the world. On every change, you (or someone else in your team) spend hours going over the UI to make sure it is pixel perfect. Even then, sometimes things slip through the cracks in human attention. Let’s face it - machines are better than us at matching pixels. They also cost less and can do it over and over again.

This is where our story begins. We have a [bunch of UI components](https://github.com/Vonage/vivid-3/tree/main/libs/components/src/lib). We also have [documentation for our components](https://vivid.deno.dev) in which we can “play” with them (a.k.a. manually test them).

The documentation is created from readme files inside each component’s folder. [Here’s an example](https://github.com/Vonage/vivid-3/blob/main/libs/components/src/lib/icon/README.md).

Notice that the examples are simple HTML snippets:

```html
<vwc-icon type='heart-solid' connotation='accent'></vwc-icon>
<vwc-icon type='heart-solid' connotation='announcement'></vwc-icon>
<vwc-icon type='heart-solid' connotation='cta'></vwc-icon>
<vwc-icon type='heart-solid' connotation='success'></vwc-icon>
<vwc-icon type='heart-solid' connotation='alert'></vwc-icon>
<vwc-icon type='heart-solid' connotation='info'></vwc-icon>
```

We’ll get back to it later.

So… we have around 50 components and a way to see them visually while developing and manually testing them. That’s great! You want to be able to see the components before you ship them :).

Some of these components are composed of multiple atomic components. That means changing the “button” component might affect multiple complex components that are using the button.

## How to Setup Playwright in a Project?

The first step is to run: 

`npm i -D playwright` 

This is going to do a bunch of things:

1. Add `playwright` to our package.json file.
2. Install `playwright` locally.
3. Install `playwright`’s browsers locally.

We’ll also need to set up a `playwright.config` file. For this introduction (and because this is what I personally do), we will use the `typescript` version, but you can use plain javascript. We will create a `playwright.config.ts` file with the following content:

```
import type {
  PlaywrightTestConfig
} from '@playwright/test';

const config: PlaywrightTestConfig = {
  testMatch: 'src/**/*.test.ts',
  projects: [{
      name: 'Chrome Stable',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
      },
    },
    {
      name: 'Desktop Safari',
      use: {
        browserName: 'webkit',
      }
    },
    {
      name: 'Desktop Firefox',
      use: {
        browserName: 'firefox',
      }
    },
  ]
};

export default config;
```

The configuration above does the following:

1. `testMatch`: Tells playwright where to get the test files. Note that the path is relative to the file’s location. In the vivid repository, the configuration file is located in the components folder, and all the components are inside the `src` folder.  We make the convention of calling the test files `*.test.ts` - so every file that follows this pattern will be included in the test run.
2. `projects`: Tells playwright in what configurations to run the tests. In this case, we have 3 configurations for each of the major browsers we would like to test.

There’s much more to the `playwright` configuration. [You can read more about it here](https://playwright.dev/docs/test-configuration).

Now that `playwright` "knows" where to get the files and on what browsers to run our tests, we can start setting up the tests themselves.

## How to Write Playwright Tests

To create a test, we need to create a file that will be found by the `testMatches`. That’s why in our repository, we create a file `ui.test.ts` for every component. Here’s a test file example:

```
test('should show the component', async ({
  page
}: {
  page: Page
}) => {
  const template = `...`;

  await loadComponents({
    page,
    components,
  });
  await loadTemplate({
    page,
    template,
  });

  const testWrapper = await page.locator('#wrapper');
  await page.locator('#modal');

  await page.waitForLoadState('networkidle');

  await page.evaluate(() => {
    const modal = (document.getElementById('modal') as Dialog);
    modal.showModal();
    return modal;
  });

  expect(await testWrapper?.screenshot()).toMatchSnapshot(
    './snapshots/dialog.png'
  );
});
```

[For the full file, click here](https://github.com/Vonage/vivid-3/blob/main/libs/components/src/lib/dialog/ui.test.ts).

Let’s break it down.

### Playwright Test Block

The first thing we notice after all the imports are done is that we have a `test` block. The function sent to the `test` block accepts a test object. One of the object’s properties is the `page` property. This `page` is the actual `page` representation in playwright. We use it to manipulate and observe the tested page.

### Preparing the Test Page

In this file, we have a test that generates a template (the `template` variable). It then loads the needed components and the template to the test page using utility functions we’ve built (more on that later).

### Waiting for the HTML to Load

The next lines use the `page.locator` method to get the elements we are looking for. Another “side effect” of using the locator is that it resolves when our elements are visible on the page. This makes sure that when we run the tests, our elements are already in the DOM. 

### Waiting for Resources to be Fetched

Another wait below is to wait until all the network traffic is idle. This is important for us because we sometimes want to wait until icons or images load from a CDN.

### Trigger DOM Elements Programmatic API

Eventually, there’s the `evaluate` method of the `page` object. This method evaluates JavaScript code inside the page. In this case, this is the code evaluated:

```
await page.evaluate(() => {
  const modal = (document.getElementById('modal') as Dialog);
  modal.showModal();
  return modal;
});
```

In this case, we get the `modal` element and evoke its `showModal` method. This way, we can test the programmatic API of DOM elements.

### Generate and Compare Snapshots

The final line is the "magic" of visual regression in playwright: 

```
expect(await testWrapper?.screenshot()).toMatchSnapshot(
  './snapshots/dialog.png'
);
```

The `locator` resolved object `testWrapper` has a `screenshot` method. When we invoke this method and use the `toMatchSnapshot` expectation, it does one of the following:

1. If there’s a snapshot in the path given to `toMatchSnapshot`, it compares the snapshot taken to the one that exists in the file system. If they don’t match, the test fails.
2. If there’s no snapshot in the path, it generates a new one.

## How to Load the Test Page During a Test?

In the last section, we saw an example of how tests can be written. We used a `page` object to manipulate our test page, but it begs a few questions - what is this mysterious page? Where does the HTML/CSS/JS content come from?

In essence, the playwright’s `page` object has a method `goto`. This method accepts a URL and loads it on the `page`. This is fine if you have a working application. In this case, all you need to do is serve your application. This can be done using your bundler’s development server, using some static HTML server or even testing your QA, dev or production environment.

Your tests would usually start with a `goto` and would look kinda like this:

```
test('should show text hello world', async ({page}) => {
	await page.goto(myAppUrl);
	const headerText = await manipulateApp(page);
	expect(headerText).toEqual('Hello World');
});
```

We `goto` the app or test page, manipulate it in some way and then expect some feature to exist or equal something.

### How do we serve single components for snapshot comparison?

In `vivid`, as in other UI components libraries, there is no real app to test. We have our documentation - but testing it would also test other things that are not related to our components. Actually, most of the visual data in the documentation is not component related.

The best thing to try would be to create a dedicated test page per component. For this purpose, we serve our whole project using `http-server`. Our visual regression command looks kind of like this: 
`npm run build & npx http-server -s & npx playwright test`.

That means we build our components, serve the repository and hence our build and then start the tests. We also have an empty HTML file that is served, and we use it in the `page.goto` command like this: 

`await page.goto('[http://127.0.0.1:8080/scripts/visual-tests/index.html](http://127.0.0.1:8080/scripts/visual-tests/index.html)');`

This file is an empty HTML file. We could create a manual HTML file for every test - but what’s the fun in that? Let’s see how we start to automate our test page generation from our code.

### How to Inject JS Files and Styles into our page with Playwright?

We now have an HTML page to `goto`. It is still useless because we need to be able to inject our components’ code.

For this, we can look at the utility function we saw in the test file example - `loadComponents`.

`loadComponents` is a function that accepts an array with components names and uses playwright’s `addScriptTag` method to add the components:

```
export async function loadComponents({
    page,
    components,
    styleUrls = defaultStyles,
}: {
    page: Page,
    components: string[],
    styleUrls ? : string[]
}) {
    await page.goto('http://127.0.0.1:8080/scripts/visual-tests/index.html');

    (async function() {
        for (const component of components) {
            await page.addScriptTag({
                url: `http://127.0.0.1:8080/dist/libs/components/${component}/index.js`,
                type: 'module',
            });
        }
    })();

    const styleTags$ = styleUrls.map(url => page.addStyleTag({
        url
    }));
    await Promise.all(styleTags$);
}
```

The magic happens inside the async for loop in the middle of the function: it goes over every component in the array and uses `addScriptTag` to load it to our demo page.

It also does that to style tags one row below. The function resolves when all the style tags are in the DOM.

This way, in every test, we take the same blank page and load the components we want to test. For instance, if we want to test form elements, we set an array with `text-field`, `text-area`, `select`, `button` and other form elements. The `loadComponents` function will inject them into the test page for us.

Our network traffic is going to look like this in case we had our array set like this: `[icon, button, focus, dialog, text-field,layout]`:

![The JavaScript files loaded in the test page as shown in the network tab of chrome dev tools](/content/blog/how-to-build-a-visual-regression-test-system-using-playwright/visual-regression-test-2.png "A list of JS files from the network tab")

Bear in mind we also have templates loaded:

![The CSS files loaded in the test page as shown in the network tab of chrome dev tools](/content/blog/how-to-build-a-visual-regression-test-system-using-playwright/visual-regression-test-1.png "A list of css files from the network tab")

Whoopy - JS and CSS are loaded!

### How to Show the Components on the HTML Page?

We now have an HTML page with the needed scripts and styles injected into it. Our remaining task is to inject the HTML that will actually use our components.  

Let’s say we want to test a button. We will create a string that looks like this: 

`<vwc-button label=”Click Me”></vwc-button>`

We can add more flavors to the button like connotation or appearance or even choose a different component (I mean, if we wanted to test the dialog, creating a snippet of a button would be rather useless).

Now we want this HTML shown on our test page. For this, we are going to use a trick with playwright’s `page.addScriptTag`. In the utility function `loadTemplate`, we are going to accept the page and the template string. We will then add a script to the page that inserts the HTML template to the page:

```
export async function loadTemplate({
    page,
    template
}: {
    page: Page,
    template: string
}) {
    const wrappedTemplate = `<div id="wrapper">${template}</div>`;
    await page.addScriptTag({
        content: `
            document.body.innerHTML = \`${wrappedTemplate}\`;
        `,
    });
}
```

The function first wraps our template with a `div` string and then adds a script to the page that replaces the body’s innerHTML with our wrapped HTML string.

So if we have an HTML string like this:

```html
<vwc-dialog id="modal"
		icon="info" 
		headline="Headline"
		text="This is the content that I want to show, and I will show it!!!"
>				
</vwc-dialog>
```

We will get the following result in the browser:

![A web browser with a modal dialog open. To the side the chrome dev tools are open showing the HTML we expected](/content/blog/how-to-build-a-visual-regression-test-system-using-playwright/visual-regression-test-3.png "The test page and the devtools")

Showing our modal. To the right of the modal, you can see the HTML code we injected into the page.

## Screenshot Generation and Comparison in Playwright

Now that our test page is ready, we can take our snapshot. We already went through that in the overview, but here's a reminder:

```
const testWrapper = await page.locator('#wrapper');
await page.locator('#modal');

await page.waitForLoadState('networkidle');

await page.evaluate(() => {
  const modal = (document.getElementById('modal') as Dialog);
  modal.showModal();
  return modal;
});

expect(await testWrapper?.screenshot()).toMatchSnapshot(
  './snapshots/dialog.png'
);
```

### Step 1: Wait for the Page to be Ready

We wait for the wrapper and modal to be on the page using the `page.locator` method and to the `networkidle` event to make sure all of our assets are loaded. 

### Step 2: Manipulate the Page

Once the page is ready, we evaluate the script that uses the `showModal` API on the modal element.

### Step 3: Take a Screenshot and Validate it

Now, if all is working correctly, we get to our `expect` row that takes the snapshot and compares it to a former snapshot. 

The `testWrapper.screenshot` method is part of the `playwright.locator` API. It takes a screenshot of the element and allows us to use the `toMatchSnapshot` expectation API. In this case, we match it to a file path (the `match path`) - this is where the screenshot is saved.

In case this is the first time we run the test, a screenshot is generated in the `match path`. All the changes we make will be compared to the original result, making sure that changing how our component looks will fail the test and we will not ship unwanted visual changes.

### Step 4: Update the Screenshots

In this case, we do want to change the look, `playwright` has an `update-snapshots` flag that updates the snapshot. For this, we have an `update` task in our repository, but in playwright, it works like this:

`npx playwright test --update-snapshots`

## Summary

We now have a fully working visual regression system for UI components. Building these kinds of tests for UI components is a tad more complicated than testing an application.

While testing an application, all you need to do is load the application via an external server and then use `goto` to the address. When testing components, you need that same server, but this time it will point to an empty page we needed to build during the test itself.

The two utility functions, `loadComponents` and `loadTemplate` that used playwright’s `addScriptTag` and `addStyleTag`, are the secret sauce that allows us to test each component in isolation by just creating our HTML snippets.

We use very similar code to create a test for every component in our library or page/user story in our application. This way, we create a snapshot for every component/page/user story and make sure the user will get the same result for the same procedure. It all happens automatically in the browsers we’ve set in our configuration (chrome, firefox and Safari). Better quality - time saved.

We have a working local automated visual regression test mechanism now. The reason to create it is to be able to run these tests locally, so the developer will be able to get fast feedback and fix the errors before even pushing one’s changes.

But there’s much more we can improve:

* How do we automate test generation? 
* How do we protect ourselves from flakiness (instability is a known issue in e2e tests)? 
* How do we integrate and optimize our tests in GitHub actions? 
* And what about the development and debugging mode for the visual tests?

I will go over these topics in the next article. In the meantime, you can take a look at [our Vivid repository](https://github.com/Vonage/vivid-3), our [playwright configuration](https://github.com/Vonage/vivid-3/blob/main/libs/components/playwright.config.ts) and [UI tests documentation](https://github.com/Vonage/vivid-3/tree/main/docs/ui-test) to see it in action.
