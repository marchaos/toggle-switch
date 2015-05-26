# Toggle Switch

A lightweight, zero dependency, toggle switch for modern browsers. Inspired by mobile toggle switches.

* 2.5kB compressed JavaScript, 1kB compressed CSS
* Supports mobile devices (swipe and click)
* Supports desktop (drag and click)

See http://marchaos.github.com/toggle-switch for a demo. 

# Embedding

```html
<html>
  <head>
    <link rel="stylesheet" href="toggleswitch.min.css" />
    <script src="ToggleSwitch.min.js"></script>
  </head>
  <body>
    <input class="small blue" id="cb" type="checkbox" />
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
// switch disable
switch.disable();
// switch enable
switch.enable();
alert("Switch is " + ((switch.isOn()) ? "on" : "off") + "!");
alert("Switch is " + ((switch.isDisabled()) ? "disabled" : "enabled") + "!");
```

#Kudos

[Chris Brimmel's IOS 5 toggle switch images](http://dribbble.com/shots/216058-iOS-5-Toggle-Switches-iPhone-Retina)
