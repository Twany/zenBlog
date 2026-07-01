---
title: "From Proxy Routing to Traffic Auditing: Making Two Clash Subscriptions Maintainable"
description: "A natural engineering flow for turning a two-subscription Clash routing need into stable egress roles, reusable rules, historical traffic auditing, and a background collector."
pubDate: 2026-06-21
category: "AI Workflow"
tags:
  - "Codex"
  - "AI Workflow"
  - "Automation"
  - "Networking"
  - "Observability"
  - "Clash"
  - "LaunchAgent"
readTime: "10 min"
lang: en
translationKey: "local-proxy-traffic-dashboard-collector-workflow"
draft: false
---
When you have two local proxy subscriptions, the hard part is usually not “send a few domains through another route.” The harder questions come immediately after: will the routing survive subscription refreshes, will complex services leak through the wrong egress path, will old browser connections keep showing stale behavior, and can you still explain route usage a few days later?

That is why this should not be written as a list of configuration changes. The more useful story is how a small routing need naturally becomes a local network governance workflow: stabilize egress roles, make the structure recoverable, then use observation to prove that it keeps working over time.

## The Real Problem Behind a Small Routing Request

The surface request is simple: primary subscription A should handle most traffic, while auxiliary subscription B should handle a small group of selected domains. Typical examples include ChatGPT/OpenAI/Codex, selected Apple endpoints, Figma, and Atlassian services that benefit from a more consistent egress path.

But three practical problems sit under that request.

First, egress consistency matters. Some services are affected not only by reachability, but also by login state, risk checks, WebSocket behavior, static assets, API calls, telemetry, and challenge flows. If one part of a product uses A while another part uses B, the result may be a page that loads while streaming fails, login behaves oddly, or an API endpoint appears unreliable.

Second, subscriptions change. Nodes are not static assets. A refresh can rename, remove, or replace them. Copying nodes or manually selecting routes may work today, but it is not a maintainable structure.

Third, a live connection view is not history. Clash Verge can show where a connection is going right now. It does not naturally answer whether a domain leaked during the last day, which processes consumed most of route B, or how large 30 days of samples will become.

Those three concerns define the real scope of the system.

## Turn Routes Into Roles First

A two-subscription setup should start with roles, not rules. A and B are not just two pools of nodes. They should represent different responsibilities.

| Role | Responsibility | Design purpose |
| --- | --- | --- |
| Primary subscription A | Daily browsing, downloads, ordinary APIs, original subscription rules | Preserve the default network behavior |
| Auxiliary subscription B | Selected sensitive services and their dependency domains | Keep those services on a consistent egress path |
| Unclassified traffic | Fall back to A's original rules | Avoid sending unknown traffic into B |

This role boundary affects the whole implementation. Without it, the setup tends to drift into one of two bad shapes: either everything is globally switched to B, or the user manually clicks routes in the UI and has to rediscover the setup after every refresh.

A maintainable shape looks like this:

```text
Primary subscription A
  ├─ Keep its original proxy-groups and rules
  ├─ Reference auxiliary subscription B's local profile/provider
  ├─ Create a route group that only uses B nodes
  └─ Prepend target domain rules before A's original rules
```

The key word is reference, not copy. A should not hold a static duplicate of B's nodes. It should reference B's downloaded local profile or provider. When B refreshes, B still owns its node lifecycle. A only maintains the routing decision: which domains should be sent toward B.

## Make Rules Survive Refreshes, Not Just Today's Test

Many proxy setups become messy because the first fix optimizes only for “it works right now.” But subscriptions are dynamic, browser connections are long-lived, and rule order matters. If those realities are ignored, the setup becomes hard to explain after the next refresh or reconnect.

A useful before/after is:

| Temporary fix | Maintainable fix |
| --- | --- |
| Copy B nodes into A | Reference B through a local profile/provider |
| Append a few domain rules at the end | Prepend target rules before A's original rules |
| Rebuild the setup from memory after refreshes | Regenerate it with a script or Skill |
| Assume stale connections prove the rule failed | Reload and close old connections so new ones rematch rules |
| Only works for the current A/B pair | Treat primary and auxiliary as replaceable roles, so C/D works too |

This is why the routing workflow belongs in a Codex Skill. The user should only need to confirm two roles: which subscription is primary A and which one is auxiliary B. The script can then locate profiles, inject the provider, create the route group, prepend rules, reload the runtime, close stale connections, and verify target domains.

The second time you ask “how do I restore this later?”, the task has stopped being a configuration task. It has become an automation task.

## Missing Domains Push You Toward Service Dependency Groups

The easiest mistake in proxy routing is assuming a complex product equals one domain.

Routing `chatgpt.com` through B does not mean `chat.openai.com` also goes through B. A product may use separate domains for the page, WebSockets, static assets, login, telemetry, error reporting, payments, and challenge flows. For OpenAI/Codex, splitting those dependencies across different egress paths can create more subtle failures than a simple connection error.

OpenAI's [network recommendations](https://help.openai.com/en/articles/9247338-network-recommendations-for-chatgpt-errors-on-web-and-apps) make this visible: the guidance lists a group of OpenAI/ChatGPT-related domains and separately calls out WebSocket requirements for ChatGPT and Codex. That is the right mental model for routing too. Treat the service as a dependency group, not a homepage domain.

A stable loop looks like this:

1. Start with primary domains and domains from official guidance.
2. Inspect current and historical connections for related domains still using A.
3. Add those misses into the same B dependency group.
4. Reload, close stale connections, and watch newly created connections.
5. Put the discovery loop into the script or Skill instead of treating it as a one-off patch.

The same pattern applies to Figma, Atlassian, Apple, and other multi-domain products. You do not need to guess every dependency up front, but you do need a way to keep discovering misses.

## A Dashboard Matters Only When the Question Becomes Historical

At this point, routing can work. The remaining weakness is visibility. Clash Verge's connection page can answer the present. It is less useful for questions like:

- Did a domain occasionally leak to A during the last few hours?
- How much traffic did B use today?
- Which processes are using B: browser, editor, system process, or background service?
- Which rules are being hit most often?
- Did the new OpenAI/Codex dependency rules stay stable over time?
- How large will the sample files become over 30 days?

That is when a dashboard becomes useful. It is not decoration. It turns live connections into historical evidence. Instead of “it seems to be correct now,” you can see whether it has stayed correct over a period of time.

The dashboard should also follow the debugging path. The useful flow is not a giant raw connection table. It is route first, then process, then domain and rule.

| Dashboard view | Question answered |
| --- | --- |
| Route summary | How much upload/download did A and B use? |
| Route -> process drilldown | Which processes consumed a route? |
| Domain summary | Which destinations used the most traffic? |
| Rule summary | Which rules matched most often? |
| Time filter | When did the behavior happen? |

This is more useful than a stronger live connection list because each click reduces the search space.

## A Complete Walkthrough

Putting the pieces together, the workflow is straightforward.

The raw need is: OpenAI/Codex-related traffic should use B, while everything else keeps using A. The first move is not selecting a node. It is declaring B as the stable egress path for that service group. The second move is prepending an OpenAI/Codex dependency group before A's original rules. The third move is reloading the profile and closing old connections, so newly created browser and app connections rematch the rules.

Then comes verification. First inspect current connections: are the target domains now using B? Then inspect historical samples: did related domains still appear on A during the observed window? If `chat.openai.com`, a static asset host, or a WebSocket destination remains on A, the configuration did not fail in a mysterious way. The dependency group is incomplete. Add the miss, reload, close stale connections, and observe again.

Finally, make the flow repeatable. Store the A/B routing logic in a Skill so future C/D subscriptions only require role confirmation. Keep the collector running in the background so the web dashboard is not responsible for sampling. Add retention so the tool does not become a disk problem.

That is the full loop from one routing request to long-running traffic auditing.

## The Collector Must Be Independent From the Web UI

A dashboard that claims to show history cannot depend on the web page being open. The web UI is only the window. The collector is the source of truth.

A healthier architecture splits the system:

```text
Mihomo / Clash Core
        |
        | /connections API
        v
collector  --->  data/traffic-YYYY-MM-DD.jsonl
        |
        v
.run/collector-status.json

web dashboard  --->  reads JSONL + collector status
```

The collector polls Mihomo `/connections`, calculates upload and download deltas, and writes daily JSONL files. The dashboard reads those files and aggregates by route, process, domain, rule, and time window.

The benefit is simple: stopping the web UI does not stop sampling. You can close the browser, leave the dashboard off, and still accumulate history. When you need to investigate, start the web UI again and read the data that has been collected.

On macOS, long-running background work belongs under LaunchAgent rather than a terminal window. Apple's [Launch Daemons and Agents documentation](https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPSystemStartup/Chapters/CreatingLaunchdJobs.html) describes how `launchd` manages background jobs, per-user agents, `ProgramArguments`, and `KeepAlive`. In practice, a thin shell interface with `start`, `stop`, `status`, and `logs` keeps the tool manageable without memorizing Node commands or process IDs.

One implementation detail is worth keeping: in pure collector mode, the Node sampling timer must not be `unref()`ed. If the timer is unrefed and no HTTP server is keeping the event loop alive, Node can exit cleanly because it sees no required work. A background collector needs an explicit lifecycle anchor.

## Verify the Route and Respect the Dashboard's Boundary

When the dashboard says B has traffic, you may still need to prove that the traffic reached the expected server.

The best check uses both ends. Locally, inspect the auxiliary node's server and port, then confirm the local Clash/Mihomo process has established TCP connections to that address. On the server, use `ss -tnp` to confirm established connections from the client side and that the server-side process is the proxy service.

If both sides show the connection, the route is real. A cloud provider's control panel can still show empty usage because of reporting delay, tiny traffic rounded down, GB-level display granularity, a different accounting scope, or differences between billing metrics and Mihomo's application-level counters.

That defines the dashboard's boundary. It is good for answering which processes, domains, and rules used which routes, and how much application-level traffic Mihomo observed. It is not a cloud billing system.

## Retention Is Part of the Tool, Not an Add-On

Once the collector is long-running, data retention becomes part of the design.

A stable approach is to write daily files such as `traffic-YYYY-MM-DD.jsonl` and keep a default retention window, such as 30 days. Cleanup can run once when the collector starts and then periodically, for example every hour. Shorter windows such as 7 or 14 days can be used when disk space matters more than long history.

Do not estimate storage by guessing. Measure how much the sample file grows over an hour or two, convert that into a daily rate, and multiply by the retention window. The number will not be perfect, but it is good enough to choose 7, 14, or 30 days intentionally.

This may not sound like a routing feature, but it determines whether the tool can stay installed. Without retention, every collector eventually becomes a disk problem.

## Reuse Checklist

For a similar two-subscription routing and traffic dashboard setup, use this order:

1. Define egress roles first: default route and stable route.
2. Reference dynamic subscriptions through profiles/providers; do not copy nodes.
3. Prepend target rules before the primary subscription's original rules.
4. Manage complex services as dependency groups, not homepage domains.
5. Reload and close stale connections so new connections rematch rules.
6. Put repeatable recovery into a script or Skill that asks only for A/B roles.
7. Use the live connection page for the present and historical sampling for stability.
8. Design dashboard drilldown as route -> process -> domain -> rule.
9. Keep the collector separate from the web UI.
10. Supervise background sampling with LaunchAgent on macOS or systemd on Linux.
11. Verify routes from both the local machine and the server side.
12. Set retention and estimate disk usage from real samples.

## Closing

The natural flow of this work is not “first routing, then dashboard.” It is one question exposing the next.

You want a few domains to use B, so you define egress roles. Subscriptions refresh, so the structure must be recoverable. Homepage domains are not enough, so you manage service dependency groups. The live connection page only shows the present, so you collect history. The web page should not own sampling, so you split out a background collector. Logs grow, so you add retention.

The durable lesson is not a handful of rules. It is a transferable method: stabilize the structure, automate the repeatable work, observe the result, then design the lifecycle for long-term use.
