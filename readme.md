
## ayaya-lings

#### Never feel alone again, cute lings will be with you.

### Install

CDN:
`<script src="https://cdn.jsdelivr.net/gh/botkalista/ayaya-lings@master/src/index.js"></script>`

### createLings(options)
Options object:
| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [number]| <code>number</code> | 6 | Number of lings |
| [range] | <code>number</code> | 40 | Distance from your mouse |
| [maxSpeed] | <code>number</code> | 5 | Max speed of lings |
| [maxForce] | <code>number</code> | 0.25| Max force of lings |
| [minSize] | <code>number</code> | 5| Min size of lings |
| [maxSize] | <code>number</code> | 12| Max size of lings |
| [minTailSize] | <code>number</code> | 20| Min tail size of lings |
| [maxTailSize] | <code>number</code> | 30| Max tail size of lings |

## Example

```html
<html>
<body>

//YOUR CODE HERE

<script src="https://cdn.jsdelivr.net/gh/botkalista/ayaya-lings@master/src/index.js"></script>
<script>
	createLings();
	/* OR
	createLings({
		number: 6,
		range: 40,
		maxSpeed:5,
		maxForce:0.25,
		minSize:5,
		maxSize:12,
		minTailSize: 20,
		maxTileSize: 30
	});
	*/
</script>

</body>
</html>
```

## Live - Example

### https://botkalista.github.io/ayaya-lings/