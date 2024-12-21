interface Config {
    instance: JiraConfig
}

interface JiraConfig {
    url: string,
    token: string,
    projectName: string
}

export type { Config, JiraConfig };