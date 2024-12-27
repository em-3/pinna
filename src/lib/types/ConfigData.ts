interface ConfigData {
    instance: JiraConfig
}

interface JiraConfig {
    url: string,
    token: string,
    projectName: string,
    storyPointsField: string,
    selectedUsers: string
}

export const defaultConfig: ConfigData = {
    instance: {
        url: "",
        token: "",
        projectName: "",
        storyPointsField: "",
        selectedUsers: ""
    }
}

export type { ConfigData, JiraConfig };