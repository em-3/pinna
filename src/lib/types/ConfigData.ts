interface ConfigData {
    instance: JiraConfig
}

interface JiraConfig {
    url: string,
    token: string,
    projectName: string
}

export type { ConfigData, JiraConfig };