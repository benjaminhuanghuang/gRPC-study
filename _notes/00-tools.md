

https://grpc.io/docs/languages/go/quickstart/

## install the protocol compiler
gRPC applications often leverage Protocol Buffers for service definitions and data serialization

The protocol buffer compiler, `protoc`, is used to compile `.proto` files, which contain service and message definitions

- Linux
```
  apt install -y protobuf-compiler
  protoc --version 
```

- Mac
```      
  brew install propobuf

  protoc --version
```

## install Go plugins for the protocol compiler
```
$ export GO111MODULE=on  # Enable module mode
$ go get google.golang.org/protobuf/cmd/protoc-gen-go \
         google.golang.org/grpc/cmd/protoc-gen-go-grpc
```

```
generate code
```
  protoc --proto_path=proto propo/*.propo --go_out=plugin=pb
```