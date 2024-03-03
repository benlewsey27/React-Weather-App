package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
)

func SendResponse(res http.ResponseWriter, statusCode int, body string) {
	res.WriteHeader(statusCode)
	res.Write([]byte(body))
}

func Health(res http.ResponseWriter, req *http.Request) {
	SendResponse(res, http.StatusOK, "")
}

func GenerateMockTempature() float64 {
	return (rand.Float64() * 10) + 273.15
}

func MockWeather(res http.ResponseWriter, req *http.Request) {
	city := req.URL.Query().Get("q")
	temp := GenerateMockTempature()

	fmt.Printf("Mocking tempature for city %s to %f\n", city, temp)

	bodyMain := make(map[string]interface{})
	bodyMain["temp"] = temp

	body := make(map[string]interface{})
	body["name"] = "Cardiff"
	body["main"] = bodyMain

	res.WriteHeader(http.StatusOK)
	res.Header().Set("Content-Type", "application/json")
	resBody, err := json.Marshal(body)
	if err != nil {
		log.Fatalf("Error happened in JSON marshal. Err: %s", err)
	}
	res.Write(resBody)
	return
}

func handleRequests() {
	http.HandleFunc("/health", Health)
	http.HandleFunc("/weather", MockWeather)

	fmt.Println("API listening on port 3002...")
	log.Fatal(http.ListenAndServe(":3002", nil))
}

func main() {
	handleRequests()
}
