---
title: Create a HTML View
description: In this step you learn how to create a HTML view for your project.
---

# Create a HTML View

To enter the phone number you want to be called you'll need to create a HTML form. In your terminal create a views folder and add the `index.html` file:

```sh
mkdir views
touch views/index.html
```

Open `index.html` in your text editor and add the HTML form:

```html
<!DOCTYPE html>
<html lang = "en">
  <head>
    <meta charset = "UTF-8">
    <link rel="stylesheet" href="style.css">
    <title> NeRu Dialer </title>
  </head>
  <body>
    <p> Enter a phone number (e.g. 447000000000) to receive a call from NeRu</p>
    <form method="POST" action="call">
      <label for="number">Number:</label><br>
      <input type="text" id="number" name="number"><br>
      <input type="submit" value="Submit">
    </form>
  </body>
</html>
```

The form has one input for the phone number to be entered and a submit button. Once submitted it will make a POST request to `/call` on the server.

## Static Files

The form uses a CSS file for some styling. Serving static files is a two part process. First, create a public folder and the CSS file:

```sh
mkdir public
touch public/style.css
```

Add the following to the `style.css` file:

```css
p {
    font-weight: bold;
}
```

## Serve the Site

Anything you add to the public folder will be available at the root of the website. For example, the CSS file can be access by `/style.css`. To have the view visible when you visit your website, you will need to render it. Add the following to the `index.js` file:

```javascript
app.get('/_/health', async (req, res) => {
    res.sendStatus(200);
});

app.get('/', async (req, res) => {
    res.sendFile('views/index.html', { root: '.' });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
```

This will return the HTML file as the root page of the website. Now if you start the NeRu debugger for your project you can view the webpage:

```sh
neru debug
```

The debugger will give you two URLs for your debug instance. Use the second one, ending in `.com`, since the the lack of path parameters makes it better suited for using static files.

![debug output](/images/neru/neru-dialer-debug.png)


Opening this link will show you the webpage. Leave the debugger running as it will automatically reload as we add code to the project.

![The HTML form](/images/neru/neru-dialer-view.png)