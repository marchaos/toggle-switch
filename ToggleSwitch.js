var ToggleSwitch = function(eEl, sOnText, sOffText) 
{
	this.isOn = false;
	this.eEl = eEl;

	// Represents the track that the switch runs in
	// this is the entire container element.
	this.eTrack = document.createElement('div');
	this.eTrack.className = 'ts-track';
	this.eTrack.addEventListener('click', this.click.bind(this), false);

	// The switch knob.
	this.eSwitch = document.createElement('span');
	this.eSwitch.className = 'ts-switch';

	this.eOnText = document.createElement('span');
	this.eOnText.className = 'ts-on-text';
	this.eOnText.appendChild(document.createTextNode(sOnText));

	this.eOffText = document.createElement('span');
	this.eOffText.appendChild(document.createTextNode(sOffText));
	this.eOffText.className = 'ts-off-text';

	// The container for the switch and the on and off text.
	this.eSwitchContainer = document.createElement('div');
	this.eSwitchContainer.className = 'ts-switch-container';
	this.eSwitchContainer.appendChild(this.eOnText);
	this.eSwitchContainer.appendChild(this.eSwitch);
	this.eSwitchContainer.appendChild(this.eOffText);

	this.eTrack.appendChild(this.eSwitchContainer);

	// Events for mobile devices
	this.eSwitch.addEventListener('touchend', this._touchEnd.bind(this), false);
	this.eSwitch.addEventListener('touchstart', this._touchStart.bind(this), false);
	this.eSwitch.addEventListener('touchmove', this._touchMove.bind(this), false);

	// Events for dragging on desktop devices.
	document.addEventListener('mousemove', this._mouseMove.bind(this), false);
	this.eSwitch.addEventListener('mousedown', this._mouseDown.bind(this), false);
	document.addEventListener('mouseup', this._mouseUp.bind(this), false);

	document.body.appendChild(this.eTrack);

	this.eEl.parentNode.replaceChild(this.eTrack, this.eEl);
	this.eTrack.appendChild(this.eEl);

	this.isMouseDown = false;
	this.isDragging = false;
};

ToggleSwitch.prototype = 
{

	click: function(e)
	{
		if (!this.isDragging)
		{
			this.toggle();	
		}
		this.isMouseDown = false;
		this.isDragging = false;
	},

	_mouseDown: function()
	{
		this._disableTransition();
		this.isMouseDown = true;
	},

	_mouseMove: function(e)
	{
		if (this.isMouseDown)
		{
			this.isDragging = true;
			this._pointerMove(e, e.pageX, false);
		}
	},

	_mouseUp: function(e)
	{
		if (this.isDragging)
		{
			this._snapSwitch();
		}
	},

	_touchStart: function(e)
	{
		this._disableTransition();
		// Prevent scrolling of the window.
		e.preventDefault(); 
	},

	_touchMove: function(e)
	{
		if (e.touches.length == 1)
		{
			this._pointerMove(e, e.touches[0].pageX, true);
		}
	},

	_convertCoordToMarginLeft: function(nCoordX)
	{
		var left = this.getPosition(this.eTrack).left;
		return nCoordX - left - (-this._getMinContainerMarginLeft()) - (this.eSwitch.offsetWidth / 2);
	},

	_convertCoordToBackgroundPosition: function(nCoordX)
	{
		var left = this.getPosition(this.eTrack).left;
		return nCoordX - left - (-this._getMinTrackBackgroundX()) - (this.eSwitch.offsetWidth / 2);
	},

	_pointerMove: function(e, nCoordX, bPreventDefault)
	{
		var nPos = this._convertCoordToMarginLeft(nCoordX);
		var nBackgroundPos = this._convertCoordToBackgroundPosition(nCoordX);

		var maxMarginLeft = this._getMaxContainerMarginLeft();
		var minMarginLeft = this._getMinContainerMarginLeft();

		if (nPos <= minMarginLeft)
		{
			nPos = minMarginLeft;
			nBackgroundPos = this._getMinTrackBackgroundX();
		}
		else if (nPos >= maxMarginLeft)
		{
			nPos = maxMarginLeft;
			nBackgroundPos = 0;
		}

		this.eSwitchContainer.style.marginLeft = nPos + "px";
		this.eTrack.style.backgroundPosition = nBackgroundPos + "px";

		if (bPreventDefault) 
		{
			e.preventDefault();
		}
	},

	_touchEnd: function(e)
	{
		this._snapSwitch();	
	},

	_disableTransition: function()
	{
		this.addClass(this.eTrack, 'no-transition');
	},

	_enableTransition: function()
	{
		this.removeClass(this.eTrack, 'no-transition');
	},

	_getOccupiedSpaceBeforeSwitch: function()
	{
		return this.eOnText.clientWidth +
			(this.getPosition(this.eSwitch).left - this.getPosition(this.eOnText).left - this.eOnText.clientWidth);
	},

	_getMaxContainerMarginLeft: function()
	{
		return this.eTrack.clientWidth - this.eSwitch.offsetWidth - this._getOccupiedSpaceBeforeSwitch();
	},

	_getMinContainerMarginLeft: function() 
	{
		return 0 - this._getOccupiedSpaceBeforeSwitch() - 1;
	},

	_getMinTrackBackgroundX: function()
	{
		return -this.eTrack.offsetWidth + this.eSwitch.offsetWidth - 1;
	},

	_snapSwitch: function()
	{
		var pos = parseInt(this.eSwitchContainer.style.marginLeft);
		var max = this._getMaxContainerMarginLeft();
		var min = this._getMinContainerMarginLeft();
		var middle = (max + min) / 2;
		(pos > middle) ? this.on() : this.off();
	},

	isOn: function()
	{
		return this.isOn;
	},

	on: function()
	{
		this.isOn = true;
		this._enableTransition();
		this.eSwitchContainer.style.marginLeft = this._getMaxContainerMarginLeft() + "px";
		this.eTrack.style.backgroundPosition = "0px 0px";
	},

	off: function()
	{
		this.isOn = false;
		this._enableTransition();
		this.eSwitchContainer.style.marginLeft = this._getMinContainerMarginLeft() + "px";
		this.eTrack.style.backgroundPosition = this._getMinTrackBackgroundX() + "px 0px";
	},

	toggle: function()
	{
		(this.isOn) ? this.off() : this.on();
	},

	// -- UTILITY METHODS --
 	
	toggleClass: function(eEl, sClass)
	{
		(new RegExp('\\b' + sClass + '\\b').test(eEl.className)) 
			? this.removeClass(eEl, sClass) : this.addClass(eEl, sClass);
		return this;
	},

	getPosition: function(eEl)
	{
		var curleft = curtop = 0;
		if (eEl.offsetParent) 
		{
			do 
			{
				curleft += eEl.offsetLeft;
				curtop += eEl.offsetTop;
			} while (eEl = eEl.offsetParent);
		}
		return {left: curleft, top: curtop};
	},

	replaceClass: function(eEl, sOldClass, sNewClass) 
	{
		this.removeClass(eEl, sOldClass).addClass(eEl, sNewClass);
	},

	removeClass: function(eEl, sClass)
	{
		eEl.className = eEl.className.replace(new RegExp('(\\b' + sClass + '\\b)'), '').trim();
		return this;
	},

	addClass: function(eEl, sClass)
	{
		this.removeClass(eEl, sClass);
		eEl.className += ' ' + sClass;
		return this;
	}
};