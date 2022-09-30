---
title: NeRu Deploying
description: This documentation describes NeRu Deploying
meta_title: NeRu Deploying
---

# NeRu Deploying

NeRu allows you to quickly create a running instance on the NeRu platform by deploying. Deploying your bundles your source code with a configuration file, this creates a package. Then the package is uploaded to the NeRu platform and becomes a running instance.

## Configuration File

The configuration files gives information to the NeRu platform on how to debug and deploy your application. Here is an example configuration file:

```partial
source: _partials/neru/manifest.md
```

Project name is the unique namespace for your project which can contain many instances. Instance name is unique identifier for your instance. The name of the instance has no bearing on what environment your instance will be running, this is controlled by the `region`. `region` is where the instance will run. `entrypoint` gives the NeRu platform information on how to start your application You can learn more about the options available to you in the [configuration file guide](/neru/guides/manifest).

## Health Check Route

The NeRu platform expects a route, `/_/health`, to be available on your application which is used to check the health of your deployed application. If this route does not return a 200 status, your application will be restarted. If the route is missing it can cause your application to be infinitely restarted causing your deploy to fail. Here is an example if the route using `express.js`:

```javascript
app.get('/_/health', async (req, res) => {
    res.sendStatus(200);
});
```

You can use this as an opportunity to perform some checks of your own and have the platform restart your application for you automatically if it gets into a bad state by not returning a 200 status within 30 seconds. 

## How to Deploy

You can deploy using the NeRu CLI. To deploy, run:

```sh
neru deploy
```

> If you get a "credentials not found error", run `neru app configue` to configure your Vonage application for NeRu. Credentials are stored per region, so if you want to deploy to a different region, run `neru configure`.

By default, the deploy command will look for a configuration file called `neru.yml` in the current directory. To use a different configuration file you can run:

```sh
neru deploy --filename <path/to/file>
```

So to deploy your current code with a configuration file called `prod.yml`:

```sh
neru deploy --filename production.yml
```

## View your Deployment

To take a deeper look at your project and deployments you can use the [NeRu dashboard](https://dashboard.nexmo.com/serverless/).

![Screenshot of the neru dashboard home page](/images/neru/neru-dashboard-home.png)

You can click on your deployed instance which will give you access to logs, events, your instance's configuration, and deployment history. For example opening the config tab will show the configuration for this instance:

![Screenshot of an instance's config page](/images/neru/neru-dashboard-config.png)

Then clicking on the history tab will show you the history of deploys for this instance:

![Screenshot of an instance's history page](/images/neru/neru-dashboard-history.png)

If you deploy more than one instance for your project it will show like so:

![Screenshot of the neru dashboard showing multiple instances](/images/neru/neru-dashboard-instances.png)

This is a project named `vapi`, which has two configuration files. One configuration file has an instance named `dev` and the other has an instance named `prod`. This allows you to have multiple instances running the same code but with different environments.