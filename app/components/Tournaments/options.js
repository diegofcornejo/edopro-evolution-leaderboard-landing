const options = {
  mode : [
		{label: '1 v 1', value: '1v1'},
		{label: '2 v 2', value: '2v2'},
		{label: '3 v 3', value: '3v3'},
	],
	bestOf : [
		{label: '1', value: '1'},
		{label: '3', value: '3'},
		{label: '5', value: '5'},
		{label: '7', value: '7'}
	],
	banlist : [
		{label: "2023.06 TCG", value: "569148100"},
		{label: "2023.7 OCG", value: "2102573805"},
		{label: "2005.4 GOAT", value: "1087646174"},
		{label: "2023.07.01 Rush Duel", value: "-54630734"},
		{label: "2023.07.01 Rush Prereleases", value: "-1496041131"},
		{label: "2023.04 Speed Duel", value: "902051764"},
		{label: "2023.06 Traditional", value: "1868866258"},
		{label: "2023.7 World", value: "2024240593"},
		{label: "==================================", value: ""},
		{label: "JTP (Original)", value: "-788692997"},
		{label: "Evolution", value: "438594076"},
		{label: "GX Evolution", value: "788495398"},
		{label: "N/A", value: "NA"}
		// {label: "Custom", value: "Custom"},
	],
	rule: [
		{label: "Master Rule 1", value: "MR1"},
		{label: "Master Rule 2", value: "MR2"},
		{label: "Master Rule 3", value: "MR3"},
		{label: "Master Rule 4", value: "MR4"},
		{label: "Master Rules 2020", value: "MR2020"},
		{label: "Speed Duel", value: "SPEED"},
		{label: "Rush Duel", value: "RUSH"},
		{label: "GOAT", value: "GOAT"}
	],
}

export default options