# Sample Deployment

This sample deployment assumes the following:
- A kubernetes cluser is running and is accessible from your device
- A OpenWeatherMap API key has been created


## Initial Setup

To prepare the kubernetes environment, complete the following steps from the `sample-deployment` directory:

1. Create a namespace to hold the resources

```
apiVersion: v1
kind: Namespace
metadata:
  name: development
```

2. Select the namespace context

```
kubens development
```

3. Create a secret to hold the OpenWeatherMap API key

```
kind: Secret
type: Opaque
apiVersion: v1
metadata:
  name: react-weather
  namespace: development
data:
  WEATHER_API_KEY: XXX
```

4. Create an imagePullSecret to get images from GitHub Container Registry

```
kind: Secret
type: kubernetes.io/dockerconfigjson
apiVersion: v1
metadata:
  name: dockerconfigjson-github
  namespace: development
  labels:
    app: dockerconfigjson-github
data:
  .dockerconfigjson: XXX
```

I also patch the default ServiceAccount to use the imagePullSecret by default.

```
kubectl patch serviceaccounts default -p '{"imagePullSecrets": [{"name": "dockerconfigjson-github"}]}'
```

## Deployment

To deploy the react-weather project in your kubernetes cluster, I have provided a helmfile release.

Run the following to deploy this project:

```bash
helmfile apply
helmfile destroy
```

This sample deployment will expose the frontend service internally using a ClusterIP service. To expose the service on your device, run the following:

```
kubectl port-forward service/react-weather-frontend 8000:80
```

You will then be able to access the project on localhost:8000.
