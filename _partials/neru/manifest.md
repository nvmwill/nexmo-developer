```yml
project:
    name: neru-test-app
instance:
    name: dev
    runtime: nodejs16
    region: aws.use1
    application-id: 773c2b45-c20a-4d6b-8afe-24ce29ba6f92
    entrypoint: [node, index.js]
    capabilities:
        - voice
        - messaging
    configurations:
        contact:
            number: "44700000000"
            type: phone
    secrets:
        - FOO
        - BAR
debug:
    name: debug
    entrypoint: [nodemon, --inspect, index.js]
```