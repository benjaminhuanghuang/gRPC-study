# gRpc study

## What is

gRPC is a free and open-source framework developed by Google

gRPC is part of the Cloud Native Computation Foundation (CNCF) – like Docker & Kubernetes 

At a high level, it allows you to define REQUEST and RESPONSE for RPC (Remote Procedure Calls) and handles all the rest for you

## vs Restful API

| Dimension     | RPC               | HTTP/REST       |
| ------------- | ----------------- | --------------- |
| Protocol      | TCP / HTTP2       | HTTP1.1         |
| Serialization | Protobuf / Thrift | JSON            |
| Data Volume   | Small             | Large           |
| Latency       | Low               | Relatively High |

In high-frequency inter-service calls, the performance advantages of RPC are rapidly amplified.

RPC uses IDL (Interface Definition Language):

- Discover problems at compile time
- Automatically generate client/server code
- Controllable interface changes (clear version evolution)
