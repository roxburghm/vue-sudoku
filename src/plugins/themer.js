const AVAILABLE_THEMES = {
    blue: SimpleTheme('#4dc2f8'),
    orange: SimpleTheme('#e36d0e', '#e36d0e', '#7D1128'),
    purple: SimpleTheme('#b0789a'),
    green: SimpleTheme('#A1CCA5'),
    beige: SimpleTheme('#8F7E4F'),
}

function SimpleTheme(color, darkColor, warning) {
    if (darkColor === undefined) darkColor = color;
    if (warning === undefined) warning = '#fb8c00';
    let theme = {
        light: {
            neutral: '#888',
            sudoku: color,
            warning: warning,
            'sudoku-cell-color': '#fff',
        },
        dark: {
            neutral: '#555',
            sudoku: darkColor,
            warning: warning,
            'sudoku-cell-color': '#222',
        }
    }
    return theme;
}

function GetBaseColor(color) {
    return AVAILABLE_THEMES[color].light.sudoku;
}

function SetThemeColor(theme, vuetify) {
    Object.keys(AVAILABLE_THEMES[theme].light).forEach(key => {
        vuetify.theme.themes.light[key] = AVAILABLE_THEMES[theme].light[key];
    });
    Object.keys(AVAILABLE_THEMES[theme].dark).forEach(key => {
        vuetify.theme.themes.dark[key] = AVAILABLE_THEMES[theme].dark[key];
    });
}

export default {
    AvailableThemes: Object.keys(AVAILABLE_THEMES),
    SetThemeColor,
    GetBaseColor
}
