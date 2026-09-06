# Crawl: docs.withpersona.com
Crawled at: 2026-09-06T00:37:18Z
Seed URLs: https://docs.withpersona.com
Pages: 30 | Total: 156,060 chars

---

## [1] https://docs.withpersona.com
URL: https://docs.withpersona.com
Characters: 1,499 | Depth: 0

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# Introduction

> Learn how to integrate Persona and choose the right verification flow for your application.

## Welcome to Persona!

Here you’ll find comprehensive information for integrating with Persona and our API endpoints. We’ve tried to make this documentation user-friendly and example-filled.

If you’re planning to use our API in Production, please refer to the [API Reference](/api-introduction) for detailed instructions on how to use the API, and our [Privacy Policy](http://withpersona.com/legal/privacy-policy) to understand how to handle the data.

The most comprehensive way to integrate Persona is to setup an [Embedded Flow](/embedded-flow) for web or integrate with one of our [Mobile SDKs](/mobile-sdks), and the fastest way without any code is to setup a [Hosted Flow](/hosted-flow). See [Choosing an integration method](/choosing-an-integration-method) for details.

## Questions?

We're always happy to help with code or other questions you might have! Search our documentation, visit the [Help Center](https://help.withpersona.com), [connect with our sales team](https://withpersona.com/contact), and meet industry experts and peers in the [Persona community](https://help.withpersona.com/community/).

---

## [2] https://docs.withpersona.com/mobile-sdks
URL: https://docs.withpersona.com/mobile-sdks
Characters: 962 | Depth: 1

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# Mobile Integration

> Integrate Persona Inquiry flows into native iOS, Android, or React Native applications.

Verify individuals with a native iOS and Android experience.

Integrate the Persona Inquiry flow directly into your Android or iOS app with our native SDKs. Get up and running with a theme-able Inquiry flow with a few lines of code. If you're ready to get started, check out our technical documentation for [Android](/android-sdk-v2-integration-guide), [iOS](/ios-sdk-v2-integration-guide), and [React Native](/react-native-sdk-v2-integration-guide).

See below for an example:

![mobile-sdks](https://assets.withpersona.com/f_auto,q_auto/developer-docs/images/mobile-sdks.png)

---

## [3] https://docs.withpersona.com/choosing-an-integration-method
URL: https://docs.withpersona.com/choosing-an-integration-method
Characters: 8,000 | Depth: 1

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# Choosing an integration method

> Compare Hosted Flow, Embedded Flow, and Mobile SDK options for collecting identity information.

Persona offers three main ways to integrate an identity verification flow into your frontend: Hosted Flow, Embedded Flow, and Mobile SDK. These methods all provide UIs that your end users use to complete Persona [inquiries](/inquiries). You'll see these methods referred to as "Inquiry-based" integrations (also known as "Client-side" integrations).

This guide helps you choose the Inquiry-based integration method that best fits your technical resources, timeline, and product needs.

#### Transactions-based integrations

If you want to provide your own identity verification UI, you need to use a "Transactions-based" integration (also known as an "API-based" integration). To learn more or to get started, [contact the customer support engineering team](https://app.withpersona.com/dashboard/contact-us).

## At a glance

At a glance, here's how the main Inquiry-based integration methods compare:

|                            | Hosted Flow                                | Embedded Flow | Mobile SDK               |
| -------------------------- | ------------------------------------------ | ------------- | ------------------------ |
| **Setup time**             | Minutes                                    | Minutes-Days  | Hours-Days               |
| **Engineering required**   | None-Low                                   | Low-Medium    | Medium-High              |
| **Platform**               | Web                                        | Web           | iOS/Android/React Native |
| **Users stay in your app** | No                                         | Yes           | Yes (in-app)             |
| **Best for**               | Quickest start; distributing via email/SMS | Web apps      | Mobile apps              |

These key questions may help you make a quick decision:

```
┌─ Do you have engineering resources available?
├─ NO → Hosted Flow (fastest, no code required)
└─ YES → Do you have a native mobile app?
    ├─ YES → Mobile SDK (iOS/Android/React Native)
    └─ NO → Do you want to keep users on your domain?
        ├─ YES → Embedded Flow (seamless web integration)
        └─ NO → Hosted Flow with API (fast implementation, scalable)
```

Below, learn more about how each integration method works and how they compare.

## Integration method overviews

You can skip to a section below:

* [Hosted Flow](#hosted-flow)
* [Embedded Flow](#embedded-flow-web-sdk)
* [Mobile SDK](#mobile-sdk)

### Hosted Flow

When you use a Hosted Flow, users are redirected to a Persona-hosted page to complete verification. This page can be customized with your branding, but it lives on Persona's domain.

#### How Hosted Flow works

Here is how you verify a user using Hosted Flow:

* You send the user a URL (via email, SMS, or linked from your app).
* The user clicks the link and is taken to `<your custom subdomain>.withpersona.com/verify`.
* After the user completes verification, they can be redirected back to your site.

#### Technical implementation

There are three ways to use Hosted Flow:

1. **Create a generic link** (No code)
   * Use one link that autogenerates a new inquiry for each user
   * Best for: Sharing with small groups, simple use cases
   * Warning: Users who click the link multiple times will create duplicate inquiries
2. **Create unique links manually** (No code)
   * Create unique inquiry links one-by-one in the Persona Dashboard
   * Best for: Testing, very low volume (less than \~10 inquiries/month)
3. **Create unique links via API** (Some code required)
   * Programmatically create a unique inquiry link for each user
   * Best for: High volume and/or personalized experiences
   * Recommended for production use

Note that you can get started with a no-code approach, and migrate to the more scalable code-based approach later.

#### When to choose Hosted Flow

Hosted Flow may be a good choice if you have these constraints:

* It's acceptable for users to leave your site temporarily. (Required)
* You need to start verifying users today.
* You have limited engineering resources.
* You're running a pilot or proof of concept.
* You're distributing links via email or SMS.

Learn more about [integrating with Hosted Flow](/hosted-flow).

### Embedded Flow (Web SDK)

An Embedded Flow embeds Persona's verification UI directly into your website as an iframe. Users never leave your domain, creating a seamless experience within your content.

#### How Embedded Flow works

Here's how you verify a user using Embedded Flow:

* Install Persona's JavaScript SDK (\~10 lines of code).
* When a user visits your website, the SDK opens a modal or inline frame on your page.
* The user completes verification without leaving your page.
* Your code can receive callbacks when the user finishes verification.

#### Technical implementation

There are two ways to use Embedded Flow. Both require some code:

1. **Generate inquiries from an inquiry template** (Minimal code required)
   * Embed the web SDK and configure it with your inquiry template ID.
   * A new inquiry is created each time a user starts the flow.
   * Best for: small numbers of users, simple use cases
   * Warning: Users who load your page multiple times will create duplicate inquiries.
2. **Pre-create inquiries via API** (More code required)
   * Embed the web SDK.
   * For each new user, create a new inquiry ID via API, then pass the inquiry ID to the SDK.
   * Best for: High volume and/or personalized experiences
   * Recommended for production use

Note that you can get started with the simpler implementation, and build up to the more scalable approach later.

Here's an example of the web SDK code that you would embed into your frontend:

```javascript
import Persona from 'persona';

const client = new Persona.Client({
  templateId: '<a Persona inquiry template ID starting with itmpl_>',
  referenceId: "<a unique ID for the current user>",
  environmentId: '<a Persona environment ID starting with env_>',
  onReady: () => client.open(),
  onComplete: ({ inquiryId, status, fields }) => {
    console.log('Verification complete!', inquiryId);
    // Proceed with your application flow
  },
  onCancel: ({ inquiryId, sessionToken }) => console.log('User cancelled'),
  onError: (error) => console.log('Error:', error)
});
```

#### When to choose Embedded Flow

Embedded Flow may be a good choice if you have these constraints:

* You have a web application. (Required)
* You have at least frontend development resources. (Required)
* You want to create a seamless experience between your content and the Persona verification flow.
* Keeping users on your domain is important.

Learn more about [integrating with Embedded Flow](/embedded-flow).

### Mobile SDK

Persona offers native SDKs for iOS, Android, and React Native that integrate our verification flow directly into your mobile app.

If you already have a mobile app, using Persona's mobile SDKs can be a great option.

#### How Mobile SDK works

Here's how you verify a user using a mobile SDK:

* Install the appropriate SDK for your platform.
* Present the Persona flow as a native screen in your app.
* The SDK handles camera access, photo capture, and uploads.
* Your app receives callbacks with verification results.

#### Technical implementation

There are two ways to use a mobile SDK:

1. **Generate inquiries from an inquiry template**
   * Embed the mobile SDK and configure it with your inquiry template ID.
   * A new inquiry is created each time a user starts the flow.
   * Best for: small numbers of users, simple use cases
   * Warning: Users who load your page multiple times

---

## [4] https://docs.withpersona.com/hosted-flow
URL: https://docs.withpersona.com/hosted-flow
Characters: 5,012 | Depth: 1

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# Hosted Flow Overview

> Launch a Persona-hosted, customizable identity verification flow with minimal development.

#### What's Hosted Flow?

The hosted flow allows teams to verify individuals through the Persona flow without spending time on development. The hosted flow is a full window experience that provides a secure, elegant inquiry flow. It is hosted by Persona but its branding and theming is fully customizable. It is an optimized flow that enables you to begin verifying individuals now without any engineering effort.

You can send someone a hosted flow link to securely collect their information. Information in the created inquiry will show up in the Dashboard.

![hosted-flow](https://assets.withpersona.com/f_auto,q_auto/developer-docs/images/hosted-flow.png)

There are three ways to implement Hosted Flow:

1. **Create a generic link** (No code)
   * Construct one link that autogenerates a new inquiry each time it is loaded
   * This link contains an *inquiry template ID*
   * Best for: Sharing with small groups, simple use cases
   * Warning: Users who load the link multiple times will create duplicate inquiries
2. **Create unique links manually** (No code)
   * Manually create a unique inquiry link for each user using the Persona dashboard
   * These links each contain a unique *inquiry ID*
   * Best for: Testing, very low volume (less than \~10 inquiries/month)
3. **Create unique links via API** (Some code required)
   * Programmatically create a unique inquiry link for each user
   * These links each contain a unique *inquiry ID*
   * Best for: High volume and/or personalized experiences
   * **Recommended for production use**

Note that you can get started with a no-code approach, and migrate to the more scalable code-based approach later.

## Tutorials

Choose the guide that best fits your needs:

* [No-code Hosted Flow](https://help.withpersona.com/articles/4pZBZYAFLkKMyXycGeAMV2/). See the following sections:
  * "Generate unique Hosted Flow Inquiry links via the Dashboard" - how to create links manually
  * "Copy the generic Hosted Flow Inquiry link from the Dashboard" - how to create a generic link
* [Tutorial: Unique Hosted Flow links via API](/tutorial-hosted-flow-unique-api) - how to create unique links via API

## Quick reference

### Directing users to a flow

To start a hosted flow, link a user to `https://<your subdomain>.withpersona.com/verify` on Persona with the appropriate [query string parameters](/hosted-flow-parameters).

By default, your subdomain is `inquiry`, so your inquiry link domain is `inquiry.withpersona.com`. You can [customize your subdomain](/hosted-flow-subdomains).

### Parameters

To include [parameters](/hosted-flow-parameters) in your hosted flow link, add them to the end of the URL after a trailing `?`.

### Example links

#### "Generic" link (using inquiry template ID)

`https://inquiry.withpersona.com/verify?inquiry-template-id=itmpl_XXXXXXXXXXXXX`.

* Fill in your inquiry template ID. It should start with `itmpl_`.
* Note that this approach uses [client-side inquiry creation](/creating-inquiries#creating-inquiries-client-side). Users who load the link multiple times will create duplicate inquiries.

#### Unique link (using inquiry ID)

`https://inquiry.withpersona.com/verify?inquiry-id=inq_XXXXXXXXXXXXX`

* This is the link used for inquiries that you [pre-create via API](/creating-inquiries#creating-inquiries-via-api) or create manually.
* Fill in a real inquiry ID. It should start with `inq_`.

#### Unique link that uses parameters

`https://inquiry.withpersona.com/verify?inquiry-template-id=itmpl_XXXXXXXXXXXXX&environment-id=env_XXXXXXXXXXXXX&reference-id=user_id1&language=ja&fields[name-first]=Jane`

* `environment-id`: ID of a Persona environment. Should start with `env_`. Learn about [Sandbox and Production environments](/environments).
* `reference-id`: A string that uniquely identifies the end user who is completing this inquiry. Learn about [reference IDs](/reference-ids).
* `language`: The language the inquiry should use. Learn about [supported languages](/languages).
* `fields[name-first]`: The first name of the end user who is completing this inquiry. Learn about [prefilling fields](/inquiry-fields#prefilling-inquiry-fields).

#### Link used to resume an existing inquiry

`https://inquiry.withpersona.com/verify?inquiry-id=inq_XXXXXXXXXXXXX&session-token=123456&redirect-uri=https://withpersona.com/done`

* Learn about [resuming inquiries](/resuming-inquiries).

### Testing

To quickly test a hosted flow in Sandbox, create a "generic" hosted flow link, and pass the `environment-id` of your Sandbox environment as a parameter.

Learn about [Sandbox and Production environments](/environments).

---

## [5] https://docs.withpersona.com/embedded-flow
URL: https://docs.withpersona.com/embedded-flow
Characters: 6,129 | Depth: 1

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# Embedded Flow Overview

> Embed Persona's identity verification flow directly in a web page.

#### What's Embedded Flow?

The embedded flow is a drop-in module that enables you to seamlessly verify individuals within your web page. It allows individuals to easily verify themselves without leaving their current experience. The flow securely collects and verifies the individual without redirecting away from your website.

![embedded-flow](https://assets.withpersona.com/f_auto,q_auto/developer-docs/images/embedded-flow.png)

The latest version of the SDK is:
[![Persona SDK latest](https://img.shields.io/npm/v/persona?label=persona\&color=4700EB)](https://www.npmjs.com/package/persona)

There are two ways to use Embedded Flow. Both require some code:

1. **Generate inquiries from an inquiry template** (Minimal code required)
   * Embed the web SDK and configure it with your inquiry template ID.
   * A new inquiry is created each time a user starts the flow.
   * Best for: small numbers of users, simple use cases
   * Warning: Users who load your page multiple times will create duplicate inquiries.
2. **Pre-create inquiries via API** (More code required)
   * Embed the web SDK.
   * For each new user, create a new inquiry ID via API, then pass the inquiry ID to the SDK.
   * Best for: High volume and/or personalized experiences
   * Recommended for production use

Note that you can get started with the simpler implementation, and build up to the more scalable approach later.

## Tutorials

* [Tutorial: Embedded Flow with Inquiry Template](/tutorial-embedded-flow-inquiry-template)
* [Tutorial: Pre-create inquiries for Embedded Flow](/tutorial-embedded-flow-precreate)

## Quick reference

### Embed Code Snippet

Creating inquiries through the [Embedded](/embedded-flow) integration can be easily achieved with a short code snippet. You'll only need your inquiry template ID which can be found in the [Documentation](https://app.withpersona.com/dashboard/getting-started/embedded-flow) section of your Dashboard.

```javascript JavaScript (NPM)
import Persona from 'persona';

const client = new Persona.Client({
  templateId: "<your template ID starting with itmpl_>",
  referenceId: "<your reference ID for this user>",
  environmentId: "<your environment ID starting with env_>",
  onReady: () => client.open(),
  onComplete: ({ inquiryId, status, fields }) => {
    // Inquiry completed. Optionally tell your server about it.
    console.log('Sending finished inquiry ' + inquiryId + ' to backend');
  },
  onCancel: ({ inquiryId, sessionToken }) => console.log('onCancel'),
  onError: (error) => console.log(error),
});
```

```html HTML (CDN)
<!DOCTYPE html>
<html>
  <head>
    <!-- Replace "X.Y.Z" with the Inquiry SDK version you want to use. -->
    <!-- 
        It's best practice to provide an integrity attribute. 
        Learn more here: https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
        Or copy the code snippet from the Persona dashboard, which provides the hash for you.
    -->
    <script src="https://cdn.withpersona.com/dist/persona-vX.Y.Z.js" integrity="your-integrity-hash" crossorigin="anonymous"></script>

    <!-- charset and viewport meta tags are required! -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>

  <body>
    <!-- Initialize the Persona client in whichever way is appropriate for your application. -->
    <script>
      const client = new Persona.Client({
        templateId: "<your template ID starting with itmpl_>",
        referenceId: "<your reference ID for this user>",
        environmentId: "<your environment ID starting with env_>",
        onReady: () => client.open(),
        onCancel: ({ inquiryId, sessionToken }) => console.log('onCancel'),
        onError: (error) => console.log(error),
        onEvent: (name, metadata) => {
          if (name === 'start') {
            // Collect and save the inquiry ID for future use
            inquiryId = metadata["inquiryId"]
          }
        },
        onComplete: ({ inquiryId, status, fields }) => {
          // Inquiry completed. Optionally tell your server about it.
          console.log('Sending finished inquiry ' + inquiryId + ' to backend');
          // Optionally, cleanup the client to avoid memory leaks.
          // client.destroy();
        },
      });
    </script>
  </body>
</html>
```

To permit the Persona iframe to render on your domain, see [Security > Embedding the Persona iframe](/embedded-flow-security#embedding-the-persona-iframe).

### Callbacks

You can also use optional callbacks for advanced [Event Handling](/embedded-flow-client-callbacks).

```javascript javascript
const client = new Persona.Client({
  templateId: "<your template ID starting with itmpl_>",
  environmentId: "<your environment ID starting with env_>",
  onReady: () => client.open(),
  onEvent: (name, meta) => {
    switch (name) {
      case 'start':
        console.log('Received event: start with inquiry ID ' + meta.inquiryId);
        break;
      default:
        console.log('Received event: ' + name + ' with meta: ' + JSON.stringify(meta));
    }
  }
});
```

### Methods

Use the client's [Methods](/embedded-flow-client-methods) to show, hide, or cleanup the embedded flow widget.

```javascript javascript
const client = new Persona.Client({
	templateId: "<your template ID starting with itmpl_>",
  environmentId: "<your environment ID starting with env_>",
  onComplete: ({ inquiryId, status, fields }) => {
	  // Inquiry completed. Optionally tell your server about it.
	  console.log('Sending finished inquiry ' + inquiryId + ' to backend');
	  fetch('/server-handler?inquiry-id=' + inquiryId);
  }
});

function openClient() { client.open(); }
function cancelClient() { client.cancel(true); }
```

---

## [6] https://docs.withpersona.com/api-introduction
URL: https://docs.withpersona.com/api-introduction
Characters: 4,663 | Depth: 1

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# Introduction

---

## What is the Persona API?

The Persona API is a powerful tool that enables you to integrate identity verification, risk assessment, and compliance solutions into your applications. Through our powerful endpoints, you can automate identity checks, manage verifications, and maintain regulatory compliance while providing a smooth user experience.

Get started with our [Quickstart Tutorial](/api-quickstart-tutorial) to learn about key concepts, authentication, and making your first API call.

## Key Features & Capabilities

1. **Verification**: Perform identity verification using government-issued IDs, liveness checks, and database lookups.
2. **Inquiries & reports**: Retrieve detailed verification reports and manage identity inquiries.
3. **Workflows**: Automate business logic and process using Workflows to trigger actions based on verification results or other events.
4. **API key management**: Securely authenticate and manage API access.
5. **Webhooks & notifications**: Receive real-time updates on verification statuses and system events.
6. **Rate limiting & idempotency**: Ensure stable API usage with structured rate limits and request deduplication.

## How you can use the Persona API

The Persona API provides flexible integration options, allowing you to choose the best method for your needs.

### Supplementing a core integration method

If you primarily use one of Persona’s [core integration methods](/inquiries) through the Inquiries product—such as hosted flow, embedded flow, or mobile SDKs (iOS & Android)—the API can enhance and extend your existing flow.

For example:

* **Pre-creating Inquiries:** Use the API to pre-create inquiries before directing users through the inquiry flow for information collection and verification.
* **Real-time updates:** Set up webhooks to receive real-time status updates when a user is approved, declined, or requires further review.
* **Status monitoring & data retrieval:** Poll the API for the latest inquiry statuses or fetch specific verification details without disrupting your primary integration.

By leveraging the API alongside a core integration method, you can create a more dynamic and responsive identity verification system.

### Using the API as the only integration method

#### API-only integration methods are only applicable to Enterprise Plans

For some use cases, you may choose to integrate with Persona exclusively via the API, without using any of the standard inquiry-based or front-end experiences provided by Persona.

* **Direct verification & reporting:** Instead of leveraging inquiries, you can directly create verifications, reports, or transactions via the API. It's recommended to use Transactions to then trigger subsequent verifications and reports through Workflows—this provides the best experience and future flexibility.
* **Retrieving results:** Use webhooks to receive real-time updates or poll the API for verification and report statuses.
* **Backend-driven Workflows:** This approach is ideal for scenarios where you need full control over data processing, compliance checks, or fraud analysis without requiring user interaction through Persona’s hosted solutions.

By utilizing the API as the sole integration method, you can build a fully customized, automated identity verification system tailored to your specific operational needs.

## When to use the Persona API

Persona is designed to provide secure, flexible, and automated identity verification solutions. Whether you are looking to onboard customers, reduce fraud, or comply with KYC/AML regulations, Persona’s API enables you to:

* Verify identities in real-time using government-issued IDs, liveness data, and database lookups.
* Customize verification flows to match your business needs.
* Integrate seamlessly with your existing applications using RESTful API calls.
* Automate compliance and fraud prevention through robust risk assessment tools.
* Leverage real-time monitoring and insights for improved decision-making.

## Questions?

We're always happy to help with code or other questions you might have!

* Search our [documentation](https://docs.withpersona.com/)
* Get support in our [Help Center](https://help.withpersona.com)
* Contact our [sales team](https://withpersona.com/contact)
* Join the [Persona community](https://help.withpersona.com/community/) of experts and peers

---

## [7] https://docs.withpersona.com/android-sdk-v2-integration-guide
URL: https://docs.withpersona.com/android-sdk-v2-integration-guide
Characters: 8,000 | Depth: 2

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# Android Integration Guide

The Persona Inquiry flow lets you securely and seamlessly collect your user's information.

## Integration

Integrate the Persona Inquiry flow directly into your Android app with our native SDK.

### Requirements - Make sure the SDK is compatible

Your application needs to have a `minSdkVersion` set to API 23 (Android 6.0, Marshmallow) or higher.

### Dependencies - Adding Persona to your project

In your `app/build.gradle` file (or wherever you plan on using the SDK) include the following:

```kotlin Kotlin DSL
repositories {
  // ...
  maven {
    url = uri("https://sdk.withpersona.com/android/releases")
  }
}

android {
  // ...
  compileOptions {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
  }
}

dependencies {
  // ...
  implementation("com.withpersona.sdk2:inquiry:X.Y.Z")
  // ...
}
```

```groovy groovy
repositories {
  // ...
  maven {
    url 'https://sdk.withpersona.com/android/releases'
  }
}

android {
  // ...
  compileOptions {
    sourceCompatibility JavaVersion.VERSION_17
    targetCompatibility JavaVersion.VERSION_17
  }
}

dependencies {
  // ...
  implementation 'com.withpersona.sdk2:inquiry:X.Y.Z'
  // ...
}
```

![Inquiry SDK latest](https://img.shields.io/maven-metadata/v?versionPrefix=2\&label=Inquiry%20SDK\&metadataUrl=https%3A%2F%2Fsdk.withpersona.com%2Fandroid%2Freleases%2Fcom%2Fwithpersona%2Fsdk2%2Finquiry%2Fmaven-metadata.xml)

### Privacy Configuration

This SDK collects a user’s [App-Set ID](https://developer.android.com/training/articles/app-set-id) for Fraud Prevention purposes. When publishing to the Play Store, disclose the usage of Device Identifiers as follows:

| Data Types          | Collected | Shared | Processed Ephemerally | Required or Optional | Purposes         |
| ------------------- | --------- | ------ | --------------------- | -------------------- | ---------------- |
| Device or other IDs | Yes       | No     | No                    | Required             | Fraud Prevention |

### Required permissions

Our manifest files declare the following permissions.

```xml xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.READ_BASIC_PHONE_STATE" />
```

`CAMERA` and `RECORD_AUDIO` are needed for identity verification and template steps that record video. `INTERNET` allows the SDK to communicate with the Persona backend, while `ACCESS_NETWORK_STATE` and `READ_BASIC_PHONE_STATE` are declared by the SDK. Reading the basic phone state happens on a best-effort basis for fraud-prevention purposes; if you prefer to omit it, you can remove it from your merged manifest.

If using our optional NFC package, `<uses-permission android:name="android.permission.NFC" />` is also included.

## Usage

Starting an Inquiry from a [Persona Relay](/relay) session access token? See the [Relay Android SDK guide](/relay-android-sdk).

### Register for Inquiry's Result

#### Do not rely on callbacks for critical business logic

SDK callbacks are intended for coordination between your app's UI and Persona's UI (e.g. opening and closing the flow UI). They do NOT guarantee that data are up-to-date, and cannot be reliably used to guarantee data integrity. Webhooks should be used for logic that depends on Inquiry state.

For more information, see [Accessing Inquiry status and data](/accessing-inquiry-status#webhooks-vs-sdk-callbacks).

Use the `androidx.activity.ComponentActivity#registerForActivityResult` or `androidx.fragment.app.Fragment#registerForActivityResult` method for retrieving the Inquiry result. Set it up using `Inquiry.Contract(...)` as a `val`, passing a `Context` (e.g. your activity or fragment) to the constructor.

The SDK still supports launching an `Intent` and parsing the result with `Inquiry#onActivityResult`, but that method is deprecated.

```kotlin kotlin
val getInquiryResult =
  registerForActivityResult(Inquiry.Contract(this)) { result ->
    when (result) {
      is InquiryResponse.Complete -> {
        // ... completed flow
      }
      is InquiryResponse.Cancel -> {
        // ... abandoned flow
      }
      is InquiryResponse.Error -> {
        // ... something went wrong
      }
    }
  }
```

```java Java
ActivityResultLauncher<Inquiry> getInquiryResult =
    registerForActivityResult(new Inquiry.Contract(this),
        new ActivityResultCallback<InquiryResponse>() {
          @Override public void onActivityResult(InquiryResponse result) {
            if (result instanceof InquiryResponse.Complete) {
              InquiryResponse.Complete complete = (InquiryResponse.Complete) result;
              // ... completed flow
            } else if (result instanceof InquiryResponse.Cancel) {
              InquiryResponse.Cancel cancel = (InquiryResponse.Cancel) result;
              // ... abandoned flow
            } else if (result instanceof InquiryResponse.Error) {
              InquiryResponse.Error error = (InquiryResponse.Error) result;
              // ... something went wrong
            }
          }
        });
```

### Build and Launch the Inquiry

The `Inquiry` flow is initiated with a builder pattern based on either Inquiry Template ID, Inquiry Template Version, or Inquiry ID. Everything on the builder is optional, and `environment` defaults to `PRODUCTION`. `environment`, `referenceId`, and `accountId` are set on the template-based builder returned by `Inquiry.fromTemplate(...)` and `Inquiry.fromTemplateVersion(...)` (for example, `Inquiry.fromTemplateVersion(TEMPLATE_VERSION)`).

```kotlin kotlin

// Get the template ID from the Dashboard
// <https://app.withpersona.com/dashboard/getting-started/mobile-sdks>
val TEMPLATE_ID = "itmpl_EXAMPLE"
// ...

val inquiry = Inquiry.fromTemplate(TEMPLATE_ID)
  .build()
// ...

getInquiryResult.launch(inquiry)
```

```java Java
// Get the template ID from the Dashboard
// <https://app.withpersona.com/dashboard/getting-started/mobile-sdks>
static final String TEMPLATE_ID = "itmpl_EXAMPLE";
// ...

Inquiry inquiry = Inquiry.fromTemplate(TEMPLATE_ID)
    .build();
// ...

getInquiryResult.launch(inquiry);
```

#### Persona recommends creating inquiries via API when possible

Please refer to [Creating inquiries](/creating-inquiries) for more information. After getting up and running consider moving inquiry creation to your backend for security reasons.

### Linking an Inquiry to your Users

To make it easier to find Inquiries in the Persona Dashboard, we recommend passing in your system's user ID for the Inquiry reference ID.

```kotlin kotlin
val inquiry = Inquiry.fromTemplate(TEMPLATE_ID)
  .referenceId("myUser_123")
  .build()
```

### Pre-writing to the Inquiry

If you want to add extra information to the Inquiry before the user even starts, you can pass them in as `Fields`.

```kotlin kotlin
val inquiry = Inquiry.fromTemplate(TEMPLATE_ID)
  .fields(
    Fields.Builder()
      .field("name_first", "Alexander")
      .field("name_last", "Example")
      .build()
  )
  .build()
```

### Starting/Resuming an Inquiry from ID

When you create an Inquiry on the server, you can pass the Inquiry ID instead of the Template ID.

```kotlin kotlin
val inquiry = Inquiry.fromInquiry("inq_EXAMPLE")
  .build()
```

If the Inquiry has already started, you will need to also pass in the session token.

```kotlin kotlin
val inquiry = Inquiry.fromInquiry("inq_EXAMPLE")
  .sessionToken("ABD1234567890")
  .build()
```

### Overriding device locale

Our SDK will automati

---

## [8] https://docs.withpersona.com/tutorial-hosted-flow-unique-api
URL: https://docs.withpersona.com/tutorial-hosted-flow-unique-api
Characters: 8,000 | Depth: 2

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# Tutorial: Unique Hosted Flow links via API

> Create unique Hosted Flow links through the API for individual users.

There are [three ways to use Hosted Flow](/choosing-an-integration-method#hosted-flow):

1. **Create a generic link** (No code)
2. **Create unique links manually** (No code)
3. **Create unique links via API** (Some code required)

This guide walks you through the third method: creating unique links via Persona's API. This is the method we recommend you use at scale.

You will:

* Make an API call to create an inquiry
* Create a Hosted Flow inquiry link
* Send that link to a "user" (which can be yourself)
* View the results via API
* (optional) Set up and receive webhook alerts about changes to the inquiry

To learn how to use the other two no-code methods, see the [Help Center guide on Hosted Flow](https://help.withpersona.com/articles/4pZBZYAFLkKMyXycGeAMV2/).

## Prerequisites

You'll need access to:

* A Persona account
* A Persona [API key](/api-keys) - use the **Sandbox API key**
* A tool that lets you make HTTP requests (e.g. curl, Postman, a programming language)

Before you start, you should:

* Understand what an [inquiry](/inquiries) is
* Sign into the [Persona dashboard](https://help.withpersona.com/articles/3QGnmQLLnykxUkPl1wIdLT/)

## Scenario

A user named Alexander Sample just joined your dog walking app as a dog walker. You want to verify his identity to ensure the safety of users on your service.

Alexander's user ID in *your* app is "usr\_ABC123". During account signup in your app, he stated his birthdate is August 31, 1977.

## Step 1: Create an inquiry template

Every inquiry is created from an [inquiry template](/inquiry-templates), which defines details like the specific verification logic and UI text and branding of that inquiry. You can think of inquiry templates as a mold that lets you create many inquiries.

Persona offers a suite of [solutions](https://help.withpersona.com/solutions/all-solutions/) that include preconfigured inquiry templates. In this tutorial, use the "KYC" solution to verify your dog walkers.

**Follow [these instructions](https://help.withpersona.com/articles/67J7FurQtIgwxkWWvUropu/)** to add the "KYC" solution to your Sandbox environment.

## Step 2: Locate the inquiry template ID

Find the ID of the newly-created inquiry template.

In the Persona dashboard, navigate to **Inquiries** > **Templates**. Find the "KYC" template in the list of inquiry templates, and note the value in the `ID` field. The value should begin with `itmpl_`.

## Step 3: Create an inquiry via API

Now, create an inquiry for Alexander Sample using the "KYC" inquiry template.

Make a POST request to [`/api/v1/inquiries`](/api-reference/inquiries/create-an-inquiry):

```bash
curl https://api.withpersona.com/api/v1/inquiries \
-X POST \
-H "Authorization: Bearer YOUR_API_KEY" \
-H "Content-Type: application/json" \
-H "Persona-Version: 2025-10-27" \
-d '{
    "data": {
        "attributes": {
            "inquiry-template-id": "itmpl_XXXXXXXXXXXXX",
            "reference-id": "usr_ABC123",
            "fields": {
                "name_first": "Alexander",
                "name_last": "Sample",
                "birthdate": "1977-08-31"
            }
        }
    }
}'

# Replace:
# - YOUR_API_KEY with your API key
# - itmpl_XXXXXXXXXXXXX with the inquiry template ID from Step 2
```

This code demonstrates two best practices when creating inquiries:

* **Pass a [reference ID](/reference-ids)**: "usr\_ABC123" is set as the `reference-id`. A reference ID lets you tag an inquiry as being associated with a particular end user. Persona recommends using the user's UID from your internal systems.
* **[Pre-fill inquiry fields](/inquiry-fields#prefilling-inquiry-fields)**: We pre-fill the inquiry with information we know about Alexander: his first name, last name, and birthdate. Providing this information helps streamline the verification experience for Alexander, and helps increase your confidence that his information is valid.

After you make this request, you should receive a JSON object as the response. The JSON has the following shape:

```json
{
    "data": {
        "type":"inquiry",
        "id":"inq_XXXXXXXXXXXXX",
        "attributes": {
            ...
        }
    }
}
```

In the JSON, locate the top-level `id` field. This is the ID of the created inquiry, and it should begin with `inq_`. We'll need this value in the next step.

## Step 4: Create the Hosted Flow inquiry link

Create Alexander's unique verification link by combining the following base URL with your inquiry ID:

`https://inquiry.withpersona.com/verify?inquiry-id=inq_XXXXXXXXXXXXX`

Replace `inq_XXXXXXXXXXXXX` with the inquiry ID from Step 3.

This URL directs Alexander to a personalized verification flow with his information pre-filled. You can visit this URL to test that it works—but don't start the verification yet. We'll do that in Step 7. (Note: you'll see a warning about being in a Sandbox environment. This is expected because you're using Sandbox for testing.)

## Step 5: Set up a webhook (optional)

You can receive notifications when any inquiry's state changes. For example, you can be alerted when any inquiry is started by a user, or when any inquiry is completed. See the [full list of inquiry events](/model-lifecycle#events) you can be alerted about.

To receive automatic notifications:

1. Create a webhook endpoint (for a sample server, see [Webhook quickstart](/quickstart-webhooks))
2. In the dashboard, navigate to **Webhooks** > **Webhooks**.
3. Add your endpoint URL
4. Select the following "Enabled events": `inquiry.started`, `inquiry.completed`, `inquiry.approved`, `inquiry.declined`, and `inquiry.failed`

For this tutorial, you can skip webhooks and view results in the dashboard.

## Step 6: Send the inquiry link to "Alexander"

Now you're ready to share the Hosted Flow inquiry link with Alexander Sample. In a real production situation, you could share the link programmatically (e.g. within a user flow in your dog walking app, or via a programmatic SMS/email) or even manually (e.g. via an SMS/email) if you're working at a small scale.

For this tutorial, you don't actually have to send the link to anyone—you can pretend to be Alexander.

## Step 7: Complete the inquiry

In production, Alexander would click the link and complete verification on his own.

For this tutorial, you'll complete the flow yourself as Alexander:

* Open the link from Step 4.
* Click through the verification flow. Do not enter real personal information, since this is Sandbox.
* Keep the "Pass verifications" toggle enabled (visible at the bottom of the flow) to simulate passing all the checks.

Note: by default, an inquiry will expire if not completed within 24 hours. See [Inquiry expiration](/inquiry-expiration) for details.

## Step 8: (optional) Inspect webhook events

If you set up the webhook in Step 5, check your server logs. You should see events from `inquiry.started`, `inquiry.completed`, and `inquiry.approved`.

Note: If you want to receive the `inquiry.failed` event, you can create a second inquiry using the curl command from Step 3. Then click through the verification flow, this time with the "Pass verifications" toggle *disabled*.

## Step 9: View inquiry results via API

Now that you've completed the inquiry, take a look at the results. Note that because this inquiry was created in Sandbox, some of the data will be demo data.

Retrieve the inquiry details:

```bash
curl https://api.withpersona.com/api/v1/inquiries/inq_XXXXXXXXXXXXX \
-X GET \
-H "Authorization: Bearer YOUR_API_KEY" \
-H "Content-Type: application/json" \
-H "Persona-Version: 2025-10-27"

# Replace:
# - YOUR_API_KEY

---

## [9] https://docs.withpersona.com/inquiries
URL: https://docs.withpersona.com/inquiries
Characters: 6,442 | Depth: 2

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# Inquiries Overview

> Understand how an Inquiry represents one user's interaction with a Persona verification flow.

An inquiry is a single instance of a Persona identity verification flow. Each time an end user goes through your verification flow, the details of that interaction are wrapped in an `inquiry` object.

In inquiry-based flows, Persona provides the UI for users to enter their information[^1]. You can customize this UI and other aspects of the inquiry, like which verification types to run.

At a high level, you set up an inquiry-based verification flow by following these steps:

1. **Configure an inquiry template**: Configure a verification flow by choosing or editing an inquiry template
2. **Pick an integration method**: Choose and implement a way to integrate Persona into your app
3. **Retrieve data**: Fetch completed verification data from Persona to use in your app

[^1]: If you want to provide your own identity verification UI, you need to use a Transactions-based integration. To learn more, [contact the customer support engineering team](https://app.withpersona.com/dashboard/contact-us).

## Inquiry templates

An inquiry template defines the configuration for a verification flow. The configuration specifies details including which screens to show, how to style the UI, which [verifications types](https://help.withpersona.com/verifications/features/verification-service-types/) to include, and which [verification checks](https://help.withpersona.com/articles/5Tc5tsWfBX03AHRkr2vqv2/) to require.

You create inquiries from inquiry templates. In your Persona integration, you can either create an inquiry using the **inquiry template ID**, which refers to the latest published version of the inquiry template; or an **inquiry template version ID**, which points to an unchanging, specific published version of your template.

**Learn more:**

* [Inquiry templates](/inquiry-templates): See more technical details
* [Designing inquiries](https://help.withpersona.com/inquiries/introduction/designing-inquiries/): Learn how to configure inquiry templates
* [Solutions](https://help.withpersona.com/solutions/): Explore solutions that include pre-made inquiry templates for common use cases, like KYC and age verification

## Integration methods

Once you've created a template, you're ready to integrate inquiries into your app. There are several ways to integrate:

| Method            | What it is                                           | Best for                                 |
| ----------------- | ---------------------------------------------------- | ---------------------------------------- |
| **Hosted Flow**   | Redirect users to a Persona-hosted page              | Fastest setup, no frontend code required |
| **Embedded Flow** | Persona UI embedded in your page via iframe or modal | Seamless UX on your site                 |
| **Mobile SDKs**   | Native iOS, Android, and React Native libraries      | Mobile apps, optimal device signals      |

See [Choosing your integration method](/choosing-an-integration-method) for details.

### Link inquiries to accounts

Regardless of which integration method you choose, you'll want to understand accounts and reference IDs when you integrate Persona.

An [account](https://help.withpersona.com/articles/2gE7mjjLCIGJPnK6mTyjU9/) lets you group together all data from a single person or business. For example, if you require your users to verify during your onboarding (inquiry 1), and re-verify a year later (inquiry 2), you can link the two inquiries from the same user to the same account.

Accounts help you spot patterns or inconsistencies across inquiries, and prevent users from completing extra, unneeded inquiries.

To link multiple inquiries to the same account, use the same **reference ID** for each inquiry.

Persona recommends you provide a reference ID for an inquiry whenever possible. Without a reference ID, every inquiry creates a new, unlinked account.

Learn more about [reference IDs](/reference-ids).

### Handle expired inquiries

For security reasons, each inquiry (and [session](/inquiry-sessions) of an inquiry) will [expire](/inquiry-expiration) if it has not been completed in a given amount of time.

You can [resume](/resuming-inquiries) an expired inquiry for an end user, which lets them try to complete it again.

## Retrieve data

After an end user completes an inquiry, you can retrieve the result to use in your app. For example, you might approve or block a user based on the result.

### Inquiry lifecycle

An inquiry moves through a series of statuses from creation to conclusion, and emits an event at each transition. Understanding these statuses helps you know when an inquiry contains a result you can use, and which events to listen for.

![inquiry-lifecycle](https://assets.withpersona.com/f_auto,q_auto/developer-docs/images/inquiry-lifecycle.png)

Typically, inquiries in the `approved`, `declined`, and `needs_review` statuses contain results for you to use. See [Inquiry Model Lifecycle](/model-lifecycle) for the full status and event reference.

### Dashboard, API, and webhooks

There are several ways to get data out of Persona.

To pull data from Persona:

* You can read inquiry details [in the Persona Dashboard](https://help.withpersona.com/articles/nqBDRxxIjiIvnOwsCpri6/).
* You can fetch inquiry details from the [Retrieve an Inquiry](/api-reference/inquiries/retrieve-an-inquiry) API endpoint.

To get data pushed to you, use **webhooks**. Persona will send an HTTP request to your webhook endpoint when inquiry events occur, such as `inquiry.declined` or `inquiry.approved`. See [Webhooks](/webhooks) for details.

## Try out an inquiry

If you haven't yet experienced a Persona inquiry as an end user, we recommend you to complete a test inquiry to help you understand the product. A quick way to do this is to [add a Persona solution](https://help.withpersona.com/articles/67J7FurQtIgwxkWWvUropu/) (e.g. the [KYC Solution](https://help.withpersona.com/articles/2OOWdhAoEeVrMRKRFENneW/)) to your Persona sandbox, then [create a Hosted Flow link](/quickstart-hosted-flow) using one of the no-code methods.

---

## [10] https://docs.withpersona.com/ios-sdk-v2-integration-guide
URL: https://docs.withpersona.com/ios-sdk-v2-integration-guide
Characters: 8,000 | Depth: 2

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# iOS Integration Guide

> Integrate Persona identity verification into an iOS application with UIKit or SwiftUI.

The Persona iOS SDK lets you run identity verification flows in your iOS app from UIKit or SwiftUI. The SDK takes care of the hard parts of identity capture: selfies, government ID scanning and classification, NFC passport reads, document uploads, and silent network authentication. Each flow is configured from a template you manage in the Persona Dashboard.

## Integration

The SDK requires a minimum deployment target of iOS 15.0 or later. If your app needs to support iOS versions below 15.0, please continue using the latest [v2.x release](https://github.com/persona-id/inquiry-ios-2/releases).

### Installation

#### Swift Package Manager

To install the SDK with [Swift Package Manager](https://swift.org/package-manager/):

1. Select your project’s Swift Packages tab.
2. Click on the `+` to add a package.
3. Add the repository URL `https://github.com/persona-id/inquiry-ios-2.git`, and click Next.
4. Choose the package options version rule you want to use. We recommend the default (up to next major version), and click Next.
5. Check that the package is being added to the right target and click Finish.

#### Manual Framework

The SDK is released as an XCFramework which makes manually installing the SDK a straightforward process:

1. Go to the [Persona Inquiry SDK Releases page](https://github.com/persona-id/inquiry-ios-2/releases).
2. Find the latest release.
3. Expand the `Assets` triangle and download the `PersonaSDK.xcframework.zip` file.
4. Unarchive the zip file and drag the `Persona2.xcframework` folder into your Xcode project.
5. A dialog prompt will pop up asking to choose options for adding these files. Please ensure that `Destination` has `Copy items if needed` ticked and that it will be added to the correct target.
6. Click on `Finish`.

#### CocoaPods (v2.x only)

CocoaPods is no longer published from version 3.0 onward. If you need to integrate the Persona Inquiry SDK via CocoaPods, please continue using the latest [v2.x release](https://github.com/persona-id/inquiry-ios-2/releases).

### Permissions

In addition to importing the dependency, you also need to modify your `Info.plist` and add the required permissions:

1. Navigate to your project's settings in Xcode and click the `Info` tab.
2. Add a new "Privacy - Camera Usage Description" (`NSCameraUsageDescription`) entry (if not already present) to enable camera access.
3. Add a new "Privacy - Location When In Use Usage Description" (`NSLocationWhenInUseUsageDescription`) entry (if not already present) to enable GPS access. Unfortunately, Apple does not provide tools to differentiate when the API is in use. Therefore, even if your app or inquiry flow does not utilize the GPS functionality, the usage string must be included because the Persona SDK supports the functionality.
4. \[Optional] If using our support for video verifications, add a new "Privacy - Microphone Usage Description" (`NSMicrophoneUsageDescription`) entry (if not already present) to enable microphone access.
5. \[Optional] If using our support for NFC verifications, "Privacy - NFC Scan Usage Description" (`NFCReaderUsageDescription`) entry (if not already present) to enable NFC access.

### Privacy Configuration

This SDK collects a user’s [IDFV](https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor) for fraud prevention purposes. In [App Store Connect](https://appstoreconnect.apple.com/) > Your App > App Privacy, if you haven’t already add in a “Device Identifier,” and fill out the questionnaire with the following answers:

* **Usage**: App Functionality (covers fraud prevention)
* **Are the device IDs collected from this app linked to the user’s identity?** Yes
* **Do you or your third-party partners use device IDs for tracking purposes?** No

Be sure to also update your privacy manifest according to the features you are making use of from the SDK. See our [iOS Privacy Manifest](/ios-privacy-manifest) instructions for more information.

## Usage

Starting an Inquiry from a [Persona Relay](/relay) session access token? See the [Relay iOS SDK guide](/relay-ios-sdk).

### Build and Launch an Inquiry

#### Persona recommends creating inquiries via API when possible

Please refer to [Creating inquiries](/creating-inquiries) for more information. After getting up and running consider moving inquiry creation to your backend for security reasons.

Start an inquiry with a template ID, inquiry ID, or one-time link code. The samples below use a template ID — replace `itmpl_EXAMPLE` with your own. You can find your Inquiry Template ID in the Persona Dashboard.

When the flow is presented, the SDK takes control of the user interface. Once the flow completes, control returns to your app and the appropriate result handler is called.

#### UIKit

Build the inquiry with `Inquiry.from(templateId:delegate:)` and call `start(from:)` with the presenting view controller.

```swift
class MyViewController: UIViewController {

  // This is hooked up to a button which starts the flow
  @objc
  private func buttonTapped(_ sender: UIButton) {
    // Build the inquiry with the view controller as delegate
    let inquiry = Inquiry.from(templateId: "itmpl_EXAMPLE", delegate: self)
      .build()
      .start(from: self) // start inquiry with view controller as presenter
  }
}
```

#### SwiftUI

Attach the `personaInquiry` view modifier to any view and drive presentation with a `Bool` binding.

```swift
struct MyView: View {
  @State private var showInquiry = false

  var body: some View {
    Button("Start verification") {
      showInquiry = true
    }
    .personaInquiry(
      isPresented: $showInquiry,
      inquiryTemplate: "itmpl_EXAMPLE",
      onResult: { result in
        // Handle the result of the inquiry
      }
    )
  }
}
```

### Handle Results

#### Do not rely on callbacks for critical business logic

SDK callbacks are intended for coordination between your app's UI and Persona's UI (e.g. opening and closing the flow UI). They do NOT guarantee that data are up-to-date, and cannot be reliably used to guarantee data integrity. Webhooks should be used for logic that depends on Inquiry state.

For more information, see [Accessing Inquiry status and data](/accessing-inquiry-status#webhooks-vs-sdk-callbacks).

#### UIKit

To receive the inquiry result, implement the `InquiryDelegate` protocol. For example:

```swift
extension MyViewController: InquiryDelegate {

  func inquiryComplete(inquiryId: String, status: String, fields: [String : InquiryField]) {
    // Inquiry completed
  }

  func inquiryCanceled(inquiryId: String?, sessionToken: String?) {
    // Inquiry cancelled by user
  }

  func inquiryError(_ error: PersonaError) {
    // Inquiry errored
  }

  // Optional: called periodically throughout the flow when events occur.
  // Use for logging or analytics. The inquiry flow remains active during this callback.
  func inquiryEventOccurred(event: InquiryEvent) {
    switch event {
    case .start(let start):
      // Flow has completed initial network load
      // start.inquiryId, start.sessionToken
    case .pageChange(let pageChange):
      // Current page changed
      // pageChange.name (step name), pageChange.path (page within step)
    }
  }
}
```

#### SwiftUI

When presenting the inquiry from SwiftUI, handle the result with the `onResult` closure on the `personaInquiry` view modifier. It receives a `PersonaResult` value with the outcome of the flow.

```swift
SomeView()
  .personaInquiry(
    isPresented: $showInquiry,
    inquiryTemplate: "itmpl_EXAMPLE",
    onEvent: { event in
      // Optional: called period

---

## [11] https://docs.withpersona.com/react-native-sdk-v2-integration-guide
URL: https://docs.withpersona.com/react-native-sdk-v2-integration-guide
Characters: 8,000 | Depth: 2

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# React Native Integration Guide

## Installation

To install the Persona React Native SDK within your React Native application, if you use `yarn` to manage your project dependencies

```shell shell
yarn add react-native-persona
```

If you use `npm` to manage your project dependencies

```shell Shell
npm i react-native-persona
```

### Configure Android

#### Add Android Maven repository

Open your `android/build.gradle` file. Add the Persona Maven repository to the bottom of your repository list.

```
allprojects {
    repositories {
        // ...
        maven {
            url 'https://sdk.withpersona.com/android/releases'
        }
    }
}
```

#### Ensure minimum compile sdk

In the `app/build.gradle` file, make sure the `compileSdkVersion` is at least 33.

```
android {
   // ...
   compileSdkVersion = 33
   // ...
}
```

#### Ensure minimum Android Gradle Plugin version

Make sure your project's Android Gradle Plugin version is at least 8.0.

### Common Android issues

#### `android/build.gradle` not found

If you're using Expo and can't find your `android/build.gradle` file try running `npx expo run:android` to generate the native android project for your app. If your app doesn't load our Android native module you'll receive the following runtime error:

> Cannot read property 'startInquiry' of null

After running this command and generating the `build.gradle` file, you can then configure it according to the instructions above.

#### Maven can't resolve `com.withpersona.sdk2:inquiry`

```
Could not determine the dependencies of task ':app:processDebugResources'.
> Could not resolve all dependencies for configuration ':app:debugRuntimeClasspath'.
   > Could not find com.withpersona.sdk2:inquiry:2.x.y.
     Searched in the following locations:
       - https://repo.maven.apache.org/maven2/com/withpersona/sdk2/inquiry/2.x.y/inquiry-2.x.y.pom
       ...
```

Refer to instructions above on adding our maven repo url to your project's `build.gradle` file, you can also reference our example here [https://github.com/persona-id/persona-react-native-sample/blob/main/SampleApp/android/build.gradle#L38-L40](https://github.com/persona-id/persona-react-native-sample/blob/main/SampleApp/android/build.gradle#L38-L40).

### Configure iOS

#### Install iOS pods

Ensure Cocoapods v1.10.x or higher is installed.

```
cd ios; pod install
```

#### iOS Permissions

Modify your `Info.plist` file to add the appropriate Privacy Usage Descriptions (if not already present). Navigate to your project's settings in Xcode and click the Info tab.

| Info.plist Key                                                                       | Note                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Privacy - Camera Usage Description NSCameraUsageDescription                          | Used to access Camera for Government Id, Selfie, and Document flows.                                                                                                                                                                                                         |
| Privacy - Location When In Use Usage Description NSLocationWhenInUseUsageDescription | Required. Used for GPS collections. Unfortunately, Apple does not provide tools to differentiate when the API is in use. Therefore, even if your app does not utilize the GPS functionality, we must include the usage string because our SDK includes geolocation features. |
| Privacy - Photo Library Usage Description NSPhotoLibraryUsageDescription             | Optional. Used on Document flows and on Government Id flows when file upload is enabled.                                                                                                                                                                                     |
| Privacy - NFC Scan Usage Description NFCReaderUsageDescription                       | Optional. Used for Passport NFC flows.                                                                                                                                                                                                                                       |
| Privacy - Microphone Usage Description NSMicrophoneUsageDescription                  | Optional. Used for video flows.                                                                                                                                                                                                                                              |

#### iOS minimum deployment target

Our native iOS SDK requires a minimum iOS deployment target of 13.0.

In your project's `ios/Podfile`, ensure your `platform` target is set to 13.0.

```
platform :ios '13.0'
```

#### iOS Privacy Configuration

This SDK collects a user’s [IDFV](https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor) for fraud prevention purposes. In [App Store Connect](https://appstoreconnect.apple.com/) > Your App > App Privacy, if you haven’t already add in a “Device Identifier,” and fill out the questionnaire with the following answers:

* **Usage**: App Functionality (covers fraud prevention)
* **Are the device IDs collected from this app linked to the user’s identity?** Yes
* **Do you or your third-party partners use device IDs for tracking purposes?** No

### Common iOS issues

#### `ios/` folder not found

If you're using expo and can't find your `ios` folder, try running `npx expo run:ios` to generate the native iOS project for your app. Then run `pod install` from the `ios` folder. If your app doesn't load our iOS native module you'll receive the following runtime error:

> Your JavaScript code tried to access a native module that doesn't exist.

## Usage

The Persona Inquiry flow can be initiated with either a `template ID` or an `inquiry ID`.

Please refer to the code sample below and replace `my_template_id` with your `template ID`. You can find your `template ID` on the Persona Dashboard under [Integration](https://withpersona.com/dashboard/integration).

This starts the Inquiry flow and takes control of the user interface. Once the flow completes, the control of the user interface is returned to the app and the appropriate callbacks are called.

```javascript javascript
import {Inquiry, Environment} from 'react-native-persona';
// ...
<Button
  title="Start Inquiry"
  onPress={() => {
    Inquiry.fromTemplate('itmpl_EXAMPLE')
      .environment(Environment.SANDBOX)
      .onComplete((inquiryId, status, fields) =>
        Alert.alert(
          'Complete',
          'Inquiry ' + inquiryId + ' completed with status "' + status + '."',
        ),
      )
      .onCanceled((inquiryId, sessionToken) =>
        Alert.alert('Canceled', 'Inquiry ' + inquiryId + ' was cancelled'),
      )
      .onError(error => Alert.alert('Error', error.message))
      .build()
      .start();
  }}
/>
```

### Inquiry Fields

The `onComplete` callback returns `fields`, which is an object containing information extracted during the inquiry. Refer to the field schema for a given template in the Persona Dashboard.

### Configuration options

Some differ

---

## [12] https://docs.withpersona.com/environments
URL: https://docs.withpersona.com/environments
Characters: 1,291 | Depth: 2

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# Environments

> Understand how sandbox and production environments affect data, billing, and verification behavior.

There are two types of environments for the Persona flow: sandbox and production.

## Sandbox

Sandbox mode is provided so that you can test your integration without incurring any usage charges. **Real verifications are not performed within sandbox mode.**

A toggle is provided that allows you to force passes or force fails so that you can view and test all the possible states for your integration. Within your dashboard, sample data will be shown.

If you'd like to test information extraction and our verification technology, please [contact us](https://app.withpersona.com/dashboard/contact-us).

## Production

Once you are confident with your integration, [contact us](https://app.withpersona.com/dashboard/contact-us) to discuss pricing and enable a production environment for your organization. Verifications within production environments will be counted towards your overall usage charge.

---

## [13] https://docs.withpersona.com/hosted-flow-subdomains
URL: https://docs.withpersona.com/hosted-flow-subdomains
Characters: 758 | Depth: 2

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# Subdomains

> Serve Hosted Flow links from a custom withpersona.com subdomain.

Change the subdomain of your hosted flow URL in the [Domain Manager](https://app.withpersona.com/dashboard/manage-domain) of your Dashboard.

Once set, you can add the subdomain to your hosted flow URLs. The one time link(s) will also use it. `https://your-subdomain.withpersona.com/verify?template-id=<your template ID starting with itmpl_>`

An instance of Persona only allows for one unique subdomain.

---

## [14] https://docs.withpersona.com/reference-ids
URL: https://docs.withpersona.com/reference-ids
Characters: 2,244 | Depth: 2

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# Reference IDs

> Use reference IDs to identify users and link multiple Inquiries to one Account.

A reference ID is a string that you assign to identify a unique end user in Persona.

A reference ID lets you link multiple Persona inquiries to a single Persona [account](/accounts). Inquiries created with the same reference ID are automatically associated with the same account.

#### Best practice

Persona recommends you provide a reference ID for an inquiry whenever possible.

### Using reference IDs

You should assign the same reference ID to every inquiry you create for a single end user. This helps you:

* Easily look up the status of all interactions between this user and Persona
* More easily re-verify the user
* Guard against a user [creating multiple inquiries](/prevent-users-from-creating-multiple-inquiries)

### Choosing a reference ID

The value you choose as the reference ID can help you tie a Persona account back to your business.

Persona recommends you use the "user ID" of a user within your internal systems as the corresponding reference ID for their Persona inquiries. This provides a clear way to tie each Persona account back to your systems.

#### Reference IDs and PII

Prefer using UIDs instead of sensitive information such as email addresses. Persona does not treat reference IDs as PII.

### Setting a reference ID

Your Persona integration method determines how you set a reference ID:

* [**Server API**](/api-reference/inquiries/create-an-inquiry) (recommended): Pass the reference ID in the `auto-create-account-reference-id` field in the `meta` object in your request payload
* [**Embedded**](/embedded-flow-parameters): Pass the field to the `referenceId` parameter in the embed code
* [**Hosted**](/hosted-flow-parameters): Include the reference ID as a query string parameter (`&reference-id=abc`)

You can also set a reference ID on an existing Persona account [through the API](/api-reference/accounts/update-an-account).

---

## [15] https://docs.withpersona.com/creating-inquiries
URL: https://docs.withpersona.com/creating-inquiries
Characters: 3,902 | Depth: 2

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# Creating Inquiries

> Create Inquiries through the API or directly from a client-side integration.

Persona supports both API-based inquiry creation, as well as client-side, end-user driven inquiry creation.

## Creating inquiries via API

1. Call [api/v1/inquiries](/api-reference/inquiries/create-an-inquiry) to create a new inquiry.
2. Pass the inquiry ID starting with `inq_` to your integration. See the documentation for your integration type for more information.
3. When the end user accesses the Persona flow, the linked Inquiry will be loaded. Note that if the Inquiry has already been accessed, the user will need to be authenticated via a session token. See [Resuming Inquiries](/resuming-inquiries) for more information.

## Creating inquiries client-side

1. Pass the template ID starting with `itmpl_` to your integration. See the documentation for your integration type for more information.
2. When the end user accesses the Persona flow, a new Inquiry will automatically be created using the provided template. Note that if the user closes or restarts the flow, an entirely new Inquiry will be created, and all progress will be lost.

Client-side inquiry creation can be disabled on a per-template basis.

## Disabling client-side inquiry creation

Client-side inquiry creation can be disabled on a per-template basis in the Dashboard by navigating to a Template > Configure > Security > Block client-side Inquiry creation.

## Should I use API or client-side inquiry creation?

We recommend API-based inquiry creation whenever possible. API-based inquiry creation has many benefits:

1. It is easier to ensure that unique users only go through the flow a single time. See [Prevent users from creating multiple Inquiries](/prevent-users-from-creating-multiple-inquiries) for more information.
2. Avoid bad actors creating a large number of Inquiries by controlling exactly when Inquiries are created and accessed.
3. API-based creation allows you to [prefill fields](/hosted-flow-fields) in a way that cannot be modified by the end user. Client-side prefill works via query string params, which are visible to end users.

However, there are situations where client-side inquiry creation may be preferred.

1. Client-side inquiry creation does not require you to have a backend capable of interacting with Persona's API.
2. Client-side inquiry creation is easier to integrate and can be helpful for evaluations and proofs of concept.
3. Inquiries expire after 24 hours by default, so any Inquiry created by API will be inaccessible after then. This can be worked around by only creating the inquiry when the user needs to go through the flow, setting a longer expiration interval, or [resuming the inquiry](/resuming-inquiries). However, these can be difficult in certain use cases, like when Inquiry links are emailed to end users. In cases like this, client-side creation can be lower friction to implement.

## Other notes

### Conversion metrics

The way Inquiries are created can cause conversion metrics and dropoff analysis to be misleading.

If using the API, creating Inquiries too far ahead of when users will go through the flow can lead to a large amount of Inquiries that are never accessed, causing dropoff to appear higher than it actually is.

If using client-side creation, users can create as many Inquiries as they want, which can lead to a large amount of Inquiries that are never completed, similarly inflating dropoff.

For the most accurate metrics, we recommend creating Inquiries via API, and creating Inquiries as close as possible to the point where users need to go through the flow.

---

## [16] https://docs.withpersona.com/hosted-flow-parameters
URL: https://docs.withpersona.com/hosted-flow-parameters
Characters: 8,000 | Depth: 2

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# Parameters

> Configure Hosted Flow behavior with query string parameters.

Query string parameters can be passed to customize the behavior of the hosted flow.

There are two main ways to use the hosted flow: creating new inquiries, and resuming existing inquiries. If you have an `inquiry-id` available (e.g. from [creating an inquiry via API](/api-reference/inquiries/create-an-inquiry)), please see [Resuming existing inquiries](/resuming-inquiries).

#### Special characters in URL parameters

Be sure to escape your values if you are passing non-alphanumeric characters in your parameters. For example, values including whitespace or symbols like `+` and `&` need to be escaped. In JavaScript, this can be done with [`encodeURIComponent`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent).

For example, if your `redirect-uri` itself contains a query string, `&` should be replaced with `%26`.

## Creating new inquiries

The most common way to set up the hosted flow is to specify an inquiry template ID (`inquiry-template-id`). This will create a new inquiry every time the link is accessed.

Persona recommends connecting new inquiries to an account. To connect the inquiry to an account, specify either `reference-id` or `account-id`. You cannot specify both.

| Parameter                                                         | Requirement | Description                                                                                                                                                                                                                                                                                                                                                 |
| ----------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `inquiry-template-id` `inquiry-template-version-id` `template-id` | Required    | This template ID corresponds to a pre-set configuration and determines how the flow is customized. See [Inquiry Templates](/inquiry-templates).                                                                                                                                                                                                             |
| `environment-id`                                                  |             | The Persona API environment on which to create inquiries. See [Environments](/environments).                                                                                                                                                                                                                                                                |
| `reference-id`                                                    |             | You can generate and provide a unique ID which we will associate with the inquiry. Oftentimes this will be the unique user identifier from your system. A new account will be created if no account with the given reference ID exists. Inquiries with the same reference ID will be associated with the same account. See [Reference IDs](/reference-ids). |
| `account-id`                                                      |             | ID of an existing account to associate newly created inquiries with. If `account-id` is passed, passing either `reference-id` or `account-type-id` will result in an error. See [Accounts](/accounts).                                                                                                                                                      |
| `account-type-id`                                                 |             | ID of the account type to use if creating a new account for the inquiry. If omitted, the default account type associated with the current environment will be used. `account-type-id` will be ignored if a new account is not created (for example, if passed with a `reference-id` that does not correspond with an existing account).                     |
| `fields`                                                          |             | Provide an object to set inquiry field values. Each attribute in the object is optional. This will also prefill form inputs corresponding to the field in the flow. See [Fields](/hosted-flow-fields).                                                                                                                                                      |

## Access inquiry created via API or resuming existing inquiries

If you have pre-created an inquiry via API or you are looking to resume an existing inquiry instead of creating a new one, use the `inquiry-id` parameter. Do not pass a `template-id` or `inquiry-template-version-id` when resuming the inquiry.

If the inquiry already has submitted verifications, you need to specify a `session-token` as well. You can generate a session token with the [/api/v1/inquiries/\[inquiry-id\]/resume](/api-reference/inquiries/resume-an-inquiry) endpoint.

| Parameter       | Required | Description                                                                                                                                                   |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `inquiry-id`    | Required | Specify an inquiry ID to resume an existing inquiry. If the inquiry has a `pending` status, then a `session-token` from the server-side API is required.      |
| `session-token` |          | When resuming an inquiry with a `pending` status, you must also generate a session token from the server-side API. See [Inquiry Sessions](/inquiry-sessions). |

## Other parameters

These parameters are not related to creating or resuming inquiries, and can always be specified.

| Parameter       | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `language`      |          | Specify a supported language to localize the flow. Language will be inferred from browser settings by default. See [Languages](/languages).                                                                                                                                                                                                                                                                                                                      

---

## [17] https://docs.withpersona.com/inquiry-fields
URL: https://docs.withpersona.com/inquiry-fields
Characters: 7,153 | Depth: 2

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# Inquiry Fields

> Configure and access standard and custom fields collected by an Inquiry.

Inquiries store values collected from the customer in fields, and inquiry template versions define the field schemas.

You can configure custom fields on your template field schema to support your use cases. Please contact support or your CSM to get started.

#### Field values and customers

Fields are expressly intended for storing customer-supplied information and are meant to be readable and writable by the end user. We do not recommend storing data that should not be exposed to end users in Inquiry Fields.

## Field types

| Name            | Input Format                             | Notes                                                                                     |
| --------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------- |
| `array`         | `['a', 'b', 'c']`, `[1, 2, 3]`           | Typed array                                                                               |
| `boolean`       | `true`, `false`                          |                                                                                           |
| `choices`       | `'enum_1'`                               |                                                                                           |
| `date`          | `'YYYY-MM-DD'`                           | ISO 8601 string                                                                           |
| `datetime`      | `'YYYY-MM-DDThh:mm:ss.000Z'`             | ISO 8601 string                                                                           |
| `file`          | `{ filename: string; io: base64 data; }` | Serializes as:`{ filename: string; byte_size: integer; mime_type: string; url: string; }` |
| `hash`          | Dependent on configuration               | Dictionary with string keys and field values                                              |
| `multi_choices` | `['enum_1', 'enum_2']`                   | Array of strings                                                                          |
| `number`        | `123`, `123.45`                          |                                                                                           |
| `string`        | `'hello world'`                          |                                                                                           |

## Prefilling Inquiry fields

If you already have information you’ve collected on your user, you can pre-populate their inquiry with this information at creation time. This will:

* Streamline the user experience. If the user has already given you this information, there’s no need to have them type it again into Persona. You can prefill the inquiry and just have the user confirm everything is correct.
* Have an extra level of assurance that the user’s information is valid. For example, if you pass through a name and birthdate, you can configure your template to check that the information extracted from the user’s Government ID matches what was prefilled.

### How to do it

* [**Server API:**](/api-reference/inquiries/create-an-inquiry) (recommended) Pass in the desired fields upon creation of the inquiry via API call. This is Persona's recommended method.
* [**SDK:**](/embedded-flow-fields) When implementing with one of Persona’s SDKs and creating the inquiry on-the-fly, you can send the fields over in the builder.
* [**Hosted:**](/hosted-flow-fields) You can add fields to the URL when using a generic inquiry template link.

## Reading fields via API

An inquiry's fields can be retrieved via the external API using a GET request. Fields are also passed back to the caller in inquiry flows on completion.

Fields are serialized as a nested map of field name to field type and field value. For example:

```json json
{
  "name-first": {
    "type": "string",
    "value": "John",
  },
  "name-last": {
    "type": "string",
    "value": "Doe",
  },
  "birthdate": {
    "type": "date",
    "value": "1980-12-25",
  }
}
```

## Writing fields via API

When updating an inquiry via API, fields should be passed as a map of field name to field value. Field type does not need to be specified.

```json json
{
  "name-first": "John",
  "name-last": "Doe",
  "birthdate": "1980-12-25"
}
```

## Field schema policies

#### Experimental

Field policies are currently in beta and are not generally available. If you think field policies fit your use case, please contact support or your CSM for more information.

Field behavior can be modified with field policies.

| Field write policies | Description                                                                                                                                                                                                                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `none`               | Default. No special behavior.                                                                                                                                                                                                                                                                                   |
| `write_once`         | The field will become immutable after it has been set for the first time (via the end user, query string parameters, or external API). Setting a default value on the field schema will NOT cause the field to become immutable. Setting the field value to be `null` WILL cause the field to become immutable. |

| Field redaction policies | Description                                                                                                                                                                                     |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `none`                   | Default. No special behavior.                                                                                                                                                                   |
| `never`                  | This field will never be redacted. This is intended to be used for fields such as timestamps or tracking terms of service acceptance, and is NOT intended to be used for fields containing PII. |

---

## [18] https://docs.withpersona.com/resuming-inquiries
URL: https://docs.withpersona.com/resuming-inquiries
Characters: 8,000 | Depth: 2

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# Resuming Inquiries

> Resume an Inquiry securely with a session token or one-time link.

Inquiries may need to be resumed in several situations:

1. **The Inquiry is in progress and the user does not have a session token.** As Inquiries contain PII, we restrict when Inquiries can be resumed. While newly created Inquiries can be accessed by anyone with a link to the Inquiry, pending Inquiries require a session token to be accessed by the end user. Session tokens are generated by resuming Inquiries, and can be passed via query string parameters for hosted flows, and via the client SDKs for embedded, inline, and native flows.
2. **The user lost their session token.** [Session tokens](/inquiry-sessions#session-tokens) are stored in [session storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), which is local to the current browser tab. If a user closes a pending Inquiry and reopens it in a separate browser window, they will lose their session token and see a 'Session expired' error. They will be unable to continue the Inquiry without a new session token or [one-time link](/inquiry-one-time-links).
3. **The Inquiry has expired.** To ensure that Inquiries are associated with only one individual, pending Inquiries are expired after a set time period (24 hours by default), after which the Inquiry becomes inaccessible to end users. For more information, see [Inquiry Expiration](/inquiry-expiration).
4. **The Inquiry session has expired.** This is less common, but if an Inquiry has multiple sessions, older sessions may expire before the Inquiry expires.

Persona provides two ways to access Inquiries that are in progress:

1. Generating a [one-time link](/inquiry-one-time-links)
2. Creating a new [session token](/inquiry-sessions#session-tokens)

#### One-time link codes vs. session tokens

While pending Inquiries can also be accessed by including a [session token](/inquiry-sessions#session-tokens) in the Inquiry link URL, one-time links present the following benefits:

1. Security: one-time link codes expire after a single use (with a 5 minute grace period), whereas session tokens are valid for the lifetime of the [Inquiry Session](/inquiry-sessions).
2. Convenience: session tokens are JWTs and can result in verbose links, while one-time links are short and portable. This can be useful when presenting one-time links as QR codes.

One-time links have the following downsides:

1. Browser-only: as one-time links are URLs, they can only be used for browser-based flows ([Hosted Flow Integration](/hosted-flow), and cannot be used in Inquiry SDKs ([Embedded Integration](/embedded-flow) and [Mobile Integration](/mobile-sdks)).
2. Expired Inquiries: one-time links cannot be generated for expired Inquiries. Expired Inquiries must first be resumed.

## Generating a one-time link

If you are using a browser-based integration, you can generate a one-time link that will allow the end user to access the Inquiry.

Call [/api/v1/inquiries/\<inquiry-id>/generate-one-time-link](/api-reference/inquiries/generate-a-one-time-link) to receive a one-time link. Within the response, the one-time link can be found within the response's `meta` object. This link will expire after a set time period (24 hours by default) if not used.

```ruby ruby
require 'http'
response = HTTP.
  headers('Authorization': "Bearer #{api_key}").
  post("https://api.withpersona.com/api/v1/inquiries/#{inquiry_id}/generate-one-time-link")
inquiry = JSON.parse(response.body)
```

```python python
import requests
response = requests.post(
  'https://withpersona.com/api/v1/inquiries/{}/generate-one-time-link'.format(inquiry_id),
  headers: { 'Authorization': 'Bearer {}'.format(api_key) },
)
inquiry = response.json()
```

```javascript javascript
const request = require("request");
request.post(
  {
    json: true,
    url: 'https://withpersona.com/api/v1/inquiries/' + inquiryId + '/generate-one-time-link',
    headers: { Authorization: 'Bearer ' + apiKey }
  },
  (err, res, body) => {
    inquiry = res;
  }
);
```

Then, send the one-time link to the end user.

## Creating a new session token

If the Inquiry is expired, or if you use a non-browser-based integration, you will need to create a new session token and use that to access the Inquiry.

### Step 1: Create a session token

Call [/api/v1/inquiries/\<inquiry-id>/resume](/api-reference/inquiries/resume-an-inquiry) to receive a session token. Within the response, the session token can be found as `session-token` within the response's `meta` object. This token will expire after a set time period (24 hours by default) if it is not used.

```ruby ruby
require 'http'
response = HTTP.
  headers('Authorization': "Bearer #{api_key}").
  post("https://api.withpersona.com/api/v1/inquiries/#{inquiry_id}/resume")
inquiry = JSON.parse(response.body)
```

```python python
import requests
response = requests.post(
  'https://withpersona.com/api/v1/inquiries/{}/resume'.format(inquiry_id),
  headers: { 'Authorization': 'Bearer {}'.format(api_key) },
)
inquiry = response.json()
```

```javascript javascript
const request = require("request");
request.post(
  {
    json: true,
    url: 'https://withpersona.com/api/v1/inquiries/' + inquiryId + '/resume',
    headers: { Authorization: 'Bearer ' + apiKey }
  },
  (err, res, body) => {
    inquiry = res;
  }
);
```

```json json
{
  "data": { ... },
  "meta": {
    "session-token": "SESSION_TOKEN"
  }
}
```

### Step 2: Load the session

Boot up the flow using both the Inquiry ID and session token as parameters.

#### [Embedded flow](/embedded-flow)

Add the `inquiryId` and the `sessionToken` as an input to the builder:

```html html
<!-- Replace "X.Y.Z" with the Inquiry SDK version you want to use. -->
<script src="https://cdn.withpersona.com/dist/persona-vX.Y.Z.js"></script>

<script>
  const client = new Persona.Client({
    inquiryId: "inq_SOME_INQUIRY_ID",
    sessionToken: "SOME_SESSION_TOKEN"
    onLoad: (_error) => client.open(),
    onComplete: meta => {
      // Inquiry completed. Optionally tell your server about it.
      console.log('Sending finished inquiry ' + meta.inquiryId + ' to backend');
      fetch('/server-handler?inquiry-id=' + meta.inquiryId);
    }
  });
</script>
```

#### [Hosted flow](/hosted-flow)

Append the `inquiry-id` and `session-token` parameters to the end of the hosted flow URL: `&inquiry-id=<inquiry id>&session-token=<session token>`

## Resuming Inquiries vs. creating new Inquiries

When possible, we recommend resuming pending Inquiries rather than creating a brand new Inquiry when handling returning users. If your user has already completed part of the Inquiry, resuming the Inquiry will allow them to pick up where they left off, which improves the user experience and reduces data duplication.

Note that resuming Inquiries on older versions of a template can lead to unexpected results. Inquiries are pinned to the current state of their template when created, and any updates made to the template between when the Inquiry was created and when it was resumed will not be reflected in the resumed Inquiry. If the latest published version of the Inquiry's template has changed, we recommend creating a new Inquiry instead of resuming the pending Inquiry, to ensure that the most up-to-date configuration is used.

To check if an Inquiry is on the latest template version, examine the `inquiry-template` object within the `included` array in the Inquiry API response. The `inquiry-template` object in the response will contain the ID of the latest published template version under the field `latest-published-version.id`. If this ID differs from the `inquiry-template-version-id` on the Inquiry, then the Inquiry is 

---

## [19] https://docs.withpersona.com/languages
URL: https://docs.withpersona.com/languages
Characters: 1,957 | Depth: 2

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# Internationalization

> Configure the language used by Persona Inquiry flows.

Persona's inquiry flow supports multiple languages. Users can select their desired language in the footer of the inquiry flow's initial view. By default, language is inferred from the user's device settings.

Language can be preconfigured by setting the `language` query string parameter for the hosted integrations, and by setting the `language` attribute in the Javascript SDK for the embedded and inline integrations.

## Supported languages

The inquiry flow currently supports the following language codes. If you need a language that is not yet supported, please contact us.

Locale codes follow the IETF BCP 47 format, and are composed of a two-character ISO 639 language code optionally joined with a two-character ISO 3166 country code.

* `ar-EG` — Arabic (Egypt)
* `az` — Azerbaijani
* `bg` — Bulgarian
* `bn` — Bengali/Bangla
* `cs` — Czech
* `cy` — Welsh
* `da` — Danish
* `de` — German
* `el-GR` — Greek (Greece)
* `en-US` — English (US)
* `es-MX` — Spanish (Mexico)
* `fi` — Finnish
* `fr` — French
* `he` — Hebrew
* `hi` — Hindi
* `hr` — Croatian
* `hu` — Hungarian
* `hy` — Armenian
* `id-ID` — Indonesian (Bahasa)
* `it` — Italian
* `ja` — Japanese
* `ko-KR` — Korean
* `lt` — Lithuanian
* `ms` — Malay
* `nl-NL` — Dutch (Netherlands)
* `no` — Norwegian
* `pl` — Polish
* `pt-BR` — Portuguese (Brazil)
* `ro` — Romanian
* `ru` — Russian
* `sk` — Slovak
* `sr` — Serbian
* `sv` — Swedish
* `ta` — Tamil
* `th` — Thai
* `tl` — Filipino (Tagalog)
* `tr-TR` — Turkish
* `uk-UA` — Ukrainian
* `ur` — Urdu
* `vi` — Vietnamese
* `zh-CN` — Chinese (Simplified)
* `zh-TW` — Chinese (Traditional)

---

## [20] Complete Your Profile - Dog Walker
URL: https://docs.withpersona.com/tutorial-embedded-flow-precreate
Characters: 8,000 | Depth: 2

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# Tutorial: Pre-create inquiries for Embedded Flow

> Pre-create an Inquiry through the API before launching Embedded Flow.

An Embedded Flow embeds Persona's verification UI directly into your website as an iframe.

There are [two ways to use Embedded Flow](/choosing-an-integration-method#embedded-flow-web-sdk):

1. **Generate inquiries from an inquiry template** (Minimal code required)
2. **Pre-create inquiries via API** (More code required)

This guide walks you through the second method: pre-creating inquiries via API. This is the method we recommend you use in production.

You will:

* Create inquiries with prefilled user data in your backend server
* Check for existing inquiries to avoid duplicates
* Enable the user to resume partially-completed inquiries
* Pass an inquiry ID to your frontend
* Display the Embedded Flow with an inquiry ID

#### Production note

The sample code in this guide illustrates an approach that we recommend in production.

However, for demonstration purposes, the code itself is simplified and not production-ready. For example, it does not include:

* Authentication
* Fetching real user information from a database
* Error handling and retry logic
* Monitoring

#### Alternative: Generate inquiries from template

Pre-creating inquiries (the method shown in this guide) is recommended for production use. However, if you're looking for the fastest way to test Embedded Flow, see [Tutorial: Embedded Flow with Inquiry Template](/tutorial-embedded-flow-inquiry-template).

## Prerequisites

You'll need:

* A Persona account
* A Persona [API key](/api-keys) - use the **Sandbox API key**
* Python installed locally
  * This guide provides sample code in Python, but you can adapt it to any language.

Before you start, you should:

* Understand what an [inquiry](/inquiries) is
* Understand [inquiry statuses](/model-lifecycle)
* Complete [Tutorial: Embedded Flow with Inquiry Template](/tutorial-embedded-flow-inquiry-template) to understand the SDK
* Sign into the [Persona dashboard](https://help.withpersona.com/articles/3QGnmQLLnykxUkPl1wIdLT/) and switch into your [Sandbox environment](/environments)

## Scenario

A user named Alexander Sample just joined your dog walking app as a dog walker. You want to verify his identity to ensure the safety of users on your service.

Alexander's user ID in *your* app is "usr\_ABC123". During account signup in your app, he stated his birthdate is August 31, 1977.

## Step 1: Create an inquiry template

Every inquiry is created from an [inquiry template](/inquiry-templates), which defines details like the specific verification logic and UI text and branding of that inquiry. You can think of inquiry templates as a mold that lets you create many inquiries.

Persona offers a suite of [solutions](https://help.withpersona.com/solutions/all-solutions/) that include preconfigured inquiry templates. In this tutorial, use the "KYC" solution to verify your dog walkers.

**Follow [these instructions](https://help.withpersona.com/articles/67J7FurQtIgwxkWWvUropu/)** to add the "KYC" solution to your Sandbox environment.

## Step 2: Locate the inquiry template ID

Find the ID of the newly-created inquiry template.

In the Persona dashboard, navigate to **Inquiries** > **Templates**. Find the "KYC" template in the list of inquiry templates, and note the value in the `ID` field. The value should begin with `itmpl_`.

## Step 3: Create the web page

Create the web page that will display the Embedded Flow. This page shows the user onboarding flow that Alexander Sample is completing in your dog walking app.

1. Create a new directory called `embedded-flow-precreate-demo/`. Then create a subdirectory called `frontend/`.

2. Inside `frontend/`, create a file called `onboarding.html` with the following code:

```html embedded-flow-precreate-demo/frontend/onboarding.html
<!DOCTYPE html>
<html>
<head>
  <title>Complete Your Profile - Dog Walker</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      text-align: center;
    }
    .container {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 40px;
      background-color: #f9f9f9;
    }
    h1 {
      color: #333;
      margin-bottom: 10px;
    }
    p {
      color: #666;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    button {
      background-color: #0066cc;
      color: white;
      border: none;
      padding: 15px 40px;
      font-size: 16px;
      border-radius: 5px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0052a3;
    }
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    .user-info {
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 15px;
      margin-bottom: 30px;
      text-align: left;
    }
    .user-info h3 {
      margin-top: 0;
      color: #333;
    }
    .user-info p {
      margin: 8px 0;
    }
  </style>
  <script src="https://cdn.withpersona.com/dist/persona-vX.Y.Z.js" crossorigin="anonymous"></script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body>
  <div class="container">
    <h1>Welcome, Alexander 🐕</h1>
    <p>
      Before you can start walking dogs, we need to verify your identity.
      This helps ensure the safety of pet owners and walkers like you.
    </p>

    <div class="user-info">
      <h3>Your Information</h3>
      <p><strong>Name:</strong> Alexander Sample</p>
      <p><strong>Birthdate:</strong> August 31, 1977</p>
    </div>

    <button id="verify-button">Start Verifying</button>
  </div>
  <div>
    <p>Debug info:</p>
    <p id="debug-info"></p>
  </div>

  <script>
  document.getElementById('verify-button').addEventListener('click', async () => {
    try {
      // Call your backend to get or create an inquiry
      const response = await fetch('http://localhost:8000/api/inquiries/get-or-create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to create inquiry');
      }

      const data = await response.json();
      const inquiryId = data.inquiry_id;
      const sessionToken = data.session_token;

      // Build client config
      const clientConfig = {
        inquiryId: inquiryId,
        environmentId: `env_XXXXXXXXXXXXX`,
        onReady: () => client.open(),
        onComplete: ({ inquiryId, status }) => {
          // Inquiry completed. For demonstration purposes, we will show a debug message in the UI.
          document.getElementById('debug-info').innerText = 'Completed inquiry with ID: ' + inquiryId + ' \n\nWrite down this ID for Step 8.';

          // Here, you could also send a request to your backend to log the completion.

          // Clean up the client to avoid memory leaks.
          client.destroy();
        },
        onCancel: () => {
          console.log('User cancelled verification');
        },
        onError: (error) => {
          console.error('Verification error:', error);
        }
      };

      // Add session token if resuming a pending inquiry
      if (sessionToken) {
        clientConfig.sessionToken = sessionToken;
      }

      // Open Persona flow
      const client = new Persona.Client(clientConfig);

    } catch (error) {
      console.error('Error:', error);
    }
  });
  </script>
</body>
</html>
```

3. In the code, replace:

* `X.Y.Z` with the [latest SDK version](/embedded-flow-changelog)
* `env_XXXXXXXXXXXXX` with your Sandbox environment ID. Here's [how to find it](https://help.withperso

---

## [21] Complete Your Profile - Dog Walker
URL: https://docs.withpersona.com/tutorial-embedded-flow-inquiry-template
Characters: 8,000 | Depth: 2

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# Tutorial: Embedded Flow with Inquiry Template

> Launch Embedded Flow from an Inquiry template with minimal client-side code.

An Embedded Flow embeds Persona's verification UI directly into your website as an iframe.

There are [two ways to use Embedded Flow](/choosing-an-integration-method#embedded-flow-web-sdk):

1. **Generate inquiries from an inquiry template** (Minimal code required)
2. **Pre-create inquiries via API** (More code required)

This guide walks you through the first method: generating inquiries from an inquiry template.

You will:

* Create a web page that shows a user onboarding flow
* Configure a button to open a Persona verification via Embedded Flow
* Test that your flow works
* View inquiry results via API
* (optional) Set up and receive webhook alerts about changes to the inquiry

#### Alternative: Pre-create inquiries

Generating inquiries from an inquiry template (the method shown in this guide) is the fastest way to implement Embedded Flow. However, due to [limitations of this method](#limitations-of-this-approach), we recommend you pre-create inquiries in production. To learn how, see [Tutorial: Pre-create inquiries for Embedded Flow](/tutorial-embedded-flow-precreate).

## Prerequisites

You'll need:

* A Persona account
* Python installed locally
  * This guide shows how to host an HTML page on `localhost` using Python, but you can adapt the setup to another language.

Before you start, you should:

* Understand what an [inquiry](/inquiries) is
* Sign into the [Persona dashboard](https://help.withpersona.com/articles/3QGnmQLLnykxUkPl1wIdLT/) and switch into your [Sandbox environment](/environments)

## Scenario

A user named Alexander Sample just joined your dog walking app as a dog walker. You want to verify his identity to ensure the safety of users on your service.

Alexander's user ID in *your* app is "usr\_ABC123". During account signup in your app, he stated his birthdate is August 31, 1977.

## Step 1: Create an inquiry template

Every inquiry is created from an [inquiry template](/inquiry-templates), which defines details like the specific verification logic and UI text and branding of that inquiry. You can think of inquiry templates as a mold that lets you create many inquiries.

Persona offers a suite of [solutions](https://help.withpersona.com/solutions/all-solutions/) that include preconfigured inquiry templates. In this tutorial, use the "KYC" solution to verify your dog walkers.

**Follow [these instructions](https://help.withpersona.com/articles/67J7FurQtIgwxkWWvUropu/)** to add the "KYC" solution to your Sandbox environment.

## Step 2: Locate the inquiry template ID

Find the ID of the newly-created inquiry template.

In the Persona dashboard, navigate to **Inquiries** > **Templates**. Find the "KYC" template in the list of inquiry templates, and note the value in the `ID` field. The value should begin with `itmpl_`.

## Step 3: Create the web page

Now, set up the user onboarding page that will display the verification flow to Alexander.

1. Create a new directory called `embedded-flow-demo/`.

2. Inside that directory, create a file called `onboarding.html` with the following code:

```html embedded-flow-demo/onboarding.html
<!DOCTYPE html>
<html>
<head>
  <title>Complete Your Profile - Dog Walker</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      text-align: center;
    }
    .container {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 40px;
      background-color: #f9f9f9;
    }
    h1 {
      color: #333;
      margin-bottom: 10px;
    }
    p {
      color: #666;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    button {
      background-color: #0066cc;
      color: white;
      border: none;
      padding: 15px 40px;
      font-size: 16px;
      border-radius: 5px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0052a3;
    }
    .user-info {
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 15px;
      margin-bottom: 30px;
      text-align: left;
    }
    .user-info h3 {
      margin-top: 0;
      color: #333;
    }
    .user-info p {
      margin: 8px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome, Alexander 🐕</h1>
    <p>
      Before you can start walking dogs, we need to verify your identity.
      This helps ensure the safety of pet owners and walkers like you.
    </p>

    <div class="user-info">
      <h3>Your Information</h3>
      <p><strong>Name:</strong> Alexander Sample</p>
      <p><strong>Birthdate:</strong> August 31, 1977</p>
    </div>

    <button id="verify-button">Start Verifying</button>
  </div>
  <div>
    <p>Debug info:</p>
    <p id="debug-info"></p>
  </div>

  <script>
    // Button doesn't work yet - we'll add Persona integration next.
    document.getElementById('verify-button').addEventListener('click', () => {
      alert('Verification flow will go here');
    });
  </script>
</body>
</html>
```

3. Start a local Python server to host this file:

   ```bash
   # cd to the directory
   cd embedded-flow-demo/

   # start a local server
   python -m http.server 8000
   ```

4. Load `localhost:8000/onboarding.html` in a browser to view the page.

You should see the onboarding flow for our newly-registered dog walker:

![dog walker onboarding page](https://assets.withpersona.com/f_auto,q_auto/developer-docs/images/inquiry-tutorials/embedded-flow-with-inquiry-template/dog-walker-onboarding-template.png)

Right now, the "Start Verifying" button doesn't work. You'll wire it up in Step 5.

## Step 4: Add the Persona Web SDK

The web page code does not yet contain the Persona SDK. Let's add it.

1. In the `<head>` section of `onboarding.html`, add the following lines right after the closing `</style>` tag:

```html embedded-flow-demo/onboarding.html
<script src="https://cdn.withpersona.com/dist/persona-vX.Y.Z.js" crossorigin="anonymous"></script>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

2. In the code you added, replace `X.Y.Z.` in the CDN URL with the latest version of the SDK. Check the [SDK changelog](/embedded-flow-changelog) for the latest version.
   * For example, if the latest version is 5.4.0: `https://cdn.withpersona.com/dist/persona-v5.4.0.js`

#### Alternative: npm

You can also install the SDK as an [npm package](https://www.npmjs.com/package/persona).

## Step 5: Make the button open the Persona flow

Right now, if you click "Start Verifying", you see an alert. Make the button trigger a Persona verification flow instead.

1. Locate the following lines in the HTML:

```html embedded-flow-demo/onboarding.html
<script>
// Button doesn't work yet - we'll add Persona integration next.
document.getElementById('verify-button').addEventListener('click', () => {
    alert('Verification flow will go here');
});
</script>
```

2. Replace those lines with the following code:

```html embedded-flow-demo/onboarding.html
<script>
// In this demo, we hardcode Alexander's user information.
// In a real implementation, this information should come from your internal systems.
let userId = 'usr_ABC123';
let userFields = {
    name_first: "Alexander",
    name_last: "Sample",
    birthdate: "1977-08-31",
}

document.getElementById('verify-button').addEventListener('click', () => {
    const client = new Persona.Client({
        templateId: "itmpl_XXXXXXXXXXXXX",
        environmentId: "env_XXXXXXXXXXXXX",
        referenceId: userId,
        fields: userFields,
        onReady: () => client.open(),
        onCancel: ({ inq

---

## [22] https://docs.withpersona.com/
URL: https://docs.withpersona.com/
Characters: 1,499 | Depth: 2

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# Introduction

> Learn how to integrate Persona and choose the right verification flow for your application.

## Welcome to Persona!

Here you’ll find comprehensive information for integrating with Persona and our API endpoints. We’ve tried to make this documentation user-friendly and example-filled.

If you’re planning to use our API in Production, please refer to the [API Reference](/api-introduction) for detailed instructions on how to use the API, and our [Privacy Policy](http://withpersona.com/legal/privacy-policy) to understand how to handle the data.

The most comprehensive way to integrate Persona is to setup an [Embedded Flow](/embedded-flow) for web or integrate with one of our [Mobile SDKs](/mobile-sdks), and the fastest way without any code is to setup a [Hosted Flow](/hosted-flow). See [Choosing an integration method](/choosing-an-integration-method) for details.

## Questions?

We're always happy to help with code or other questions you might have! Search our documentation, visit the [Help Center](https://help.withpersona.com), [connect with our sales team](https://withpersona.com/contact), and meet industry experts and peers in the [Persona community](https://help.withpersona.com/community/).

---

## [23] https://docs.withpersona.com/embedded-flow-client-callbacks
URL: https://docs.withpersona.com/embedded-flow-client-callbacks
Characters: 8,000 | Depth: 2

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# Client Callbacks

> Handle Embedded Flow UI events without relying on callbacks for critical business logic.

#### Do not rely on callbacks for critical business logic

SDK callbacks are intended for coordination between your app's UI and Persona's UI (e.g. opening and closing the flow UI). They do NOT guarantee that data are up-to-date, and cannot be reliably used to guarantee data integrity. Webhooks should be used for logic that depends on Inquiry state.

For more information, see [Accessing Inquiry status and data](/accessing-inquiry-status#webhooks-vs-sdk-callbacks).

## onLoad & onReady

The `onLoad` callback is called when the `iframe` finishes loading and is ready to be displayed. It does not take any arguments.

The `onReady` callback is called when the inquiry flow is ready for user interaction. It does not take any arguments.

## onCancel

The `onCancel` callback is called when an individual cancels the inquiry flow before completion. It receives a single object argument with the following properties:

**`inquiryId`** `string`

The ID of the inquiry used in this instance of the flow. Will be `undefined` if the flow is canceled before an inquiry is created.

---

**`sessionToken`** `string`

A token that can be used to resume the inquiry. Will be `undefined` if the flow is canceled before an inquiry is created.

---

## onComplete

The `onComplete` callback is called when the inquiry has completed the inquiry flow and the individual clicks on the complete button to close the flow.

The purpose of this callback is to signal when the user has completed the Persona flow and should be sent back to your application. `onComplete` is **not guaranteed to be called**; it is possible that the user never presses the complete button.

`onComplete` receives the current status of the inquiry as an argument. These values are passed for convenience, and are **not guaranteed to be up to date**. For instance, a [Workflow](/api-reference/workflows) may have been executed between when the inquiry was completed and when the user pressed the complete button, resulting in a status change. If you need the most up to date state of the inquiry, please use [Webhooks](/webhooks).

It receives a single object argument with the following properties:

**`inquiryId`** `string`

The ID of the inquiry used in this instance of the flow.

---

**`status`** `string`

The status of the completed inquiry (e.g. `'completed'`, `'failed'`).

---

**`fields`** `object`

A map of field values. See [Fields](/embedded-flow-fields) documentation.

---

## onError

The `onError` callback is called in response to errors in the inquiry flow that prevent the inquiry flow from being usable. These generally occur on initial load.

`onError` is not fired for network errors (e.g. dropped requests from bad connections, blocked requests due to application security settings, etc.)

It receives a single object argument with the following properties:

**`status`** `number`

The HTTP error status, if applicable. The value will be `0` if the error was an application error.

---

**`code`** `string`

A short string describing the error. See the error codes below.

---

### Error codes

| Error code            | Status   | Meaning                                                                                                                                                                                                                                                                                                                                                                  |
| --------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `'application_error'` | `0`      | An internal error occurred in the Persona web application. Please contact support.                                                                                                                                                                                                                                                                                       |
| `'camera_error'`      | `1`      | A black camera screen was detected during a capture step. **This error is noisy** — it can fire frequently due to transient rendering, permissions, hardware conditions, or dark lighting conditions, and does not always indicate a true failure. Treat it as a signal for monitoring rather than a hard error, and avoid using it to drive critical logic or alerting. |
| `'invalid_config'`    | `400`    | The `persona` client was initialized with invalid arguments.                                                                                                                                                                                                                                                                                                             |
| `'unauthenticated'`   | `409`    | An inquiry was resumed without a valid `sessionToken`. Retrieve one from the external API and pass it to the client.                                                                                                                                                                                                                                                     |
| `'inactive_template'` | `422`    | An attempt was made to create an inquiry from an inactive template. Activate the template before attempting to create inquiries.                                                                                                                                                                                                                                         |
| `'unknown'`           | `number` | Catch-all error.                                                                                                                                                                                                                                                                                                                                                         |

## onEvent

The `onEvent` callback is called at certain points in the Persona flow. It takes two arguments: an `eventName` string and a `metadata` object.

`onEvent` is sometimes passed the current state of the inquiry for convenience purposes. These values are not guaranteed to be the latest values on the inquiry, and thus should not be used for critical logic. If your business logic depends on granular verification and inquiry status changes, we recommend using [Webhooks](/webhooks).

By default, only legacy events are forwarded to `onEvent`. To receive newer events like `step-transitioning`, `click`, and `form-update`, you must opt in using the [`eventsAllowlist`](/embedded-flow-parameters#other-parameters) parameter (available in SDK `5.8.0`+):

* `eventsAllowlist: 'all'` — receive all events.
* `eventsAllowlist: [Event.Click, Event.StepTransitioning, ...]` — receive only the specified events.

### Event reference

#### `start`

Triggered when an Inquiry object has been created in the client. Dynamic Flow Templates will send this event at the same time as `'ready'`, and it will not indicate user interaction. Legacy 2.0 Templates will send this event only when the user clicks 'Continue' on the start screen.

**`metadata.inquiryId`** `string`

The ID of the inquiry.

---

#### `document-camera-select`

The ind

---

## [24] https://docs.withpersona.com/embedded-flow-client-methods
URL: https://docs.withpersona.com/embedded-flow-client-methods
Characters: 2,609 | Depth: 2

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# Client Methods

> Control an Embedded Flow client with methods for opening, canceling, destroying, and preloading.

| Method                     | Description                                                                                                                                                                                                                                                                                                                       | Availability |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `open()`                   | Use `client.open()` to show the embedded flow.                                                                                                                                                                                                                                                                                    |              |
| `cancel(force: boolean)`   | Use `client.cancel(false)` to transition to the cancel confirmation screen. Use `client.cancel(true)` to instantly hide the embedded flow without displaying the cancel confirmation screen.                                                                                                                                      |              |
| `destroy()`                | Use `client.destroy()` to clean up all Persona DOM elements from the page once you are finished using the flow. If your integration creates more than one instance of the Persona client, this method should be called when finished using each client to avoid memory leaks.                                                     |              |
| `preload()` (class method) | `Persona.Client.preload()` will prepopulate the browser cache with the static JavaScript assets needed for the embedded flow, speeding up subsequent calls to `client.open()`. Note that this is a class method and not an instance method. Call this on `Persona.Client`, not on the object created from `new Persona.Client()`. | `5.0.0`      |

---

## [25] https://docs.withpersona.com/embedded-flow-security
URL: https://docs.withpersona.com/embedded-flow-security
Characters: 5,265 | Depth: 2

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# Security

> Restrict where Embedded Flow can run with domain allowlists and referrer policies.

## Embedding the Persona iframe

The [Embedded Flow](/embedded-flow) boots an iframe that loads Persona. If you'd like to restrict the allowed domains or URI schemes that are allowed to boot the Embedded Flow, you can configure a domain allowlist per template, or globally in the [Domain Manager](https://app.withpersona.com/dashboard/manage-domain) page within the Persona Dashboard.

The Persona iframe has several limitations around when embedding is allowed.

1. Only inquiry templates with published versions can be embedded. Draft inquiry template versions cannot be embedded.
2. Embedding in `localhost` is only allowed for Sandbox environments.
3. If a domain allowlist is configured, the iframe can only be embedded on pages on these domains. Note that subdomains need to be configured separately.

## iframe permissions

The Persona flow requires access to the end user's camera for Government ID and Selfie collection. If your integration uses these features, you will need to ensure that the Persona iframe has permissions to request camera access.

There are three types of permissions restrictions: the `Permissions-Policy` HTTP header, the iframe `allow` attribute, and the iframe `sandbox` attribute.

`Permissions-Policy` controls permissions for all elements on the page which loads the Persona iframe, while the iframe `sandbox` attribute controls permissions specifically for the Persona iframe.

### `Permissions-Policy` header

The `Permissions-Policy` HTTP header controls [Permissions Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Permissions_Policy) for the entire document. This header is specified by your server, and is not controlled by Persona.

If you use this header, you must ensure that the `camera` directive allows Persona's domain. The required configuration may vary based on your exact integration (for example, if you use a custom domain / subdomain).

```
Permissions-Policy: camera=("https://*.withpersona.com")
```

Wildcard domains in `Permissions-Policy` may not work on all browsers. If you are using the Embedded Flow in a WebView or mobile environment, you should avoid using the wildcard and use the specific subdomain instead, such as `https://inquiry.withpersona.com` or `https://your-custom-domain.withpersona.com`.

For more information, see the [MDN `Permissions-Policy` documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy).

### iframe `allow` attribute

The `allow` attribute controls [Permissions Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Permissions_Policy) on a per-iframe level.

The iframe created by the Embedded flow specifies `camera;microphone`. This is not configurable.

For more information, see the [MDN iframe documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#allow).

### iframe `sandbox` attribute

The `sandbox` attribute controls what browser behavior is controllable from within the iframe.

The iframe created by the Embedded Flow specifies several `sandbox` attributes. No configuration is needed on your part, as these attributes are automatically set by the Persona JavaScript SDK; however, attributes can be overridden with the `sandboxAttributes` [parameter](/embedded-flow-parameters). Note that changing these attributes may affect the functionality of the Inquiry Flow.

Required attributes (cannot be removed):

* `allow-same-origin`: needed to run the Inquiry Flow at all, which is a React single-page app.
* `allow-scripts`: allows the iframed content to retain its origin (withpersona.com), allowing communication with the Persona Inquiry Flow, usage of LocalStorage and cookies, etc.
* `allow-popups`: allows opening new windows via links. Needed to allow access to Terms of Services and other consent policies.

Default attributes (can be removed):

* `allow-forms`: needed for form submission. Only needed for flows including form inputs.
* `allow-modals`: needed for the `beforeunload` event, which is used for error reporting.
* `allow-top-navigation-by-user-activation`: allows redirect on completion of the flow. Only needed for flows that want to do a top-level redirect of the parent page upon completion.

Other attributes (not provided by default):

* `allow-popups-to-escape-sandbox`: allows opening PDFs in new windows via links. Needed if you are linking to an external PDF in your flow. **Note that this attribute should be used with caution, as it allows popup content to avoid iframe sandbox restrictions. Ensure that popups only ever route to content you control.**
* `geolocation`: allows collection of GPS location. Only needed for flows enabling this feature.

For more information, see the [MDN iframe documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#sandbox) and the [WHATWG HTML standard](https://html.spec.whatwg.org/multipage/iframe-embed-object.html).

---

## [26] https://docs.withpersona.com/api-quickstart-tutorial
URL: https://docs.withpersona.com/api-quickstart-tutorial
Characters: 8,000 | Depth: 2

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# Quickstart Tutorial

The Persona API provides a flexible, secure, and scalable way to integrate identity verification, compliance, and fraud prevention into your application. Whether you’re a developer looking to quickly test the API or planning a full-scale production integration, this guide will help you get started efficiently.

This Getting Started section will guide you through:

1. Understanding the Persona API and when to use it.
2. Setting up your account and obtaining API credentials.
3. Making your first API call to see it in action.
4. Exploring common use cases and examples.

## Before you begin

Before you can start making API calls, you’ll need a Persona account. Your account will allow you to create and manage identity verification inquiries, verifications, reports, and other API resources.

If you already have a Persona account, begin **Step 2** below.

If you do not have a Persona account:

1. Go to [Persona Sign-up](https://withpersona.com/signup)
2. Register with your business email and create your organization.

---

## Step 1: Log in to the Persona Dashboard

1. After verification, log in to the [Persona Dashboard](https://app.withpersona.com/dashboard/login).

   ![dashboard-login](https://assets.withpersona.com/f_auto,q_auto/developer-docs/images/api-quickstart/dashboard-login.png)

2. Complete the onboarding flow, which will guide you through:

3. Setting up your organization details

4. Learning about Persona’s verification process

Once logged in, you’ll have access to API Keys, Inquiry Templates, and Webhooks, which are essential for integrating the Persona API.

---

## Step 2: Choose your environment

Persona has two types of environments:

1. **Sandbox** - For testing and development (recommended for new users).
2. **Production** - Live environment with real user data.

![env-chooser](https://assets.withpersona.com/f_auto,q_auto/developer-docs/images/api-quickstart/env-chooser.png)

To learn more about the Persona Environments you can read more [here](https://help.withpersona.com/articles/6I2kGhfPvSuUjYq4z6tpmB).

#### Note about the Production environment:

Access to the Production environment requires approval. Ensure your organization is verified before proceeding. You must select a plan on the billing page to gain production access.

---

## Step 3: Get your API Key

#### Keep your API Keys secure

Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.

To access the Persona API, you'll need an API key. Each environment has its own API key; select the API key for the specific environment you would like to use. Go to **Persona Dashboard → API → API Keys**

![api-key-nav](https://assets.withpersona.com/f_auto,q_auto/developer-docs/images/api-quickstart/api-key-nav.png)

You will see all your API keys on the API key page. You can also click "**Create API key**" if you need a new one. Here you can click the "**Copy**" button to copy your API key.

![api-keys-dashboard](https://assets.withpersona.com/f_auto,q_auto/developer-docs/images/api-quickstart/api-keys-dashboard.png)

#### Do you need to set Permissions on the API key?

Before moving on it is important to know that API permissions are not limited until you limit them. To learn more about configuring your API key see [API Key](/api-keys)

---

## Step 4: Make your first API request

At this stage, you're ready to make your first API request. You may choose to make a request relevant to your solution or integration with Persona. The API Reference provides a detailed selection of the various requests you may choose to make.

Since most businesses integrate with Persona using the **Inquiries** product, this Quickstart Tutorial will guide you through the **Create an Inquiry** endpoint as an initial example.

#### What is an Inquiry?

An **Inquiry** represents a single instance of an individual verifying their identity. As an individual completes verification, the inquiry moves through various statuses: `Created`, `Pending`, `Completed`, `Approved/Declined`, `Expired`, or `Failed`.

Learn more about how to [Configure your Inquiry Template](https://help.withpersona.com/articles/ETA0GIS8K60DSoiFRpA9z/).

### Create an Inquiry using the API reference provided

Persona’s API documentation provides an **interactive request tool** that allows you to create an Inquiry without manually writing code. As you configure the request through the UI, the tooling automatically generates code snippets in multiple programming languages, making it easy to integrate the API into your application.

A recommended best practice is to first make sample calls through the API Reference to better understand the shape of responses and debug obvious issues. From there, you can proceed to copying the automatically generated calls into your desired language for building programatic requests from your product or service to Persona.

#### 1. Open the Create Inquiry page

1. Go to the [Create an Inquiry API reference and click "Try it"](/api-reference/inquiries/create-an-inquiry?explorer=true).

#### 2. Enter your API Key

1. You will see a red box for you to enter your bearer token.

   ![fern-create-inquiry](https://assets.withpersona.com/f_auto,q_auto/developer-docs/images/api-quickstart/fern-create-inquiry.png)

2. Under "token" paste your API key (generated in Step 3 of this guide) into this box. API keys have distinct prefixes: production keys start with `persona_production` and sandbox keys start with `persona_sandbox`.

   1. API keys have distinct prefixes: production keys start with `persona_production` and sandbox keys start with `persona_sandbox`.

      ![fern-api-key-not-authenticated](https://assets.withpersona.com/f_auto,q_auto/developer-docs/images/api-quickstart/fern-api-key-not-authenticated.png)

   2. Once you enter your API key, the red box should turn green and show that you are authenticated!

      ![fern-api-key-authenticated](https://assets.withpersona.com/f_auto,q_auto/developer-docs/images/api-quickstart/fern-api-key-authenticated.png)

#### 3. Add Inquiry BODY PARAMS

1. On “Create an Inquiry” page, scroll down to the section “BODY PARAMS.”

2. The **data** object is **required** and has specific attributes that are **required** to make the "Create Inquiry" API call.

   ![fern-inquiry-body-params](https://assets.withpersona.com/f_auto,q_auto/developer-docs/images/api-quickstart/fern-inquiry-body-params.png)![fern-body-params-example](https://assets.withpersona.com/f_auto,q_auto/developer-docs/images/api-quickstart/fern-body-params-example.png)

3. These fields compose the JSON request body. You'll find a **JSON input box** containing default Inquiry details in the request body section

4. Modify the `inquiry-template-id`

   1. From the Persona Dashboard → Inquiries → Templates and then copy the `ID` for the template you want to create. Your Inquiry Template ID should start with `itmpl_`.

      ![fern-inquiry-template-id](https://assets.withpersona.com/f_auto,q_auto/developer-docs/images/api-quickstart/fern-inquiry-template-id.png)

   2. You can leave it as is for a basic Inquiry creation.

Example request body:

```json json
curl --request POST \
     --url https://api.withpersona.com/api/v1/inquiries \
     --header 'Persona-Version: 2023-01-05' \
     --header 'accept: application/json' \
     --header 'authorization: Bearer persona_sandbox_YOURAPIKEY' \
     --header 'content-type: application/json' \
     --data '
{
  "data": {
    "attributes": {
      "inquiry-template-id": "itmpl_YOURTEMPLATEID",
      "fields": {
        "name-first": "Jane",
        "name-last": "Doe",

---

## [27] https://docs.withpersona.com/relay-android-sdk
URL: https://docs.withpersona.com/relay-android-sdk
Characters: 2,449 | Depth: 3

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# Android SDK

> Start Relay from the Persona Android SDK.

Use the Persona Android SDK to run the user-facing Relay verification in a native Android app.

![The Android SDK uses the Relay session access token to run the user-facing verification.](https://assets.withpersona.com/f_auto,q_auto/developer-docs/images/relay-integration-overview-phase2.png)

## Prerequisites

This integration requires Persona Android SDK 2.47.0 or later. Follow the [Android integration guide](/android-sdk-v2-integration-guide) to install the SDK and configure platform permissions.

## How the Android flow works

1. Your server creates a Relay session.
2. Your server stores the Relay token and Relay secret for claim retrieval.
3. Your server returns the Relay session access token to the Android app.
4. The app initializes the Persona Android SDK in Relay mode with that token.
5. The SDK presents the Relay-specific Inquiry experience, including the applicable Relay consent UI.
6. When the user-facing experience ends, the app asks your server to retrieve the claim result.

Store the Relay secret securely on your server. Never expose it to the client.

## Start Relay

Follow the [Android integration guide](/android-sdk-v2-integration-guide#usage) to install the SDK, register the Activity Result contract, and handle Inquiry results.

To start Relay, create the Inquiry with `Inquiry.fromRelaySessionToken(...)` instead of a template or Inquiry ID:

```kotlin
val inquiry = Inquiry.fromRelaySessionToken(relaySessionAccessToken)
  .build()

getInquiryResult.launch(inquiry)
```

The Activity Result reports how the Inquiry experience ended. It does not return the Relay claim payload or PII to the app.

## Relay mode behavior

Relay token initialization is a dedicated entry point. Do not combine it with template IDs, template versions, Inquiry IDs, one-time links, share tokens, or field mappings.

In Relay mode, the SDK omits information that identifies the host app, such as the Android package name. Relay mode also skips Play Integrity app attestation.

Use the Activity Result to coordinate your app's UI. Retrieve the claim result through your server-side Relay integration.

---

## [28] https://docs.withpersona.com/accessing-inquiry-status
URL: https://docs.withpersona.com/accessing-inquiry-status
Characters: 3,708 | Depth: 3

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# Accessing Inquiry status and data

> Use webhooks and the API to retrieve current Inquiry status and data.

## Using webhooks to fetch the inquiry status

Persona recommends setting up Webhooks to listen for any relevant inquiry statuses. Webhooks are sent immediately upon the event firing and eliminate the need to continuously poll an inquiry for updates.

See our [Webhooks](/webhooks) documentation for setup instructions.

### Webhooks vs Polling

Although we recommend implementing a webhook listener if possible, it may be sufficient to poll the API directly for the inquiry decision if you are:

* Blocking the user from the next step in your flow based on the inquiry decision
* Unable to support infrastructure to handle webhooks (e.g. do not have a server actively listening for webhooks)
* Unlikely to hit any API rate limits
* Not marking many inquiries for manual review (where you might be polling for a long time before the inquiry is decisioned)

### Webhooks vs SDK Callbacks

Avoid relying on SDK callbacks to fetch inquiry data. Persona’s SDK client callbacks are intended to allow taking action on start, iframe load, complete, and additional client-only events; for example, they can be used to open the widget once the Inquiry has loaded. The callbacks do not guarantee that the included Inquiry data is the most up-to-date representation of the Inquiry. You should leverage callbacks to coordinate your UI and the Persona widget, and *should not* use them to keep data in sync between Persona and your server. Webhooks are the only reliable way to track inquiry status (and all other inquiry data).

Client callbacks cannot be used reliably to fetch inquiry status if you are utilizing any post-inquiry features (workflows or manual review). As they are meant only to tell you that the inquiry itself has finished, the status retrieved may be non-deterministic if there is any post-inquiry processing done.

**Note:** If your only option is to use the client callback for status and you are not implementing any post-inquiry logic, you can disregard the next section on utilizing inquiry decisioning statuses.

## Ensure you’re actioning on the correct inquiry statuses

Inquiries will reach a `completed` or `failed` status depending on the status of the required verification checks. If your implementation includes any *post-inquiry* processing (e.g report runs, manual review, or other business logic), you'll want to utilize the inquiry's *decisioning* statuses to determine how to proceed. These statuses are: `approved`, `declined`, and `needs-review`.

See the [Inquiry Model Lifecycle](/model-lifecycle) for more details.

### Future-proofing your implementation

We recommend [setting up a basic workflow](https://help.withpersona.com/articles/20Zvcq50493eMUdt7aDhRY) triggered on the `inquiry.completed` event to approve the inquiry. After this is done, you can disregard the `completed` status and only use the `approved` status to signify that you can proceed with the user on your platform.

Similarly, you can set up another workflow triggered on `inquiry.failed` to automatically decline the inquiry so you can disregard the `failed` status.

Making both of these changes upfront means that any decisions to add post-inquiry processing in the future will not require additional developer resources, because the integration will already be utilizing the correct statuses to know how to proceed.

---

## [29] https://docs.withpersona.com/relay
URL: https://docs.withpersona.com/relay
Characters: 2,518 | Depth: 3

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# Relay Overview

> Privacy-preserving verification that returns only a claim result — not identity data.

## What is Relay?

Relay is Persona's privacy-preserving verification product. Instead of collecting and returning identity data, Relay confirms a specific claim — *is this person over 18? is this a real human?* — and returns only the result. Relay lets you get the answer you need to enforce your policies without having to directly handle PII.

Once a claim result is produced, Persona deletes the underlying verification data.

## How it works

Built on [Privacy Pass](https://datatracker.ietf.org/wg/privacypass/about/) (an open IETF standard), Relay cryptographically separates the verification step from the result redemption step — **so no single party ever sees both who a user is and what they're doing.**

When an end user hits a gated experience, Relay evaluates the configured requirement and runs a verification flow. Once complete, you receive a pass/fail claim result, without the underlying identity data.

## What each party knows

| Party                      | Knows                                                    | Does not know                                                          |
| -------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------- |
| **You (Persona customer)** | The claim result                                         | The end user's name, birthdate, documents, or any identity data        |
| **Persona**                | The end user's identity data needed to derive the result | Which platform requested the verification or received the claim result |

## What makes Relay privacy-preserving?

1. **Minimal disclosure** — only the data needed to answer the claim question is shared and verified
2. **Claim results only** — you receive a single eligibility result, nothing more
3. **Data deletion** — Persona deletes verification data once the claim result is produced
4. **Double-blind architecture** — cryptographically separates you and Persona, so that neither party can correlate the end user's website activity with their identity data — not just a policy promise

## Try the live demo

---

## [30] https://docs.withpersona.com/android-sdk-v2-licenses
URL: https://docs.withpersona.com/android-sdk-v2-licenses
Characters: 8,000 | Depth: 3

> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://docs.withpersona.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://docs.withpersona.com/_mcp/server.

# Android Licenses

> Review open source licenses for dependencies used by the Persona Android SDK.

## LGPL License

Persona uses the [JMRTD library](https://jmrtd.org/index.shtml) under the [LGPL license](https://jmrtd.org/license.shtml) to perform Passport NFC on Android. This feature is an optional add-on module and this license only applies to Passport NFC users.

## Licenses

Below is a table specifying all libraries and their licenses used by the Persona Android SDK.

| Name                                                                      | License                                                                                                                                                             | Source                                                                                                                                   |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| androidx.activity:activity:1.10.1                                         | [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)                                                                                                   | [https://cs.android.com/androidx/platform/frameworks/support](https://cs.android.com/androidx/platform/frameworks/support)               |
| androidx.activity:activity-ktx:1.10.1                                     | [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)                                                                                                   | [https://cs.android.com/androidx/platform/frameworks/support](https://cs.android.com/androidx/platform/frameworks/support)               |
| androidx.annotation:annotation:1.9.1                                      | [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)                                                                                                   | [https://cs.android.com/androidx/platform/frameworks/support](https://cs.android.com/androidx/platform/frameworks/support)               |
| androidx.annotation:annotation-experimental:1.4.1                         | [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)                                                                                                   | [https://cs.android.com/androidx/platform/frameworks/support](https://cs.android.com/androidx/platform/frameworks/support)               |
| androidx.annotation:annotation-jvm:1.9.1                                  | [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)                                                                                                   | [https://cs.android.com/androidx/platform/frameworks/support](https://cs.android.com/androidx/platform/frameworks/support)               |
| androidx.appcompat:appcompat:1.7.0                                        | [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)                                                                                                   | [https://cs.android.com/androidx/platform/frameworks/support](https://cs.android.com/androidx/platform/frameworks/support)               |
| androidx.appcompat:appcompat-resources:1.7.0                              | [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)                                                                                                   | [https://cs.android.com/androidx/platform/frameworks/support](https://cs.android.com/androidx/platform/frameworks/support)               |
| androidx.arch.core:core-common:2.2.0                                      | [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)                                                                                                   | [https://cs.android.com/androidx/platform/frameworks/support](https://cs.android.com/androidx/platform/frameworks/support)               |
| androidx.arch.core:core-runtime:2.2.0                                     | [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)                                                                                                   | [https://cs.android.com/androidx/platform/frameworks/support](https://cs.android.com/androidx/platform/frameworks/support)               |
| androidx.autofill:autofill:1.1.0                                          | [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)                                                                                                   | [https://cs.android.com/androidx/platform/frameworks/support](https://cs.android.com/androidx/platform/frameworks/support)               |
| androidx.biometric:biometric:1.1.0                                        | [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)                                                                                                   | [https://cs.android.com/androidx/platform/frameworks/support](https://cs.android.com/androidx/platform/frameworks/support)               |
| androidx.browser:browser:1.9.0                                            | [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)                                                                                                   | [https://cs.android.com/androidx/platform/frameworks/support](https://cs.android.com/androidx/platform/frameworks/support)               |
| androidx.camera:camera-camera2:1.4.2                                      | [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)                                                                                                   | [https://cs.android.com/androidx/platform/frameworks/support](https://cs.android.com/androidx/platform/frameworks/support)               |
| androidx.camera:camera-core:1.4.2                                         | [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0), [BSD License](https://chromium.googlesource.com/libyuv/libyuv/+/refs/heads/main/README.chromium) | [https://cs.android.com/androidx/platform/frameworks/support](https://cs.android.com/androidx/platform/frameworks/support)               |
| androidx.camera:camera-lifecycle:1.4.2                                    | [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)                                                                                                   | [https://cs.android.com/androidx/platform/frameworks/support](https://cs.android.com/androidx/platform/frameworks/support)               |
| androidx.camera:camera-video:1.4.2                                        | [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)                                                                                                   | [https://cs.android.com/androidx/platform/frameworks/support](https://cs.android.com/androidx/platform/frameworks/support)               |
| androidx.camera:camera-view:1.4.2                                         | [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)                                                                                                   | [https://cs.android.com/androidx/platform/frameworks/support](https://cs.android.com/androidx/platform/framewo

