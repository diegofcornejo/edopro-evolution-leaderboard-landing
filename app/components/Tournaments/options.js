const options = {
	type: [
		{label: 'Single Elimination', value: 'single'},
		{label: 'League', value: 'league'},
	],
  mode : [
		{label: '1 v 1', value: '1'},
		{label: '2 v 2', value: '2'},
		{label: '3 v 3', value: '3'},
	],
	bestOf : [
		{label: '1', value: '1'},
		{label: '3', value: '3'},
		{label: '5', value: '5'},
		{label: '7', value: '7'}
	],
	banlist : [
		{label: "2023.06 TCG", value: "2023.06 TCG"},
		{label: "2023.7 OCG", value: "2023.7 OCG"},
		{label: "2005.4 GOAT", value: "2005.4 GOAT"},
		{label: "2023.07.01 Rush Duel", value: "-2023.07.01 Rush Duel"},
		{label: "2023.07.01 Rush Prereleases", value: "2023.07.01 Rush Prereleases"},
		{label: "2023.04 Speed Duel", value: "2023.04 Speed Duel"},
		{label: "2023.06 Traditional", value: "2023.06 Traditional"},
		{label: "2023.7 World", value: "2023.7 World"},
		{label: "==================================", value: ""},
		{label: "JTP (Original)", value: "JTP (Original)"},
		{label: "Evolution", value: "Evolution"},
		{label: "GX Evolution", value: "GX Evolution"},
		{label: "N/A", value: "NA"}
		// {label: "Custom", value: "Custom"},
	],
	rule: [
		{label: "Master Rule 1", value: "Master Rule 1"},
		{label: "Master Rule 2", value: "Master Rule 2"},
		{label: "Master Rule 3", value: "Master Rule 3"},
		{label: "Master Rule 4", value: "Master Rule 4"},
		{label: "Master Rules 2020", value: "Master Rules 2020"},
		{label: "Speed Duel", value: "Speed Duel"},
		{label: "Rush Duel", value: "Rush Duel"},
		{label: "GOAT", value: "GOAT"}
	],
}

export default options