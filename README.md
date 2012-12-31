# Toggle Switch

A lightweight, zero dependency, toggle switch for modern browsers. Inspired by mobile toggle switches.

* 2.5kB compressed JavaScript, 1kB compressed CSS
* Supports mobile devices (swipe and click)
* Supports desktop (drag and click)

# Embedding

```html
<html>
  <head>
    <link ref="stylesheet" href="toggleswitch.min.css" />
    <script src="ToggleSwitch.min.js"></script>
  </head>
  <body>
    <input id="cb" type="checkbox" />
  </body>
</html>
```

# JavaScript API

```javascript
var switch = new ToggleSwitch(document.getElementById('cb'), 'ON', 'OFF');
// switch on
switch.on();
// switch off
switch.off();
// toggle on
switch.toggle();
alert("Switch is " + ((switch.isOn()) ? "on" : "off") + "!");
```
