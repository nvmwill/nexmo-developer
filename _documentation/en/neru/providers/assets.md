---
title: Assets
description: The Assets Provider
navigation_weight: 6
---

# Assets Provider

The Assets provider allows you to store and retrieve objects on the NeRu platform. You can generate links to your public files, with TTLs for secure files, or download the binary.

## Functions

* [`createDir`](/neru/code-snippets/assets-provider/create-directory)
* [`uploadFiles`](/neru/code-snippets/assets-provider/upload)
* [`remove`](/neru/code-snippets/assets-provider/remove)
* [`list`](/neru/code-snippets/assets-provider/list)
* [`generateLink`](/neru/code-snippets/assets-provider/gen-link)
* [`getRemoteFile`](/neru/code-snippets/assets-provider/get-file)


## Initializing the Assets Provider

To use the Assets Provider you need to create an instance of the provider using a session:

```javascript
const session = neru.createSession();
const assets = new Assets(session);
```

## Usage

For example to use the Assets provider to upload a file from a HTML form using [`busboy`](https://www.npmjs.com/package/busboy):

```javascript
app.post('/upload', async (req, res, next) => {
    try { 
        const bb = busboy({ headers: req.headers });
        var filePath;

        bb.on('file', (name, file, info) => {
            filePath = path.join(os.tmpdir(), `image.png`); 
            file.pipe(fs.createWriteStream(filePath));
        });

        bb.on('close', async function() {
            const session = neru.createSession();
            const assets = new Assets(session);

            await assets.uploadFiles([filePath], '/imgs').execute();
            res.end(); 
        });

        req.pipe(bb);
    } catch (error) {
        next(error);
    }
});
```

Then to retrieve the file:

```javascript
const session = neru.createSession();
const assets = new Assets(session);
const file = await assets.getRemoteFile('/imgs/image.png').execute();
```


Or to generate a link to the file:

```javascript
const session = neru.createSession();
const assets = new Assets(session);
const fileData = await assets.generateLink('/imgs/image.png').execute();
```