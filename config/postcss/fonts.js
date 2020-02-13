module.exports = {
	formats: 'local woff woff2',
	display: "swap",
	custom: {
		"Porsche": {
			variants: {
				normal: {
					400: {
						url: {
							woff: "../fonts/sk-porsche.woff",
							woff2: "../fonts/sk-porsche.woff2"
						}
					},
				}
			}
		},
		"Porsche Next": {
			variants: {
				normal: {
					400: {
						url: {
							woff: "../fonts/PorscheNextTT-Regular.woff",
						}
					},
				}
			}
		}
	}
}