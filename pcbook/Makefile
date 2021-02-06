gen:
	# protoc --proto_path=proto proto/*.proto --go_out=pb
	protoc --go_out=paths=source_relative:. --go-grpc_out=./pb proto/*.proto
clean:
	rm pb/*.go

