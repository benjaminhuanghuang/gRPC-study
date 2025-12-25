import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load the protobuf
const PROTO_PATH = path.join(__dirname, "greeter.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition).greeter;

function main() {
  // Create a gRPC client instance that connects to the server at localhost:5050
  const client = new proto.Greeter(
    "localhost:5050", //server address
    grpc.credentials.createInsecure() // use insecure credentials for simplicity
  );

  client.SayHello({ name: "World" }, (err, response) => {
    if (err) {
      console.error("Error calling SayHello:", err);
      return;
    }
    console.log("Greeting:", response.message);
  });

  const call = client.GetNumber({ count: 5 });

  call.on("data", (response) => {
    console.log(
      `Received number ${response.number} for order ${response.order}`
    );
  });

  call.on("end", () => {
    console.log("Stream ended.");
  });

  call.on("error", (err) => {
    console.error("Error in stream:", err);
  });

  //  bidirectional streaming
  const call2 = client.SumNumbers((err, response) => {
    if (err) {
      console.error("Error calling SumNumbers:", err);
      return;
    }
    console.log("Sum of numbers:", response.sum);
  });

  call2.write({
    number: 5,
  });

  call2.write({
    number: 15,
  });
  call2.write({
    number: 25,
  });
  call2.end();

  const call3 = client.Chat();
  call3.on("data", (chatMessage) => {
    console.log(`${chatMessage.user}: ${chatMessage.message}`);
  });

  call3.write({ user: "Vahid", message: "Hello" });
  call3.write({ user: "Vahid", message: "this is me" });

  setTimeout(() => {
    call3.end();
  }, 3000);

  call3.on("end", () => {
    console.log("Stream closed...");
  });
}

main();
