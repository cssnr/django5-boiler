[![Prod Deploy](https://img.shields.io/github/actions/workflow/status/cssnr/django5-boiler/prod-deploy.yaml?logo=github&logoColor=white&label=deploy)](https://github.com/cssnr/django5-boiler/actions/workflows/prod-deploy.yaml)
[![Dev CI](https://img.shields.io/github/actions/workflow/status/cssnr/django5-boiler/dev-ci.yaml?logo=github&logoColor=white&label=ci)](https://github.com/cssnr/django5-boiler/actions/workflows/dev-ci.yaml)
[![Test](https://img.shields.io/github/actions/workflow/status/cssnr/django5-boiler/test.yaml?logo=github&logoColor=white&label=test)](https://github.com/cssnr/django5-boiler/actions/workflows/test.yaml)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/cssnr/django5-boiler?logo=github&logoColor=white&label=updated)](https://github.com/cssnr/django5-boiler/graphs/commit-activity)
[![GitHub Top Language](https://img.shields.io/github/languages/top/cssnr/django5-boiler?logo=htmx&logoColor=white)](https://github.com/cssnr/django5-boiler)
[![GitHub Org Stars](https://img.shields.io/github/stars/cssnr?style=flat&logo=github&logoColor=white)](https://cssnr.github.io/)
[![Discord](https://img.shields.io/discord/899171661457293343?logo=discord&logoColor=white&label=discord&color=7289da)](https://discord.gg/wXy6m2X8wY)

# Django 5 Boilerplate

My App is Good.

Coming soon...

# Workflows

## GitHub Variables and Secrets

These variables/secrets are used by various workflows...

| name                 | type    | description                                                                      |
| -------------------- | ------- | -------------------------------------------------------------------------------- |
| GHCR_USER            | vars    | GHCR Username                                                                    |
| GHCR_PASS            | secrets | GHCR Password/Token                                                              |
| SERVICE_CONFIGS_KEY  | secrets | SSH Key for [service-configs](https://github.com/hosted-domains/service-configs) |
| PORTAINER_URL        | secrets | Portainer URL                                                                    |
| PORTAINER_TOKEN      | secrets | Portainer Token                                                                  |
| CLOUDFLARE_API_TOKEN | secrets | **Optional** Cloudflare Token                                                    |

## Workflow Variables

These are convoluted because GitHub wanted to block variables to punish us.

| File                                                       | Description                    |
| ---------------------------------------------------------- | ------------------------------ |
| [dev-ci.yaml](.github%2Fworkflows%2Fdev-ci.yaml)           | Defines variables under deploy |
| [dev-deploy.yaml](.github%2Fworkflows%2Fdev-deploy.yaml)   | Repeated variables from above  |
| [prod-deploy.yaml](.github%2Fworkflows%2Fprod-deploy.yaml) | Defines variables under deploy |

# Development

```shell
cp settings.env.example settings.env
vim settings.env
set -a; source settings.env; set +a
npm install
docker compose -f docker-compose-dev.yaml up --build --remove-orphans --force-recreate
```
