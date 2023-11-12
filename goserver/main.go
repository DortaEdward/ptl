package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

var addr = flag.String("addr", ":6969", "http server address")

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool{
		return true
	},
}

const wsServerEndpoint = "ws://localhost:6969/ws"

func handleWebSocket(w http.ResponseWriter, r *http.Request){
	dialer := websocket.Dialer{
		ReadBufferSize: 1024,
		WriteBufferSize: 1024,
	}

	conn, _, err := dialer.Dial(wsServerEndpoint,nil) 
	if err != nil{
		log.Fatalf("ERROR: errror with upgrader: %d",err)
	}	
	defer conn.Close()

	fmt.Println("Client Connected")

	
}

func main(){
	flag.Parse()
	
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request){
		fmt.Println("Hello World")
		})
	
	
	server := &http.Server{
		Addr: *addr,
		ReadHeaderTimeout: 3 * time.Second,
	}

	err := server.ListenAndServe()
	if err != nil{
		log.Fatal("ListenAndServe: ", err)
	}
}
