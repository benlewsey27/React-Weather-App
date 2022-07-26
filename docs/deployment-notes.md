# Deployment Notes

## Image/Chart Publishing

The current deployment is a manual process. I will publish to the GitHub Container Registry.

### Docker Images

To push the docker images to an OCI registry, run the following commands.

``` bash
docker compose build

export CR_PAT=<GitHub Personal Access Token>
echo $CR_PAT | docker login ghcr.io -u benlewsey27 --password-stdin

docker push ghcr.io/benlewsey27/react-weather-frontend:<tag>
docker push ghcr.io/benlewsey27/react-weather-backend:<tag>
```

### Helm Chart

``` bash
cd helm

export CR_PAT=<GitHub Personal Access Token>
echo $CR_PAT | helm registry login ghcr.io -u benlewsey27 --password-stdin

helm package react-weather
helm push react-weather-<version>.tgz oci://ghcr.io/benlewsey27/charts
```

## Deployment

After publishing the image and charts, you can deploy to a kubernetes environment.

To provide an example deployment, you can find a helmfile release in the docs/deployment directory.
