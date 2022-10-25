---
title: Configurable TURN servers
meta_title: You can configure the TURN servers used by a video client.
description: You can configure the TURN servers used by an video client.
navigation_weight:
---

This feature is available as an [add-on feature](https://www.vonage.com/communications-apis/video/pricing/).

## Overview

You can customize TURN server usage for each client in the session in the following ways:

* You can add a list of your own TURN servers that the client will use.

* You can decide whether the client should use your TURN servers exclusively or use them
  in addition to the Vonage TURN servers

Adding your own TURN servers can help users connect in restrictive network environments where
Vonage TURN servers might be blocked.

If you chose to override the Vonage TURN servers and only use your own TURN servers, you can
make sure that media streams never leave your network.

You can add your own TURN servers for each client connecting to the session, using OpenTok.js
(for web clients), the iOS SDK, or the Android SDK. The custom TURN server API
was added in version 2.13.0 of these client SDKs.

There is also a [IP proxy](/video/guides/ip-proxy/) add-on feature that lets
you use your own proxy server to route *non-media* traffic-such as Video API calls,
WebSocket connections, and log traffic.

## OpenTok.js (v2.13.0+)

The `options` parameter of the `OT.initSession()` method includes an undocumented `iceConfig`
property. This property includes the following properties:

* `includeServers` (String) - Set this to `'custom'` and client will use only the custom
  TURN servers you provide in the `customServers` array. Set this to `'all'` (the default) and
  the client will use both the custom TURN servers you provide along with Vonage TURN servers.

* `transportPolicy` (String) - Set this to `'all'` (the default) and the client will use
  all ICE transport types (such as host, srflx, and TURN) to establish media connectivity. Set
  this to `'relay'` to force connectivity through TURN always and ignore all other ICE
  candidates.

* `customServers` (Array) - Set this to an array of objects defining your custom TURN servers.
  Each object corresponds to one custom TURN server, and it includes the following properties:

  * `urls` (String or Array of Strings) - A string or an array of strings, where each string
    is a URL supported by the TURN server (and this may be only one URL).

  * `username` (String) - The username for the TURN server defined in this object.

  * `credential` (String) - The credential string for the TURN server defined in this
    object.

**Note:** To have the client only use the TURN servers you specify (and not use
the Vonage TURN servers): set the `includeServers` property to `'custom'`, set the
`transportPolicy` property to `'relay'`, and set the `customServers` property to list your
TURN servers.

### JavaScript Example code

```js
const session = OT.initSession(projectId, sessionId, {
  iceConfig: {
    includeServers: 'custom',
    transportPolicy: 'relay',
    customServers: [
      {
        urls: [
          'turn:123.124.125.126:3478?transport=udp',
          'turn:123.124.125.126:3478?transport=tcp'
        ],
        username: 'webrtc',
        credential: 'foO0Bar1'
      },
      {
          urls: [
            'turns:turntls.example.com:3478?transport=tcp'
          ],
          username: 'webrtc',
          credential: 'foO0Bar2',
      },
    ],
  },
});
```

### Type definition

```ts
export function initSession(
  partnerId: string,
  sessionId: string,
  options?: {
    connectionEventsSuppressed?: boolean;
    iceConfig?: {
      includeServers: 'all' | 'custom';
      transportPolicy: 'all' | 'relay';
      customServers: {
        urls: string[];
        username?: string;
        credential?: string;
      }[];
    };
  }
): Session;
```

## Android SDK (v2.13.0+)

The `Session.Builder` class includes two methods for configuring TURN server usage for the client:

* `Session.Builder.setCustomIceServers()` - Call this method to add a list of custom TURN
  servers for the client.

* `Session.Builder.setIceRouting()` - Call this method to add limiting the ICE 
  options for the client.

In addition to the two new methods, two new enums define TURN server options:

* `IncludeServers` - Includes options for using only the custom servers or both
  Vonage servers and the custom servers.

* `TransportPolicy` - Describes the routing method to use.

**Note:** To have the client only use the TURN servers you specify (and not use
the Vonage TURN servers), call the following methods of the Session.Builder
object you use to create the Session object:

* `setCustomIceServers()` - Pass in a list of IceServer objects
  (corresponding to your custom TURN servers) as the `serverList` parameter, and
  pass in `IncludeServers.TURN` as the `config` parameter.

* `setIceRouting()` - Pass in `TransportPolicy.Relay`.

See the Java comments below.

### Android SDK API additions

```java
public static Builder {
  // ...

  /**
   * Defines settings for whether to use only your custom TURN servers or to use
   * those servers in addition to Vonage TURN servers. Used in the setCustomIceServers()
   * method.
   */
  public enum IncludeServers {
    /**
     * The client will only use the custom TURN servers you provide.
     */
    Custom,

    /**
     * The client will use Vonage TURN servers in addition to the custom TURN servers you provide.
     */
    All
  };

  /**
   * Defines settings for whether to use all ICE transport types (such as host, srflx, and TURN)
   * to establish media connectivity or to only use TURN. Used in the setIceRouting() method.
   */
  public enum TransportPolicy {
    /**
     * The client will use all ICE candidate types (such as host, srflx, and TURN)
     * to establish media connectivity.
     */
    All,

    /**
     * The client will force connectivity through TURN always and ignore all other ICE
     * candidates.
     */
    Relay
  };

  /**
   * Defines a custom TURN server used in the setCustomIceServers method.
   */
  public static class IceServer {
    /**
     * The URL for your custom TURN server.
     */
    public String url;
    /**
     * The username for the TURN server.
     */
    public String user;
    /**
     * The credential string for the TURN server.
     */
    public String credential;
    /**
     * The constructor.
     */
    public IceServer(String url, String user, String credential) {

  };

  /**
   * Set the list of custom TURN servers to be used by the client in this session.
   */
  public void setCustomIceServers(List<IceServer> serverList,
                                  IncludeServers config) {
    // ...
  }

  /**
   * Set the the TURN server transport policy to be used by the client in this session.
   */
  public void setIceRouting(TransportPolicy routing) {
     // ...
  }
  ...
}
```

### Android example code

```java
List<IceServer> serverList = new IceServer(
  'turn:123.124.125.126:3478?transport=udp', // TURN server URL
  'webrtc', // Username
  'foO0Bar1' // Credential
);
mSession = new Session.Builder(this, apiKey, sessionId)
  .setCustomIceServers(serverList, IncludeServers.Custom)
  .setIceRouting(TransportPolicy.TURN)
  .build();
mSession.setSessionListener(this);
mSession.connect(token);
```

## iOS SDK (v2.13.0+)

When you initialize an OTSession object, set the `OTSessionSettings.iceConfig`
property to define custom TURN server configuration for the client.
The OTSessionICEConfig class defines the `OTSessionSettings.iceConfig` property.

**Note:** To have the client only use the TURN servers you specify (and not use
the Vonage TURN servers), call the `[OTSessionSettings addICEServerWithURL:]` method of
the OTSessionSettings object you use to create the OTSession object. Then set the
following properties of the OTSessionSettings object:

* `includeServers` - Set this to OTSessionICEIncludeServersCustom.

* `transportPolicy` - Set this to OTSessionICETransportForceTurn.

### iOS SDK API additions

```objc
/**
 * Defines settings for whether to use only your custom TURN servers or to use
 * those servers in addition to Vonage TURN servers. Defines values for the
 * OTSessionSettings.iceConfig property.
 */
typedef NS_ENUM(int32_t, OTSessionICEIncludeServers) {
    /**
     * Uses both Vonage TURN servers and (if any added) custom TURN servers.
     */
    OTSessionICEIncludeServersAll,

    /**
     * Use only custom TURN servers.
     */
    OTSessionICEIncludeServersCustom,
};

/**
 * Defines settings for whether to use all ICE transport types (such as host, srflx, and TURN)
 * to establish media connectivity or to only use TURN. Used in the setIceRouting() method.
 */
typedef NS_ENUM(int32_t, OTSessionICETransportPolicy) {
    /**
     * The client will use all ICE candidate types (such as host, srflx, and TURN)
     * to establish media connectivity.
     */
    OTSessionICETransportAll,

    /**
     * The client will force connectivity through TURN always and ignore all other ICE
     * candidates.
     */
    OTSessionICETransportRelay,
};

/**
 * Defines the `OTSessionSettings.iceConfig` property.
 * This defines the TURN servers to be used by the client in the session.
 */
@interface OTSessionICEConfig : NSObject

    /**
     * Defines settings for whether to use only your custom TURN servers or to use
     * those servers in addition to Vonage TURN servers.
     */
    @property(nonatomic, assign) enum OTSessionICEIncludeServers includeServers;

    /**
     * Whether to use all ICE transport types (such as host, srflx, and TURN)
     * to establish media connectivity or to only use TURN.
     */
    @property(nonatomic, assign) enum OTSessionICETransportPolicy transportPolicy;

    /**
     * An NSArray of TURN servers added by addICEServerWithURL:
     * Each element in the array is an NSDictionary with turn_url, username, and credential
     * as keys.
     */
    @property(readonly) NSArray * _Nullable customIceServers;

/**
 * The maximum number of custom TURN servers allowed.
 */
+ (NSInteger) maxTURNServersLimit;

/**
 * Adds a custom ICE server to be used by the session.
 *
 * @param turn_url The URL for the custom TURN server.
 *
 * @param user The username for the TURN server.
 *
 * @param credential The credential string for the TURN server.
 *
 * @param errorPtr This is set to an NSError when there is an error calling the method,
 *        such as:
 *
 *        * The URL is not valid
 *        * The user name or credential is empty
 *        * The maximum TURN servers limit was already reached (see maxUserTurnServersLimit).
 */
- (void) addICEServerWithURL:(NSString *_Nonnull)turn_url
                    userName:(NSString *_Nonnull)user
                    credential:(NSString *_Nonnull)credential
                    error:(NSError **_Nonnull)errorPtr;

@end

/**
 * The OTSessionSettings property includes an `iceConfig` property for
 * configuring TURN servers to be used by this client in the session.
 */
@interface OTSessionSettings : NSObject

@property(nonatomic, assign) BOOL connectionEventsSuppressed;
@property(nonatomic, retain) OTSessionICEConfig * _Nullable iceConfig;

@end
```

### iOS example code

```objc
OTSessionICEConfig *myICEServerConfiguration = [[OTSessionICEConfig alloc] init];
myICEServerConfiguration.includeServers = OTSessionICEIncludeServersCustom;
myICEServerConfiguration.transportPolicy = OTSessionICETransportForceTurn

NSError *error = nil;
[myICEServerConfiguration addICEServerWithURL:@"turn:123.124.125.126:3478?transport=udp"
                                     userName:@"webrtc"
                                   credential:@"foO0Bar1"
                                        error:&error];

OTSessionSettings *settings = [[OTSessionSettings alloc] init];
settings.iceConfig = myICEServerConfiguration;

_session = [[OTSession alloc] initWithApiKey:kApiKey
                                   sessionId:kSessionId
                                    delegate:self
                                    settings:settings];
```

## Windows SDK

Use the IceConfig class to set the custom ICE configuration
to be used by the client.

The `IceConfig()` constructor method includes the following parameters:

* `customIceServers` -- Set this to A list of IceServer objects, representing
  custom TURN servers to be used by the client. For each IceServer, you set
  the URL, username, and credential string for the custom TURN server

* `transportPolicy` -- Set this to a value in the `ICETransport` enum:

  * `All` -- The client will use all ICE candidate types (such as host, srflx, and relay)
    to establish media connectivity.

  * `Relayed` -- The client will force connectivity through TURN always and
    ignore all other ICE candidates.

* `includeServers` -- Set this to a value in the `IncludeServers` enum:

  * `All` -- The client will use Vonage TURN servers in addition to
    the custom TURN servers you provide.

  * `Custom` -- The client will only use the custom TURN servers you provide.

The Session.Builder class includes an `IceConfig` property. Set this
to an IceConfig object when building the Session object.


## Linux SDK

The type `otc_custom_ice_config` defines a struct that includes the following members:

* `num_ice_servers` -- The number of ICE servers

* `ice_url` -- An array of strings specifying your ICE server URLs.

* `ice_user` -- An array of strings specifying usernames for the TURN servers.

* `ice_credential` -- An array of strings specifying credential strings for
  the TURN servers.

Call the `otc_session_settings_set_custom_ice_config()` function and pass in
the `otc_custom_ice_config` instance:

```c
otc_session_settings_set_custom_ice_config(session_settings,
                                           &ice_config);
```

### Linux SDK example code

```c
// Provide the ICE configuration here.
struct otc_custom_ice_config ice_config;
ice_config.num_ice_servers = 1;
ice_config.ice_url = (char **)malloc(sizeof(char *) * ice_config.num_ice_servers);
ice_config.ice_url[0] = strdup("turn:123.124.125.126:3478?transport=udp");
ice_config.ice_user = (char **)malloc(sizeof(char *) * ice_config.num_ice_servers);
ice_config.ice_user[0] = strdup("webrtc");
ice_config.ice_credential = (char **)malloc(sizeof(char *) * ice_config.num_ice_servers);
ice_config.ice_credential[0] = strdup("foO0Bar1");
ice_config.force_turn = OTC_TRUE;
ice_config.use_custom_turn_only = OTC_FALSE;

otc_session_settings *session_settings = otc_session_settings_new();
if (session_settings != NULL) {
  otc_session_settings_set_custom_ice_config(session_settings,
                                             &ice_config);
}

otc_session *session = NULL;

session = otc_session_new_with_settings(API_KEY,
                                        SESSION_ID,
                                        &session_callbacks,
                                        session_settings);

if (session == NULL) {
  printf("Could not create session successfully");
  return EXIT_FAILURE;
}

otc_session_connect(session, TOKEN);
```

## Known issue

If you set a client to always use TURN servers in a
[relayed session](/video/guides/create-session#the-media-router-and-media-modes), it will not be able
to subscribe to its own streams (streams it publishes).

## FAQs

### Does the configurable TURN API address the issue for HTTP traffic?

No. Configurable TURN allays customers’ concerns around connecting to trusted end-points for
media traffic only.

For HTTP traffic, customers will have to do one of the following:

<!--alex ignore whitelist-->

* Whitelist vonage and opentok domain names:
  * *.opentok.com
  * *.tokbox.com
  * *.vonage.com

* Whitelist IP address blocks provided for the Vonage Video API.

* Use web proxy settings on the clients to proxy all Vonage HTTPS traffic
  through your own targets. See the Proxy requirements section
  [here](https://video-api.support.vonage.com/hc/en-us/articles/360029733631-What-are-the-TokBox-network-connectivity-requirements-).

### How is the media path being selected between the available TURN targets. Does it take into account the round-trip latency, or is it influenced by the order in which we list the targets, or is it random?

Order of TURN servers is not guaranteed based on the list provided. Instead, when the media starts
flowing, the ICE implementation selects which candidate/server has the best connectivity and successfully
negotiated first.

### If the TURN server URL maps to multiple IP addresses, how is the specific TURN server selected for the session? Is this random?

Most implementations, including the ones used in Chrome and Firefox, take the first IP returned by the DNS lookup.
This results in a random round-robin selection typically.

### If both TCP and UDP TURN servers are provided and are reachable, is it possible to prioritize UDP targets and only fall back to TCP if required?

UDP relay candidates will be preferred over TCP relay candidates since those candidates have a
lower local type preference and therefore a lower priority. Refer to [RFC 8445 for details](https://tools.ietf.org/html/rfc8445#section-5.1.2)
for details. The order of ICE servers passed in does not influence this.

### Can a single client use different media paths for different streams?

Yes, this is expected behavior as Vonage treats each individual media stream separately.

### How much control does the Configurable TURN API have in the media path selection?

Media path selection is handled by ICE (Interactive Connectivity Establishment) inside WebRTC and
we have no way to modify this behavior. The Configurable TURN API only helps modify the 
list of ICE servers provided by the client to WebRTC and does not influence the selection process.

### Is direct connection to Vonage Media Server over UDP always preferred?

Yes, direct connection to Vonage Media Server is always preferred. It fails over to using TURN
if connection to the Vonage Media Server is unsuccessful or if the "Force TURN" option is used
in the Configurable TURN API.

### Can I use multiple TURN servers of the same type for load balancing?

This is not recommended as it will result in a random server being picked by the client and that server can change over the duration of the connection.

### How do I load-balance my custom TURN server deployment?

Please contact us for more information.

### Can the TURN server decrypt media?

No, the TURN server does not have access to the SRTP keys that are exchanged using DTLS-SRTP and only available to the endpoints
of the connection.

### What happens if a TURN server crashes during a session and how to recover

If a TURN server crashes while it is being used this will result in the client's connection becoming disconnected.
The client will try to re-establish a connection using an ICE Restart.

### How can I test a TURN server?

You can test your TURN server either using [Trickle Ice test page](https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/) or  [coturn turnutils_uclient](https://github.com/coturn/coturn/blob/master/README.turnutils).