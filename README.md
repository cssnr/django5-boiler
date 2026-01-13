[![Image Size](https://badges.cssnr.com/ghcr/size/cssnr/django5-boiler-app)](https://github.com/orgs/cssnr/packages/container/package/django5-boiler-app)
[![CI](https://img.shields.io/github/actions/workflow/status/cssnr/django5-boiler/ci.yaml?logo=verizon&label=ci)](https://github.com/cssnr/django5-boiler/actions/workflows/ci.yaml)
[![Lint](https://img.shields.io/github/actions/workflow/status/cssnr/django5-boiler/lint.yaml?logo=verizon&label=lint)](https://github.com/cssnr/django5-boiler/actions/workflows/lint.yaml)
[![Test](https://img.shields.io/github/actions/workflow/status/cssnr/django5-boiler/test.yaml?logo=verizon&label=test)](https://github.com/cssnr/django5-boiler/actions/workflows/test.yaml)
[![Codecov](https://codecov.io/gh/cssnr/django5-boiler/graph/badge.svg?token=6YSWJ1E6BJ)](https://codecov.io/gh/cssnr/django5-boiler)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/cssnr/django5-boiler?logo=github&label=updated)](https://github.com/cssnr/django5-boiler/graphs/commit-activity)
[![GitHub Top Language](https://img.shields.io/github/languages/top/cssnr/django5-boiler?logo=htmx&logoColor=white)](https://github.com/cssnr/django5-boiler)
[![GitHub Org Stars](https://img.shields.io/github/stars/cssnr?style=flat&logo=github&label=org%20stars)](https://cssnr.github.io/)
[![Discord](https://img.shields.io/discord/899171661457293343?logo=discord&logoColor=white&label=discord&color=7289da)](https://discord.gg/wXy6m2X8wY)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-73a4f1?logo=kofi&label=Support)](https://ko-fi.com/cssnr)

# Django 5 Boilerplate

- [Environment](#environment)
- [Compose Files](#compose-files)
- [Workflow Files](#workflow-files)
- [Development](#development)

Deploy with Standalone Docker.

```shell
docker compose -f docker-compose-stack.yaml up
```

Deploy with Docker Swarm.

```shell
docker stack deploy -c docker-compose-swarm.yaml django5-boiler
```

## Environment

These variables/secrets are used by various workflows...

| name                 | type    | description                                                                      |
| -------------------- | ------- | -------------------------------------------------------------------------------- |
| GHCR_USER            | vars    | GHCR Username                                                                    |
| GHCR_PASS            | secrets | GHCR Password/Token                                                              |
| SERVICE_CONFIGS_KEY  | secrets | SSH Key for [service-configs](https://github.com/hosted-domains/service-configs) |
| PORTAINER_URL        | secrets | Portainer URL                                                                    |
| PORTAINER_TOKEN      | secrets | Portainer Token                                                                  |
| CLOUDFLARE_API_TOKEN | secrets | **Optional** Cloudflare Token                                                    |

## Compose Files

| File                                                   | Description                   |
| ------------------------------------------------------ | ----------------------------- |
| [docker-compose.yaml](docker-compose.yaml)             | Docker Development Stack File |
| [docker-compose-stack.yaml](docker-compose-stack.yaml) | Docker Standalone Stack File  |
| [docker-compose-swarm.yaml](docker-compose-swarm.yaml) | Docker Swarm Stack File       |

## Workflow Files

These are convoluted because GitHub wanted to block variables to punish us.

| File                                                       | Description                    |
| ---------------------------------------------------------- | ------------------------------ |
| [dev-ci.yaml](.github%2Fworkflows%2Fdev-ci.yaml)           | Defines variables under deploy |
| [dev-deploy.yaml](.github%2Fworkflows%2Fdev-deploy.yaml)   | Repeated variables from above  |
| [prod-deploy.yaml](.github%2Fworkflows%2Fprod-deploy.yaml) | Defines variables under deploy |

# Development

```shell
cp settings.env.example settings.env
vim settings.env # edit accordingly
set -a; source settings.env; set +a
npm install
docker compose up --watch --build --force-recreate
```
