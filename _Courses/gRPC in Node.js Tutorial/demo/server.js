import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { get } from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load the protobuf
const PROTO_PATH = path.join(__dirname, "greeter.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition).greeter;

// handles one RPC call from a client and sends back a response.
function sayHello(call, callback) {
  const reply = { message: `Hello, ${call.request.name}!` };
  callback(null, reply);
}

function getNumber(call) {
  const count = call.request.count;
  let current = 1;

  const interval = setInterval(() => {
    if (current > count) {
      clearInterval(interval);
      call.end();
      return;
    }
    call.write({ order: current, number: current * 100 });
    current++;
  }, 2000);
}

function sumNumbers(call, callback) {
  let sum = 0;
  call.on("data", (request) => {
    sum += request.number;
  });

  call.on("end", () => {
    callback(null, { sum: sum });
  });
}
const clients = [];
function chat(call) {
  call.on("data", (chatMessage) => {
    console.log(`${chatMessage.user}: ${chatMessage.message}`);
    clients.forEach((client) => {
      if (client) {
        call.write({
          user: "Server",
          message: `You said: ${chatMessage.message}`,
        });
      }
    });
  });
  call.on("end", () => {
    clients.splice(clients.indexOf(call), 1);
    call.end();
  });
}

// Start the gRPC server
function main() {
  const server = new grpc.Server();
  // The server maps that RPC to function defined above.
  server.addService(proto.Greeter.service, {
    SayHello: sayHello,
    GetNumber: getNumber,
    SumNumbers: sumNumbers,
  });

  server.bindAsync(
    "0.0.0.0:5050",
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error("Failed to bind:", err);
        return;
      }
      console.log(`Server is running on port ${port}`);
    }
  );
}
main();
