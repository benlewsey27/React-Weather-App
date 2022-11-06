package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
)

type OpenWeatherMapResponse struct {
	Coord struct {
		Lon float64 `json:"lon"`
		Lat float64 `json:"lat"`
	} `json:"coord"`
	Weather []struct {
		Id int `json:"id"`
		Main string `json:"main"`
		Description string `json:"description"`
		Icon string `json:"icon"`
	} `json:"weather"`
	Base string `json:"base"`
	Main struct {
		Temp float64 `json:"temp"`
		FeelsLike float64 `json:"feels_like"`
		TempMin float64 `json:"temp_min"`
		TempMax float64 `json:"temp_max"`
		Pressure int `json:"pressure"`
		Humidity int `json:"humidity"`
	} `json:"main"`
	Visibility int `json:"visibility"`
	Wind struct {
		Speed float64 `json:"speed"`
		Deg float64 `json:"deg"`
	} `json:"wind"`
	Clouds struct {
		All int `json:"all"`
	} `json:"clouds"`
	DT int `json:"dt"`
	Sys struct {
		Type int `json:"type"`
		Id int `json:"id"`
		Country string `json:"country"`
		Sunrise int `json:"sunrise"`
		Sunset int `json:"sunset"`
	} `json:"sys"`
	Timezone int `json:"timezone"`
	Id int `json:"id"`
	Name string `json:"name"`
	Code int `json:"cod"`
}

type OpenWeatherMapError struct {
	Code int `json:"cod"`
	Message string `json:"message"`
}

func SendResponse(res http.ResponseWriter, statusCode int, body string) {
	res.WriteHeader(statusCode)
	res.Write([]byte(body))
}

func SendResponseJSON(res http.ResponseWriter, statusCode int, body map[string]string) {
	res.WriteHeader(statusCode)
	res.Header().Set("Content-Type", "application/json")
	resBody, err := json.Marshal(body)
	if err != nil {
		log.Fatalf("Error happened in JSON marshal. Err: %s", err)
	}
	res.Write(resBody)
}

func Health(res http.ResponseWriter, req *http.Request) {
	SendResponse(res, http.StatusOK, "")
}

func GetTemp(res http.ResponseWriter, req *http.Request) {
	apiKey, ok := os.LookupEnv("WEATHER_API_KEY")
	if !ok {
		fmt.Println("WARNING: WEATHER_API_KEY not found!")
	}

	city := strings.TrimPrefix(req.URL.Path, "/api/get-temp/")
	fmt.Printf("Getting tempature for city %s...\n", city)

	url := fmt.Sprintf("http://api.openweathermap.org/data/2.5/weather?q=%s&APPID=%s", city, apiKey)
	url_parsed := strings.TrimSuffix(url, "\n")
	resp, err := http.Get(url_parsed)

	if err != nil {
		fmt.Printf("Error: %s\n", err.Error())
		SendResponse(res, http.StatusInternalServerError, "ERROR: Failed to retrive weather data")
		return
	}

	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)

	if resp.StatusCode != 200 {
		var result OpenWeatherMapError
		json.Unmarshal(body, &result);

		fmt.Printf("%d Error: %s\n", resp.StatusCode, result.Message)
		SendResponse(res, http.StatusInternalServerError, "ERROR: Failed to retrive weather data")
		return
	}

	var result OpenWeatherMapResponse
	json.Unmarshal(body, &result);

	formatedTemp := fmt.Sprintf("%.1f", result.Main.Temp - 273.15)
	fmt.Println("Request successful!")

	resBody := make(map[string]string)
	resBody["city"] = result.Name
	resBody["temp"] = formatedTemp
	SendResponseJSON(res, http.StatusOK, resBody)
	return
}

func handleRequests() {
	http.HandleFunc("/api/health", Health)
	http.HandleFunc("/api/get-temp/", GetTemp)

	fmt.Println("API listening on port 3001...")
	log.Fatal(http.ListenAndServe(":3001", nil))
}

func main() {
	handleRequests()
}
