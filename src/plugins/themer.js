const AVAILABLE_THEMES = {
    blue: SimpleTheme('#4dc2f8'),
    orange: SimpleTheme('#e36d0e'),
    purple: SimpleTheme('#b0789a'),
    green: SimpleTheme('#A1CCA5')
}

function SimpleTheme(color, darkColor) {
    if (darkColor === undefined) darkColor = color;
    return {
        light: {
            neutral: '#888',
            sudoku: color,
            'sudoku-cell-color': '#fff',
        },
        dark: {
            neutral: '#555',
            sudoku: darkColor,
            'sudoku-cell-color': '#222',
        }
    }
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
